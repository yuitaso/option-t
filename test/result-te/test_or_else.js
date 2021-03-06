/*
 * MIT License
 *
 * Copyright (c) 2016 Tetsuharu OHZEKI <saneyuki.snyk@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

const assert = require('assert');

const ResultMod = require('../../cjs/Result');
const Ok = ResultMod.Ok;
const Err = ResultMod.Err;

describe('Result<T, E>.orElse()', function(){
    describe('Ok<T>', function () {
        describe('return Ok', function () {
            const EXPECTED = 0;
            const NOT_EXPECTED = 1;

            let opIsCalled = false;
            let result = null;
            const op = function () {
                opIsCalled = true;
                return new Ok(NOT_EXPECTED);
            };

            before(function(){
                assert.notStrictEqual(opIsCalled, true);
                assert.notStrictEqual(EXPECTED, NOT_EXPECTED);

                const original = new Ok(EXPECTED);
                result = original.orElse(op);
            });

            it('the returned value should be `Ok', function () {
                assert.strictEqual(result.isOk(), true);
            });

            it('the `op` callbacl should not be called', function () {
                assert.strictEqual(opIsCalled, false);
            });

            it('the returned value should wrap the expected value', function () {
                assert.strictEqual(result.unwrap(), EXPECTED);
            });
        });

        describe('return Err', function () {
            const EXPECTED = 0;
            const NOT_EXPECTED = 1;

            let opIsCalled = false;
            let result = null;
            const op = function () {
                opIsCalled = true;
                return new Err(NOT_EXPECTED);
            };

            before(function(){
                assert.notStrictEqual(opIsCalled, true);
                assert.notStrictEqual(EXPECTED, NOT_EXPECTED);

                const original = new Ok(EXPECTED);
                result = original.orElse(op);
            });

            it('the returned value should be `Ok', function () {
                assert.strictEqual(result.isOk(), true);
            });

            it('the `op` callbacl should not be called', function () {
                assert.strictEqual(opIsCalled, false);
            });

            it('the returned value should wrap the expected value', function () {
                assert.strictEqual(result.unwrap(), EXPECTED);
            });
        });

        describe('return non Result type', function () {
            let error = null;

            before(function () {
                try {
                    const result = new Ok(1);
                    result.orElse(function (v) {
                        return v;
                    });
                }
                catch (e) {
                    error = e;
                }
            });

            it('should be expected', function () {
                assert.strictEqual(error, null);
            });
        });
    });

    describe('Err<E>', function () {
        describe('return Ok', function () {
            const ORIGIN = 0;
            const EXPECTED = 1;

            let argument = null;
            let result = null;
            const op = function (v) {
                argument = v;
                return new Ok(EXPECTED);
            };

            before(function(){
                assert.notStrictEqual(argument, ORIGIN);
                assert.notStrictEqual(result, EXPECTED);
                assert.notStrictEqual(ORIGIN, EXPECTED);

                const original = new Err(ORIGIN);
                result = original.orElse(op);
            });

            it('the returned value should be `Ok', function () {
                assert.strictEqual(result.isOk(), true);
            });

            it('the argument of `op` should be the expected value', function () {
                assert.strictEqual(argument, ORIGIN);
            });

            it('the returned value should wrap the expected value', function () {
                assert.strictEqual(result.unwrap(), EXPECTED);
            });
        });

        describe('return Err', function () {
            const ORIGIN = 0;
            const EXPECTED = 1;

            let argument = null;
            let result = null;
            const op = function (v) {
                argument = v;
                return new Err(EXPECTED);
            };

            before(function(){
                assert.notStrictEqual(argument, ORIGIN);
                assert.notStrictEqual(result, EXPECTED);
                assert.notStrictEqual(ORIGIN, EXPECTED);

                const original = new Err(ORIGIN);
                result = original.orElse(op);
            });

            it('the returned value should be `Err', function () {
                assert.strictEqual(result.isErr(), true);
            });

            it('the argument of `op` should be the expected value', function () {
                assert.strictEqual(argument, ORIGIN);
            });

            it('the returned value should wrap the expected value', function () {
                assert.strictEqual(result.unwrapErr(), EXPECTED);
            });
        });

        describe('return non Result type', function () {
            let error = null;

            before(function () {
                try {
                    const result = new Err(1);
                    result.orElse(function (v) {
                        return v;
                    });
                }
                catch (e) {
                    error = e;
                }
            });

            it('should be the expected error', function () {
                assert.strictEqual(error instanceof TypeError, true);
            });

            it('should be the expected message', function () {
                assert.strictEqual(error.message, 'Result<T, E>.orElse()\' param `op` should return `Result<T, F>`.');
            });
        });
    });
});
