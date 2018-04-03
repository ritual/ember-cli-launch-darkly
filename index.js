'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: '@busy-web/ember-cli-launch-darkly',

  config(env, config) {
    const LDConfig = config['launch-darkly'] || {};
    return {
      ENVIRONMENT_ID: LDConfig['ENVIRONMENT_ID']
    };
	},

  included(app) {
    this._super.included(app);

		// see: https://github.com/ember-cli/ember-cli/issues/3718
		while (typeof app.import !== 'function' && app.app) {
			app = app.app;
		}

		this.app = app;
		this.importBrowserDeps(app);
  },

  importBrowserDeps(app) {
    if(app.import) {
		  var vendor = this.treePaths.vendor;
      app.import(vendor + '/ldclient-js/dist/ldclient.js', {prepend: true});
      //app.import('vendor/shims.js'); //, {prepend: true});
    }
	},

	treeForVendor(vendorTree) {
		var trees = [];

		if (vendorTree) {
			trees.push(vendorTree);
		}

		var ldPath = path.dirname('./node_modules/ldclient-js/dist');

		trees.push(new Funnel(ldPath, {
			destDir: 'ldclient-js',
			include: [new RegExp(/\.js$/)]
		}));

		return mergeTrees(trees);
	}
};
