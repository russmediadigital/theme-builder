# @russmedia/theme-builder

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![CircleCI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

>

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@russmedia/theme-builder` dependency to your project

```bash
npm install @russmedia/theme-builder
```

2. Use it in your Code

```
// define some options
const options = [
  {
    directories: [
      path.resolve(__dirname, 'src', 'theme1', 'components') // path to some theme directory,
      path.resolve(__dirname, 'src', 'theme2', 'components') // path to some different theme directory,
    ],
    prefix: '@components'
  },
]

// Create a new Instance
const instance = new ThemeResolver(options)

// Get correct resolver for a path
const path = '@components/test.vue'
const resolver = instance.getResolver(path)

// strip prefix from path
const filePath = instance.getFileName(path)

// resolveComponent
instance.resolveComponentPath(filePath, insance)
```


## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Test code with `npx jest`

## License

[MIT License](./LICENSE)

Copyright (c) Julian Martin <julian.martin@russmedia.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@russmedia/theme-builder/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@russmedia/theme-builder

[npm-downloads-src]: https://img.shields.io/npm/dt/@russmedia/theme-builder.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@russmedia/theme-builder

[circle-ci-src]: https://circleci.com/gh/JulianMar/nuxt-bugsnag/tree/master.svg?style=shield
[circle-ci-href]: https://circleci.com/gh/julianmar/nuxt-bugsnag

[codecov-src]: https://img.shields.io/codecov/c/github/julianmar/nuxt-bugsnag.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/julianmar/nuxt-bugsnag

[license-src]: https://img.shields.io/npm/l/nuxt-bugsnag.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-bugsnag
