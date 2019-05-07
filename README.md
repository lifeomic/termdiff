![GitHub](https://img.shields.io/github/license/lifeomic/termdiff.svg?style=for-the-badge)
![Travis (.org) branch](https://img.shields.io/travis/lifeomic/termdiff/master.svg?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/lifeomic/termdiff.svg?color=blue&style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/@lifeomic/termdiff.svg?color=orange&style=for-the-badge)

# TermDiff

Compare ontologies in order to migrate between them.

## Quick Start

Install the `@lifeomic/termdiff` package.

```bash
npm install @lifeomic/termdiff
```

or

```bash
yarn add @lifeomic/termdiff
```

Import the `diff` function:

```js
const { diff } = require('termdiff');
```

Apply it to create a changeset:

```js
const changeset = diff([{ 'foo': 'bar'}], [{'qux': 'baz'}])
```

`changeset` will contain be an array of operations:

```js
console.log(JSON.stringify(changeset, null, 2));
[
  {
    "op": "add",
    "value": {
      "qux": "baz"
    }
  },
  {
    "op": "remove",
    "value": {
      "foo": "bar"
    }
  }
]
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to release the project.

### Prerequisites

What things you need to install the software and how to install them

- [Node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/docs/install#mac-stable)

### Installing

Install all dependencies using `yarn`:

```bash
yarn install
```

## Testing

We use `ava` for testing and enforce 100% code coverage using `nyc`:

```bash
yarn test
```

### Linting

Coding style is enforced through `eslint`:

```bash
yarn lint
```

You can invoke the following to style your code:

```bash
yarn lint --fix
```

## Deployment

Deployments are automated using [Travis CI](https://travis-ci.org/). Run the following to trigger a new release:

```bash
yarn version
```

See the section on [versioning](#versioning) to learn more.

## Built With

- [Node.js](https://nodejs.org/en/) - A JavaScript runtime

## Contributing

Please read [CONTRIBUTING.md](https://github.com/lifeomic/termdiff/blob/master/CODE_OF_CONDUCT.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/lifeomic/termdiff/tags).

## Authors

- **Taylor Steinberg** - *Initial work* - [tdstein](https://github.com/tdstein)

See also the list of [contributors](https://github.com/lifeomic/termdiff/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- The output format was inspired by the [JSON Patch](https://tools.ietf.org/html/draft-ietf-appsawg-json-patch-08) proposal
