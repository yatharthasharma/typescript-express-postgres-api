import { Consumer, ConsumerOptions, KafkaClient, Message, Offset, OffsetFetchRequest } from 'kafka-node';

const kafkaHost: string = 'localhost:9092';
const options: ConsumerOptions = {
  autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024
};

export const kafkaSubscribe = (topic: string): void => {
  const client: KafkaClient = new KafkaClient({ kafkaHost });
  const topics: OffsetFetchRequest[] = [{ topic: topic, partition: 0 }];
  const consumer: Consumer = new Consumer(client, topics, options);
  client.refreshMetadata([topic], (error: Error): void => {
    const offset: Offset = new Offset(client);
    if (error) {
      throw error;
    }

    consumer.on('message', (message: Message): void => {
      console.log(`Consumed message - ${JSON.stringify(message)}`);
    });

    consumer.on('offsetOutOfRange', (topic: OffsetFetchRequest): void => {
      offset.fetch([topic], (error, offsets): void => {
        if (error) {
          return console.error(error);
        }
        const min = Math.min.apply(null, offsets[topic.topic][topic.partition || 0]);
        consumer.setOffset(topic.topic, topic.partition || 0, min);
      });
    });

  });

  consumer.on('error', (error: Error): void => {
    console.error(`Error in Kafka message consumer - ${error}`);
  });
};