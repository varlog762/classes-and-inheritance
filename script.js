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
Builder.prototype.plus = function () {
    for (let num of arguments) {
        this.value += num;
    }

    return this;
}

/**
 * The minus method subtracts all passed arguments from the stored value.
 * @param {number} - An arbitrary number of values to be subtracted from the stored value.
 * @returns {object} - Returns the Builder instance. 
 */
Builder.prototype.minus = function () {
    for (let num of arguments) {
        this.value -= num;
    }

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
