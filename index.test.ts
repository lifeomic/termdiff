import { diff } from './index';

test('diff: empty', () => {
  const exp: [] = [];
  expect(diff()).toStrictEqual(exp);
});

test('diff: add', () => {
  const input = [
    {

    },
  ];
  const exp = [
    {
      'op': 'add',
      'value': {},
    },
  ];
  expect(diff(input)).toStrictEqual(exp);
});

test('diff: multiple adds', () => {
  const input = [
    {
      '#': 1,
    },
    {
      '#': 2,
    },
    {
      '#': 3,
    },
  ];
  const exp = [
    {
      'op': 'add',
      'value': {
        '#': 1,
      },
    },
    {
      'op': 'add',
      'value': {
        '#': 2,
      },
    },
    {
      'op': 'add',
      'value': {
        '#': 3,
      },
    },
  ];
  expect(diff(input)).toStrictEqual(exp);
});

test('diff: remove', () => {
  const first = [
    {

    },
  ];
  const second: never[] = [

  ];
  const exp = [
    {
      'op': 'remove',
      'value': {},
    },
  ];
  expect(diff(first, second)).toStrictEqual(exp);
});

test('diff: multiple removes', () => {
  const input = [
    {
      '#': 1,
    },
    {
      '#': 2,
    },
    {
      '#': 3,
    },
  ];
  const exp = [
    {
      'op': 'remove',
      'value': {
        '#': 1,
      },
    },
    {
      'op': 'remove',
      'value': {
        '#': 2,
      },
    },
    {
      'op': 'remove',
      'value': {
        '#': 3,
      },
    },
  ];
  expect(diff(input, [])).toStrictEqual(exp);
});

test('diff: mixed', () => {
  const first = [
    {
      '#': 1,
    },
    {
      '#': 2,
    },
  ];
  const second = [
    {
      '#': 2,
    },
    {
      '#': 3,
    },
  ];
  const exp = [
    {
      'op': 'add',
      'value': {
        '#': 3,
      },
    },
    {
      'op': 'remove',
      'value': {
        '#': 1,
      },
    },
  ];
  expect(diff(first, second)).toStrictEqual(exp);
});

test('diff: duplicate', () => {
  const first = [
    {
      '#': 1,
    },
  ];
  const second = [
    {
      '#': 1,
    },
  ];
  expect(diff(first, second)).toStrictEqual([]);
});

test('diff: complex', () => {
  const first = [
    {
      'equivalence': 'subsumes',
      'source': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44.1',
      },
      'target': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44',
      },
    },
    {
      'equivalence': 'narrower',
      'source': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44',
      },
      'target': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44.1',
      },
    },
  ];
  const second = [
    {
      'equivalence': 'subsumes',
      'source': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44.1',
      },
      'target': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44',
      },
    },
    {
      'equivalence': 'specializes',
      'source': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44',
      },
      'target': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44.1',
      },
    },
  ];
  const exp = [
    {
      'op': 'add',
      'value': {
        'equivalence': 'specializes',
        'source': {
          'type': 'coding',
          'system': 'http://hl7.org/fhir/sid/icd-10',
          'code': 'G44',
        },
        'target': {
          'type': 'coding',
          'system': 'http://hl7.org/fhir/sid/icd-10',
          'code': 'G44.1',
        },
      },
    },
    {
      'op': 'remove',
      'value': {
        'equivalence': 'narrower',
        'source': {
          'type': 'coding',
          'system': 'http://hl7.org/fhir/sid/icd-10',
          'code': 'G44',
        },
        'target': {
          'type': 'coding',
          'system': 'http://hl7.org/fhir/sid/icd-10',
          'code': 'G44.1',
        },
      },
    },
  ];
  expect(diff(first, second)).toStrictEqual(exp);
});
