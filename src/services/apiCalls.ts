import axios, { Method } from 'axios';

export const apiCaller = async (params: { url: string; method: Method; data: any; }) => {
  try {
    const response = await axios({
      url: process.env.BASE_URL + params.url, // TODO set the environment variable or update this!
      method: params.method,
      data: {
        ...params.data
      }
    });
    return response;
  } catch (error: any) {
    console.error('Example error!');
  }
}
