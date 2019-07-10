# jscodeshift-examples

## Installation

Install jscodeshift by running `yarn`.

## Usage

You can run do a dry run of any codemod in this repo via:

```
yarn jscodeshift -d -p -t lodash/codemod.js lodash/sample.js
```

Replace `lodash` in the above commands with the names of the other two
directories, `apple-to-orange` and `convert-args` to run those codemods.

To run a codemod for real, run:

```
yarn jscodeshift -t lodash/codemod.js lodash/sample.js
```
