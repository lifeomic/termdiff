import test from 'ava';

import { name } from '../src/index';

test('bootstrap', t => {
    t.is("Hello, World!", name);
})