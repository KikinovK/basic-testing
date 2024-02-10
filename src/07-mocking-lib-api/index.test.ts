import axios from 'axios';
import { throttledGetDataFromApi } from './index';


describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'create').mockImplementation(() => axios);
    jest.spyOn(axios, 'get').mockResolvedValue({ data: 'mocked data' });
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  const somePath = 'some-path';
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(somePath);
    jest.runAllTimers();

    expect(axios.create).toHaveBeenCalledWith({ baseURL: 'https://jsonplaceholder.typicode.com' });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(somePath);
    jest.runAllTimers();

    expect(axios.get).toHaveBeenCalledWith(somePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(somePath);
    jest.runAllTimers();
    
    expect(result).toEqual('mocked data');
  });
});
