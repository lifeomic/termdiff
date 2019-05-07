const test = require('ava');

const { diff } = require('./index');

test('diff: empty', t => {
  const exp = [ ];
  t.deepEqual(exp, diff());
});

test('diff: add', t => {
  const input = [
    {

    }
  ];
  const exp = [
    {
      'op': 'add',
      'value': {}
    }
  ];
  t.deepEqual(exp, diff(input));
});

test('diff: multiple adds', t => {
  const input = [
    {
      '#': 1
    },
    {
      '#': 2
    },
    {
      '#': 3
    }
  ];
  const exp = [
    {
      'op': 'add',
      'value': {
        '#': 1
      }
    },
    {
      'op': 'add',
      'value': {
        '#': 2
      }
    },
    {
      'op': 'add',
      'value': {
        '#': 3
      }
    }
  ];
  t.deepEqual(exp, diff(input));
});

test('diff: remove', t => {
  const first = [
    {

    }
  ];
  const second = [

  ];
  const exp = [
    {
      'op': 'remove',
      'value': {}
    }
  ];
  t.deepEqual(exp, diff(first, second));
});

test('diff: multiple removes', t => {
  const input = [
    {
      '#': 1
    },
    {
      '#': 2
    },
    {
      '#': 3
    }
  ];
  const exp = [
    {
      'op': 'remove',
      'value': {
        '#': 1
      }
    },
    {
      'op': 'remove',
      'value': {
        '#': 2
      }
    },
    {
      'op': 'remove',
      'value': {
        '#': 3
      }
    }
  ];
  t.deepEqual(exp, diff(input, []));
});

test('diff: mixed', t => {
  const first = [
    {
      '#': 1
    },
    {
      '#': 2
    }
  ];
  const second = [
    {
      '#': 2
    },
    {
      '#': 3
    }
  ];
  const exp = [
    {
      'op': 'add',
      'value': {
        '#': 3
      }
    },
    {
      'op': 'remove',
      'value': {
        '#': 1
      }
    }
  ];
  t.deepEqual(exp, diff(first, second));
});

test('diff: duplicate', t => {
  const first = [
    {
      '#': 1
    }
  ];
  const second = [
    {
      '#': 1
    }
  ];
  t.deepEqual([], diff(first, second));
});

test('diff: complex', t => {
  const first = [
    {
      'equivalence': 'subsumes',
      'source': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44.1'
      },
      'target': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44'
      }
    },
    {
      'equivalence': 'narrower',
      'source': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44'
      },
      'target': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44.1'
      }
    }
  ];
  const second = [
    {
      'equivalence': 'subsumes',
      'source': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44.1'
      },
      'target': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44'
      }
    },
    {
      'equivalence': 'specializes',
      'source': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44'
      },
      'target': {
        'type': 'coding',
        'system': 'http://hl7.org/fhir/sid/icd-10',
        'code': 'G44.1'
      }
    }
  ];
  const exp = [
    {
      'op': 'add',
      'value': {
        'equivalence': 'specializes',
        'source': {
          'type': 'coding',
          'system': 'http://hl7.org/fhir/sid/icd-10',
          'code': 'G44'
        },
        'target': {
          'type': 'coding',
          'system': 'http://hl7.org/fhir/sid/icd-10',
          'code': 'G44.1'
        }
      }
    },
    {
      'op': 'remove',
      'value': {
        'equivalence': 'narrower',
        'source': {
          'type': 'coding',
          'system': 'http://hl7.org/fhir/sid/icd-10',
          'code': 'G44'
        },
        'target': {
          'type': 'coding',
          'system': 'http://hl7.org/fhir/sid/icd-10',
          'code': 'G44.1'
        }
      }
    }
  ];
  t.deepEqual(exp, diff(first, second));
});
