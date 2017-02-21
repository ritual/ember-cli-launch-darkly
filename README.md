# ember-cli-launch-darkly

Ember addon for integrating with launch darkly javascript sdk

## Installation

* `ember install ember-cli-launch-darkly`

## Usage

ember-cli-launch-darkly addon sets up a service for injecting with `launchDarkly: Ember.inject.service()` the service itself will not do anything until
`initialize` has benn called.

The initialize method takes 3 params:
```
export default Ember.Object.extend({
  launchDarkly: Ember.inject.service(),

  init() {
    this._super();
    let user = {
      key: 'some_value',
      firstName: 'foo',
      lastMame: 'bar',
    };

    let options = {
      // launch darkly options here if needed
    };

    this.get('launchDarkly').initialize('LAUNCH_DARKLY_APP_ID', user, options);
  }
});
```

After initialize is called then any methods on Launch Darkly's SDK can be called:
```
  var toggle = this.get('launchDarkly').variation(key, defaultValue);
```

For more information refer to the launch darkly sdk
[launch darkly](http://docs.launchdarkly.com/docs/js-sdk-reference#section-changing-the-user-context)

