/**
 * A module for producing a changeset of differences between one module and
 * another.
 *
 * When applied to a project in the Precision Health Cloud, the changeset can
 * be used to migrate between Ontology versions with minimal downtime.
 *
 * @module @lifeomic/termdiff
 */

import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';

export enum OP {
  add = 'add',
  remove = 'remove',
}

export interface Changeset<T> {
  op: OP;
  value: T;
}

/**
 * Produces a changeset to migrate from the first array to the second array.
 *
 * The shape of the objects in both arrays is expected to be identical and
 * consistent.
 *
 * If {@param second} is null, the changeset produced will create
 * {@param first}.
 *
 * @param {*} first an array of objects
 * @param {*} second an array of objects
 */
export const diff = <T = any>(
  first?: T[],
  second?: T[],
): Changeset<T>[] => {
  if (!first) {
    return [];
  }

  if (!second) {
    return diff([], first);
  }

  const adds = differenceWith(second, first, isEqual).map((value) => ({
    op: OP.add,
    value: value,
  }));

  const removes = differenceWith(first, second, isEqual).map((value) => ({
    op: OP.remove,
    value: value,
  }));

  return adds.concat(removes);
};
