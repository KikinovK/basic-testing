import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 5, b: 3, action: Action.Multiply, expected: 15 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 5, b: 3, action: '%', expected: null },
    { a: '5', b: '3', action: Action.Add, expected: null }
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should return ${expected} for action ${action} with operands ${a} and ${b}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
});
