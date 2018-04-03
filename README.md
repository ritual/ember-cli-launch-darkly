ember-cli-launch-darkly
==============================================================================

Ember addon for integrating with launch darkly javascript sdk

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-launch-darkly
```


Usage
------------------------------------------------------------------------------

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


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-cli-launch-darkly`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
