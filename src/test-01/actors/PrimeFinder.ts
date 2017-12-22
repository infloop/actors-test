/**
 * Actor that finds prime numbers.
 */
export class PrimeFinder {
  /**
   * Finds next prime, starting from a given number (not inclusive).
   *
   * @param {Number} n Positive number to start from.
   * @param {Number} m Positive number to end
   * @returns {Number} Prime number next to n.
   */
  nextPrime(n, m) {
    if (n < 0) throw new Error('Illegal input');

    const n0 = n + 1;

    if (n0 > m) {
      return null;
    }

    if (this._isPrime(n0)) return n0;

    return this.nextPrime(n0, m);
  }

  findPrimes(n, m): number[] {
    let res:number[] = [];
    let n0 = 0;

    while(1) {
      n0 = this.nextPrime(n, m);
      if (!n0) {
        return res;
      }

      res.push(n0);
      n = n0;
    }

    return res;
  }

  /**
   * Checks if a given number is prime.
   *
   * @param {Number} x Number to check.
   * @returns {Boolean} True if number is prime, false otherwise.
   * @private
   */
  _isPrime(x) {
    for (let i = 2; i < x; i++) {
      if (x % i === 0) return false;
    }

    return true;
  }
}

export default PrimeFinder;
