Node.js & Express Application Best Practices
============================================

[![Shippable](https://img.shields.io/shippable/55fe44171895ca4474169af3.svg)](https://app.shippable.com/projects/55fe44171895ca4474169af3)

This project is an attempt to create some best practices around node.js and express applications, particularly folder structure and code separation. One of the blessings and curses of Javascript is it's flexibility, however this more often than not leads to tightly coupled services, 1000 line files, a mixture of filename formats and so on. I'm hoping this layout provides a starting point for projects.

This is still big work in progress, so if you have any ideas, please open an issue ticket as I'd love to hear them!

## To run the basic app
```bash
npm install -g gulp
npm install
node ./bin/create-users.js
gulp develop
```

## Other useful commands
```bash
npm run lint # which runs eslint
npm run unit-tests # which runs only unit tests
npm run integration-tests # which runs only integration tests
npm test # which runs eslint, unit and integration tests. Useful for pre-commit hook or CI
```
