<h1 align="center">Welcome to colvert 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/abdulmuqeet1/colvert#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/abdulmuqeet1/colvert/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/abdulmuqeet1/colvert/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/abdulmuqeet1/colvert" />
  </a>
</p>

> color value conversion package

### 🏠 [Homepage](https://github.com/abdulmuqeet1/colvert#readme)

## Install

```sh
npm i colvert

or npm install colvert
```

```sh
const conv = require("colvert");
```

## Usage

```sh

const col = conv.hexTorgb("#0A167B");   // returns [10,22,123]

const col = conv.hexTohsl("#11191B");   // returns [192,23,9]

const col = conv.rgbTohex([23, 180, 60]);   // returns "#17b43c"

const col = conv.randomcolor();   // returns random color(hex)


```

## Functions

- rgbTohsl
- rgbTohex
- rgbTocmyk

- hexTorgb
- hexTohsl
- hexTocmyk

- hslTorgb
- hslTohex
- hslTohsv

- cmykTorgb
- cmykTohex
- cmykTohsl

- randomcolor

## Author

👤 **abdul**

- Github: [@abdulmuqeet1](https://github.com/abdulmuqeet1)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/abdulmuqeet1/colvert/issues). You can also take a look at the [contributing guide](https://github.com/abdulmuqeet1/colvert/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [abdul](https://github.com/abdulmuqeet1).<br />
This project is [MIT](https://github.com/abdulmuqeet1/colvert/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
