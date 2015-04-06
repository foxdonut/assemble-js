# assemble-js
Assemble different stacks for JS development for learning purposes.

## Purpose

This is an exploration of JavaScript libraries and their combination for building web applications.

## Goal

Find interesting combinations that help writing JavaScript web applications that are

* Modular
* Loosely coupled
* Unit testable
* Easy to work with during development
* Packagable for production deployment.

Different git branches are used for different combinations.

Currently, master is using, on the client:

* [Browserify](http://browserify.org)
* [stringify](http://johnpostlethwait.github.io/stringify)
* [wire.js](https://github.com/cujojs/wire)
* [rest.js](https://github.com/cujojs/rest)
* [KnockoutJS](http://knockoutjs.com)

For testing:

* [tape](https://github.com/substack/tape)
* [tessed](https://github.com/scottcorgan/tessed)
* [testling](https://ci.testling.com/guide/tape)
* [PhantomJS](http://phantomjs.org)

On the server:

* [Node](https://nodejs.org)
* [Express](http://expressjs.com)

For building:

* [Gulp](http://gulpjs.com)

Of particular interest to me is [CujoJS](http://cujojs.com) and its [wire.js](https://github.com/cujojs/wire) and [rest.js](https://github.com/cujojs/rest) libraries. From there stems the motivation of assembling a JavaScript web application stack composed of small, focused libraries instead of large frameworks.

