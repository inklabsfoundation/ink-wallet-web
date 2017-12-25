# ink-wallet-web [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> INK WEB Wallet

Universal React/node.js application 

Derive path: m/88'/0'/1',

Powered by [electrode.io](http://www.electrode.io/)
## Requirements
"node": ">= 4 <= 8",
## Setup

```sh
$ yarn install
```

## Run 

### Development
```sh
$ clap dev 
```

#### For frontend development only without restart of nodemon

```sh
$ yarn install
$ clap build
$ clap wds.hot //in the another terminal
$ clap server


```

### Run in production mode
```sh
$ clap build
$ yarn prod 
```

[npm-image]: https://badge.fury.io/js/qtum-web.svg
[npm-url]: https://npmjs.org/package/qtum-web
[travis-image]: https://travis-ci.org/EvercodeLab/qtum-web.svg?branch=master
[travis-url]: https://travis-ci.org/EvercodeLab/qtum-web
[daviddm-image]: https://david-dm.org/EvercodeLab/qtum-web.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/EvercodeLab/qtum-web
