
// Test password strength
// To run:
//  $ node pw_strength_test.js

// Variables
var PW_CHARSET = "abcdefghijABCDEFGHIJ0123456789!@#$%^&*[]{}~_-";
var PW_CHARSET_LEN = PW_CHARSET.length;
var PW_COUNT = 50000;
var MIN_PW_LEN = 1;
var MAX_PW_LEN = 20;

// JS version of methods from original passwordStrengthBar.component.ts

function getIndex(s) {
  var idx = 0;
  if (s <= 10) {
    idx = 0;
  } else if (s <= 20) {
    idx = 1;
  } else if (s <= 30) {
    idx = 2;
  } else if (s <= 40) {
    idx = 3;
  } else {
    idx = 4;
  }
  return idx
}

function measureStrength(p) {
    var _force = 0;
    var _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "
    var _lowerLetters = /[a-z]+/.test(p);
    var _upperLetters = /[A-Z]+/.test(p);
    var _numbers = /[0-9]+/.test(p);
    var _symbols = _regex.test(p);
    var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
    var _passedMatches = 0;
    for (var _i = 0, _flags_1 = _flags; _i < _flags_1.length; _i++) {
	var _flag = _flags_1[_i];
	_passedMatches += _flag === true ? 1 : 0;
    }
    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    _force += _passedMatches * 10;
    // penality (short password)
    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;
    // penality (poor variety of characters)
    _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
    _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
    _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;
    return getIndex(_force);
}

// New algorithm: https://stackoverflow.com/questions/948172/password-strength-meter

function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = {};
    for (var i = 0; i< pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    };

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
}

function checkPassStrength(pass) {
    var score = scorePassword(pass);
    var idx = 0;
    if (score > 90) {
      idx = 4;
    } else if (score > 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
    }
    return idx;
}

// Test methods

function generatePassword() {
    var length = MIN_PW_LEN + Math.floor(Math.random() * (MAX_PW_LEN - MIN_PW_LEN)),
        retVal = "";
    for (var i = 0; i < length; ++i) {
        retVal += PW_CHARSET.charAt(Math.floor(Math.random() * PW_CHARSET_LEN));
    }
    return retVal;
}

var counts = {};
var counts2 = {};

// Initialize counters
for (var i = 0; i < 5; i++) {
    counts[i] = 0;
    counts2[i] = 0;
}

console.log('Testing ' + PW_COUNT + ' passwords')
for (i = 0; i < PW_COUNT; i++) {
    var pw = generatePassword();
    counts[measureStrength(pw)]++;
    counts2[checkPassStrength(pw)]++;
}
console.log(counts);
console.log(counts2);

// v1.2.2: Old algorithm
//{ '0': 15712, '1': 414, '2': 0, '3': 5871, '4': 28003 }

// v1.2.3: New algorithm
// { '0': 3654, '1': 6100, '2': 13384, '3': 10530, '4': 16332 }
