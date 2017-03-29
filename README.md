# prox-explorer

A web-based exploration of event APIs for [Project Prox][prox].

## Setup

Requirements:
* [Node.js](http://nodejs.org/)
* [Heroku Toolbelt](https://toolbelt.heroku.com/)

Install deps:
```sh
npm install
```

[Download .env-prox-explorer][.env], which contains the API keys. Rename it:
```sh
mv .env-prox-explorer .env
```

Let us know if you don't have access. Note that the production server uses a
separate key from ^.

## Running
Run locally:
```sh
heroku local
```

By default, the server's local address should be: http://localhost:5000

## Deployment
Pushing to `mozilla-mobile/prox-explorer:master` should autodeploy to Heroku.
If you need manual access, access the web interface or push to the heroku
remote.

[.env]: https://drive.google.com/a/mozilla.com/file/d/0B1U7M7wyeYhFNERndHdHYTFZLTA/view?usp=sharing
[prox]: https://github.com/mozilla-mobile/prox
