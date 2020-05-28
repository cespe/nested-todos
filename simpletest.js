/**
 * SimpleTest is a fork of TinyTest that adds a few presentation refinements.
 * Functionality remains the same.
 */

var TinyTest = {

    run: function(tests) {	// 'tests' is the object holding our test functions,
							// not the alias created for the run function
		// counters for statistics
        var failures = 0;
		var successes = 0;
		var unautomated = 0;
		var unimplemented = 0;
		var unnecessary = 0;
		var numberOfTests = 0;
		function pluralize(number, word) {
			if (number === 1) {
				return " " + word;
			} else {
				return " " + word + "s";
			}
		}
        for (var testName in tests) {
			numberOfTests++;
            var testAction = tests[testName];
            try {
                //testAction.apply(this); 
				testAction();  // already bound to TinyTest so apply(this) not needed
				if (testName.startsWith('Section:')) {
					numberOfTests--;
					console.log('%c' + testName, "color: purple; font-weight: bold;");
				} else {
					successes++;
					console.log(testName + '%c Test passed.', "color: green;");
				}
            } catch (e) {
				if (e.message === 'manual') {
					unautomated++;
					console.log(testName + '%c Not automated, test manually.', "color: blue;");
				} else if (e.message === 'future') {
					unimplemented++;
					console.log(testName + '%c Not implemented.', "color: orange;");
				} else if (e.message === 'remove') {
					unnecessary++;
					console.log(testName + '%c Not needed.', "color: purple;");
				} else {
					failures++;
					console.groupCollapsed(testName + ' %c' +  e, "color: red;");
					console.error(e.stack);
					console.groupEnd();
				}
			}
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
				var aside = document.getElementById("simpletest");
				aside.style.backgroundColor =  (failures == 0 ? '#99ff99' : '#ff9999');
				aside.innerText = "Ran " + numberOfTests + pluralize(numberOfTests, "test") + ". " + successes + " passed and " + failures + " failed. " + unautomated + " are not automated and " + unimplemented + " are not implemented."
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

	manual: function(msg) {
		throw new Error('manual');
	},

	future: function(msg) {
		throw new Error('future');
	},

	remove: function(msg) {
		throw new Error('remove');
	},

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

	assertStrictDoesNotEqual: function(expected, actual) {
		if (expected === actual) {
            throw new Error('assertStrictDoesNotEqual() "' + expected + '" === "' + actual + '"');
		}
	},

};

var fail               = TinyTest.fail.bind(TinyTest),
	manual			   = TinyTest.manual.bind(TinyTest),
	future			   = TinyTest.future.bind(TinyTest),
	remove			   = TinyTest.remove.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertStrictEquals.bind(TinyTest), // alias for assertEquals in original, changed here to Strict
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
	neq				   = TinyTest.assertStrictDoesNotEqual.bind(TinyTest),
//	eqstrict		   = TinyTest.assertStrictEquals.bind(TinyTest),  // added alias
    tests              = TinyTest.run.bind(TinyTest);

