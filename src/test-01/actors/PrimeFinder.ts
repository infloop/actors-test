/**
 * Actor that finds prime numbers.
 */
class PrimeFinderActor {
  /**
   * Finds next prime, starting from a given number (not inclusive).
   *
   * @param {Number} n Positive number to start from.
   * @param {Number} m Positive number to end
   * @returns {Number} Prime number next to n.
   */
  nextPrime(n, m) {
    if (n < 1) throw new Error('Illegal input');

    const n0 = n + 1;

    if()

    if (this._isPrime(n0)) return n0;

    return this.nextPrime(n0, m);
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
