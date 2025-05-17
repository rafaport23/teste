import { shuffle, winCondition } from './memory.js';
import assert from 'assert';

const original = [1,2,3,4];
const shuffled = shuffle([...original]);
assert.notDeepStrictEqual(shuffled, original, 'shuffle should modify array order');
assert.strictEqual(winCondition(8), true, 'winCondition should be true with 8 pairs');
console.log('All tests passed');
