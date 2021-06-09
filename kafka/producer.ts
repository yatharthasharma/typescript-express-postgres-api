import { KafkaClient, HighLevelProducer, ProduceRequest } from 'kafka-node';

const kafkaHost: string = 'localhost:9092';
let initialSetup: boolean = true;

export const kafkaProducer = (topic: string, message: string): void => {
  const client: KafkaClient = new KafkaClient({ kafkaHost: kafkaHost });
  const producer: HighLevelProducer = new HighLevelProducer(client);
  producer.on('ready', (): void => {
    if (initialSetup) {
      producer.createTopics(['testcreate'], true, function (err, data) {
        console.error('Error creating topics ===+++++=====');
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          initialSetup = false;
        }
      });
    }
    client.refreshMetadata([topic], (error: Error): void => {
      if (error) {
        throw error;
      }
      console.log('ahsdhasjdbkajsbdjkasbdjkbasjkdba');
      producer.send(
        [{ topic: topic, messages: [message] }],
        (error: Error, result: ProduceRequest): void => {
          error ? console.error(error) : console.log('producer.ts - ' + JSON.stringify(result));
          // process.exit(1);
        }
      );
    },
    )
  });

  producer.on('error', (error: Error): void => {
    console.error(`Error in Kafka message producer - ${error}`);
  });
};