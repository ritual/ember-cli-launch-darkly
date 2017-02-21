//import config from '../config/environment';
import launchDarkly from '../services/launch-darkly';

export function initialize() {
  let application = arguments[1] || arguments[0];
  let serviceLookupName = `service:launchDarkly`;

  application.register(serviceLookupName, launchDarkly);
 // application.inject('route', serviceName, serviceLookupName);
 // application.inject('controller', serviceName, serviceLookupName);
 // application.inject('component', serviceName, serviceLookupName);
  application.inject(serviceLookupName, 'application', 'application:main');
  console.log('launchDarkly initializer');
}

export default {
  name: 'ember-cli-launch-darkly',
  initialize
};
