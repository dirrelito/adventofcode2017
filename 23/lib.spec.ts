import { getSafe, isPrime } from './lib';

describe('Day 23', () => {
    it('getSafe val', () => {
        const a = getSafe({a:1})('a');
        expect(a).toBe(1);
    });
    it('getSafe err', () => {
        const zero = getSafe({b:1})('a');
        expect(zero).toBe(0);
    });
    it('find primes', () => {
        expect(isPrime(2)).toBeTruthy('called 2 non-prime');
        expect(isPrime(9)).toBeFalsy('called 9 prime');
        expect(isPrime(10)).toBeFalsy('called 10 prime');
        expect(isPrime(13)).toBeTruthy('called 13 non-prime');
        expect(isPrime(31)).toBeTruthy('called 31 non-prime');
    });
});
