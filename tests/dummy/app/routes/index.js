import Ember from 'ember';
import LaunchDarkly from 'ember-cli-launch-darkly';

export default Ember.Route.extend({
  model() {
    console.log('loaded route index', LaunchDarkly.create());
  }
});
