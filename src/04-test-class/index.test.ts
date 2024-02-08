import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(initialBalance + 1))
      .toThrowError(`Insufficient funds: cannot withdraw more than ${initialBalance}`);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(0);
    const sumTransfer = 101;
    expect(() => account1.transfer(sumTransfer, account2))
      .toThrowError(`Insufficient funds: cannot withdraw more than ${initialBalance}`);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrowError('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    const amount = 50;
    account.deposit(amount);
    expect(account.getBalance()).toBe(100 + amount);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    const amount = 50;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(100 - amount);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(0);
    const amount = 50;
    account1.transfer(amount, account2);
    expect(account1.getBalance()).toBe(100 - amount);
    expect(account2.getBalance()).toBe(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(200);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(200);
    await account.synchronizeBalance();
    expect(account.getBalance()).not.toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError('Synchronization failed');
  });
});
