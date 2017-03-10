import launchDarkly from '../services/launch-darkly';

export function initialize() {
  let application = arguments[1] || arguments[0];
  let serviceLookupName = `service:launchDarkly`;

  application.register(serviceLookupName, launchDarkly);
  application.inject(serviceLookupName, 'application', 'application:main');
}

export default {
  name: 'ember-cli-launch-darkly',
  initialize
};
