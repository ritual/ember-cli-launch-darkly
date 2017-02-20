import Ember from 'ember';

export default Ember.Route.extend({
  launchDarkly: Ember.inject.service('launch-darkly'),

  model() {
    console.log('loaded route index', this.get('launchDarkly'));
  }
});
