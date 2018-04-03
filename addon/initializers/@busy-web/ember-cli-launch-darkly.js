import launchDarkly from '@busy-web/ember-cli-launch-darkly/services/launch-darkly';

export function initialize(application) {
  let serviceLookupName = `service:launchDarkly`;

  application.register(serviceLookupName, launchDarkly);
  application.inject(serviceLookupName, 'application', 'application:main');
}

export default {
  initialize
};
