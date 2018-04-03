import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  launchDarkly: service('launch-darkly'),

  model() {
    window.console.log('loaded route index', this.get('launchDarkly'));
  }
});
