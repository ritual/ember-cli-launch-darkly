import Application from '@ember/application';

import { initialize } from 'dummy/initializers/@busy-web/ember-cli-launch-darkly';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import destroyApp from '../../../helpers/destroy-app';

module('Unit | Initializer | @busy-web/ember-cli-launch-darkly', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.TestApplication = Application.extend();
    this.TestApplication.initializer({
      name: 'initializer under test',
      initialize
    });

    this.application = this.TestApplication.create({ autoboot: false });
  });

  hooks.afterEach(function() {
    destroyApp(this.application);
  });

  test('it works', async function(assert) {
    const done = assert.async();

    run.next(() => {
      this.application.boot();

      assert.ok(true);
      done();
    });
  });
});
