Submitting Issues
=================

If you are submitting a bug, please create a [jsfiddle](http://jsfiddle.net/) demonstrating the issue.

Contributing code
=================

To contribute, fork the library and install gulp and dependencies. You need [node](http://nodejs.org/); use [nvm](https://github.com/creationix/nvm) or [nenv](https://github.com/ryuone/nenv) to install it.

```bash
git clone https://github.com/dalelotts/angular-bootstrap-datetimepicker.git
cd angular-bootstrap-datetimepicker
npm install -g gulp
npm install
git checkout develop  # all patches against develop branch, please!
gulp                  # this runs jscs, jshint, complexity checks, and unit tests.
```

Very important notes
====================

 * **Pull pull requests to the `master` branch will be closed.** Please submit all pull requests to the `develop` branch.
 * **Pull requests will not be merged without unit tests.**
 * **Do not include the minified files in your pull request.**
 * **Have good tests. If you don't have tests for every line and branch in your changes, I won't accept the PR.
 * **If your PR fails the CI build, I won't look at it.

Gulp tasks
===========

We use Gulp for managing the build. Here are some useful Gulp tasks:

  * `gulp` The default task checks the coding style, lints the code, calculates complexity, runs the tests, and enforces code coverage. You should make sure you do this before submitting a PR.
