/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-3-23.js
 * @description Array.prototype.every uses inherited valueOf method when 'length' is an object with an own toString and inherited valueOf methods
 */


function testcase() {

        function callbackfn1(val, idx, obj) {
            return val > 10;
        }

        function callbackfn2(val, idx, obj) {
            return val > 11;
        }

        var valueOfAccessed = false;
        var toStringAccessed = false;

        var proto = {
            valueOf: function () {
                valueOfAccessed = true;
                return 2;
            }
        };

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();

        child.toString = function () {
            toStringAccessed = true;
            return '1';
        };

        var obj = {
            0: 12,
            1: 11,
            2: 9,
            length: child
        };

        return Array.prototype.every.call(obj, callbackfn1) &&
            !Array.prototype.every.call(obj, callbackfn2) &&
            valueOfAccessed && !toStringAccessed;
    }
runTestCase(testcase);
