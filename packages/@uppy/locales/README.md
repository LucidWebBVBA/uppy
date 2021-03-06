# @lucidweb/uppy-locales

<img src="https://uppy.io/images/logos/uppy-dog-head-arrow.svg" width="120" alt="Uppy logo: a superman puppy in a pink suit" align="right">

<a href="https://www.npmjs.com/package/@lucidweb/uppy-locales"><img src="https://img.shields.io/npm/v/@lucidweb/uppy-locales.svg?style=flat-square"></a>
<a href="https://travis-ci.org/transloadit/uppy"><img src="https://img.shields.io/travis/transloadit/uppy/master.svg?style=flat-square" alt="Build Status"></a>

This packages contains all of the locale packs that you can use to make Uppy speak your language! If your language is missing, please consider [contributing](https://github.com/transloadit/uppy/tree/master/packages/%40uppy/locales/src), starting with `en_US`, which is always up-to-date automatically.

## Installation

```bash
$ npm install @lucidweb/uppy-locales --save
```

## Documentation

```bash
$ npm install @lucidweb/uppy-core @lucidweb/uppy-locales --save
```

```js
const Uppy = require('@lucidweb/uppy-core')
const Russian = require('@lucidweb/uppy-locales/lib/ru_RU')
const uppy = new Uppy({
  debug: true,
  meta: {
    username: 'John',
    license: 'Creative Commons'
  },
  locale: Russian
})
```

Please see [locale docs](https://uppy.io/docs/uppy/#locale) for more details.

## License

[The MIT License](./LICENSE).
