/**
 * A module for producing a changset of differences between one module and
 * another.
 *
 * When applied to a project in the Precision Health Cloud, the changset can
 * be used to migrate between Ontology versions with minimal downtime.
 *
 * @module @lifeomic/termdiff
 */

'use strict';

const _equal = require('deep-equal');
const _map = require('lodash/map');
const _filter = require('lodash/filter');

const OP_ADD = 'add';
const OP_REMOVE = 'remove';

/**
 * Produces a changeset to migrate from the first array to the second array.
 *
 * The shape of the objects in both arrays is expected to be identical and
 * consistent.
 *
 * If {@param second} is null, the changeset produced will create
 * {@param first}.
 *
 * @param {*} first   an array of objects
 * @param {*} second  an array of objects
 */
const diff = (first, second) => {
  if (typeof first === 'undefined' || !first) {
    return [];
  }

  if (typeof second === 'undefined' || !second) {
    return diff([], first);
  }

  let adds = _filter(second, (value) => !first.some(x => _equal(x, value)));
  adds = _map(adds, (value) => {
    return {
      'op': OP_ADD,
      'value': value
    };
  });

  let removes = _filter(first, (value) => !second.some(x => _equal(x, value)));
  removes = _map(removes, (value) => {
    return {
      'op': OP_REMOVE,
      'value': value
    };
  });

  return adds.concat(removes);
};

module.exports = {
  diff: diff
};
