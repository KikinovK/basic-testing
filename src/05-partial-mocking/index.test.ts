import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  ...jest.requireActual('./index'),
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    mockOne();
    mockTwo();
    mockThree();
    expect(mockConsoleLog).not.toHaveBeenCalled();
    mockConsoleLog.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
    consoleSpy.mockRestore();
  });
});
