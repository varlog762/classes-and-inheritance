/*
Builder
*/

/**
 * The Builder class is used as a prototype constructor.
 * @param {any} value - The value to be stored in the instance.
 */
function Builder(value) {
    this.value = value;
}

/**
 * The plus method adds all passed arguments to the stored value.
 * @param {number} - An arbitrary number of values to be added to the stored value.
 * @returns {object} - Returns the Builder instance.
 */
Builder.prototype.plus = function (...args) {
    args.forEach((num) => this.value += num);

    return this;
}

/**
 * The minus method subtracts all passed arguments from the stored value.
 * @param {number} - An arbitrary number of values to be subtracted from the stored value.
 * @returns {object} - Returns the Builder instance. 
 */
Builder.prototype.minus = function (...args) {
    args.forEach((num) => this.value -= num);

    return this;
}

/**
 * The multiply method multiplies the stored value by a given multiplier.
 * @param {number} multiplier - The value to multiply the stored value by.
 * @returns {object} - Returns the Builder instance. 
 */
Builder.prototype.multiply = function (multiplier) {
    this.value *= multiplier;

    return this;
}

/**
 * The divide method divides the stored value by a given divisor and rounds the result.
 * If divisor is 0, logs an error message.
 * @param {number} divisor - The value to divide the stored value by.
 * @returns {object} - Returns the Builder instance.
 */
Builder.prototype.divide = function (divisor) {
    if (divisor === 0) {
        console.log('Cannot divide by zero!')
    } else {
        this.value = Math.round(this.value / divisor);
    }

    return this;
}

/**
 * Returns stored value.
 * @returns {any} - Returns the stored value.
 */
Builder.prototype.get = function () {
    return this.value;
}

/*
StringBuilder
*/

/**
 * The StringBuilder class extends the Builder class and is used to build strings.
 * @param {string} str - The initial string to be stored. If not passed,
 *  defaults to an empty string.
 */
function StringBuilder(str = '') {
    str += '';
    Builder.call(this, str);
}

StringBuilder.prototype = Object.create(Builder.prototype);

/**
 * The minus method removes the last 'num' characters from the stored string.
 * @param {number} num - The number of characters to remove from the end of the stored string.
 * @returns {object} - Returns the StringBuilder instance.
 */
StringBuilder.prototype.minus = function (num = 0) {
    if (typeof num !== 'number') {
        console.log(`'${num}' is not a number! Use .minus() method with a number.`);
    } else {
        this.value = this.value.substr(0, (this.value.length - num));
    }

    return this;
}

/**
 * The multiply method repeats the stored string 'multiplier' times.
 * @param {number} multiplier - The number of times to repeat the stored string.
 * @returns {object} - Returns the StringBuilder instance.
 */
StringBuilder.prototype.multiply = function (multiplier) {
    if (typeof multiplier !== 'number') {
        console.log(`'${multiplier}' is not a number! Use .multiply() method with a number.`);
    } else {
        this.value = this.value.repeat(multiplier);
    }

    return this;
}

/**
 * The divide method leaves the first 'startPosition' characters of the stored string, 
 * where k = Math.floor(this.value.length / divisor).
 * @param {number} divisor - The divisor to use for the division
 * @returns {object} this - Returns the current instance of StringBuilder
 */
StringBuilder.prototype.divide = function (divisor) {
    if (typeof divisor !== 'number' || divisor === 0) {
        console.log(`'${divisor}' is null or not a number! Use .divide() method with a number different from null.`);
    } else {
        let endPosioton = Math.floor(this.value.length / divisor);
        this.value = this.value.slice(0, endPosioton);
    }

    return this;
}

/**
 * Remove taken string str from stored.
 * @param {string} subStr - The string to remove
 * @returns {object} this - Returns the current instance of StringBuilder
 */
StringBuilder.prototype.remove = function (subStr) {
    this.value += '';
    while (this.value.includes(subStr)) {
        let startPosition = this.value.indexOf(subStr);
        this.value = this.value.split('');
        this.value.splice(startPosition, subStr.length);
        this.value = this.value.join('');
    }

    return this;
}

/**
 * Leaves substring starting from 'startPosition' and with length 'length';
 * @param {number} startPosition - The starting position of the substring
 * @param {number} length - The length of the substring
 * @returns {object} this - Returns the current instance of StringBuilder
 */
StringBuilder.prototype.sub = function (startPosition, length) {
    if (typeof startPosition !== 'number' || typeof length !== 'number') {
        console.log(`'${startPosition}' or ${length} is not a number! Use .sub() method with a number.`);
    } else {
        this.value = this.value.split('');
        this.value.splice((startPosition - 1), length);
        this.value = this.value.join('');
    }

    return this;
}

/*
IntBuilder
*/

/**
 * A class for building integers
 */
class IntBuilder extends Builder {
    constructor(value = 0) {
        super(value);
    }
    /**
     * leaves remainder of the division stored value with on n;
     * @param {number} divisor - The divisor to use for the division
     * @returns {object} this - Returns the current instance of IntBuilder
     */
    mod(divisor) {
        if (divisor === 0) {
            console.log('Cannot divide by zero!')
        } else {
            this.value = this.value % divisor;
        }
        return this;
    }
    /**
     * Static method: Generates a random number within a range
     * @param {number} from - The lower bound of the range
     * @param {number} to - The upper bound of the range
     * @returns {number} - The random number generated
     */
    static random(from, to) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }
}

/*
Tests:
*/

const intBuilder = new IntBuilder(10); // 10;
intBuilder
  .plus(2, 3, 2)                     // 17;
  .minus(1, 2)                       // 14;
  .multiply(2)                       // 28;
  .divide(4)                         // 7;
  .mod(3)                            // 1;
  .get();                            // -> 1;

console.log(intBuilder.get());

const strBuilder = new StringBuilder('Hello'); // 'Hello';
strBuilder
  .plus(' all', '!')                         // 'Hello all!'
  .minus(4)                                  // 'Hello '
  .multiply(3)                               // 'Hello Hello Hello '
  .divide(4)                                 // 'Hell';
  .remove('l')                               // 'He';
  .sub(1,1)                                  // 'e';
  .get();                                    // -> 'e';

console.log(strBuilder.get());