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
    if (app.import) {
			const vendor = this.treePaths.vendor;
      app.import(vendor + '/launchdarkly-js-client-sdk/dist/ldclient.min.js', { prepend: true });
    }
	},

	treeForVendor(vendorTree) {
		var trees = [];

		if (vendorTree) {
			trees.push(vendorTree);
		}

		var ldPath = path.dirname('./node_modules/launchdarkly-js-client-sdk/dist');

		trees.push(new Funnel(ldPath, {
			destDir: 'launchdarkly-js-client-sdk',
			include: [new RegExp(/\.js$/)]
		}));

		return mergeTrees(trees);
	}
};
