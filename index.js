/* eslint-env node */
'use strict';

const Rollup = require('broccoli-rollup');
const { es6Transform } = require('ember-cli-es6-transform');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-luxon',

  included(app) {
    this._super.included.apply(app, arguments);

    app.import('vendor/luxon.js');
  },

  treeForVendor(tree) {
    let rollupTree = new Rollup('./node_modules/luxon/src', {
      rollup: {
        input: 'luxon.js',
        output: {
          file: 'luxon.js',
          format: 'es',
        }
      }
    });

    const babel = this.parent.findAddonByName('ember-cli-babel');
    const babelOptions = babel.buildBabelOptions();

    let foo = es6Transform(rollupTree, babelOptions);
    return mergeTrees([foo, tree]);
  }
};
