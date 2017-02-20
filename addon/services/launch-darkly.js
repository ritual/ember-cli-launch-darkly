/**
 * @module Services
 *
 */
import Ember from 'ember';
import ldclient from 'ember-cli-launch-darkly/utils/launch-darkly-sdk';

export default Ember.Service.extend(Ember.Evented, {
  _client: null,
  isInitialized: false,

  initialize(id, user, options) {
    this._client = ldclient(id, user, options);

   // this._client.on('change', function(data) {
   //   this.trigger('change', data);
   // }, this);
   //
   // this._client.on('ready', function() {
   //   this.trigger('ready');
   // }, this);
  },

	/**
	 * Send a `track` event to Launch Darkly
	 *
	 * @public
	 * @async
	 * @method track
	 */
	track(key, data) {
    if (!this.get('isInitialized')) {
      Ember.Logger.warn("<service:launch-darkly::track> was called before it was initialized");
    }

    return this._client.track(key, data);
	},

	/**
	 * Proxy the Launch Darkly client to call the allFlags() method
	 *
	 * @public
	 * @async
	 * @method allFlags
	 */
	allFlags() {
    if (!this.get('isInitialized')) {
      Ember.Logger.warn("<service:launch-darkly::allFlags> was called before it was initialized");
    }
		return this._client.allFlags();
	},

	/**
	 * Proxy the Launch Darkly client to call the variation() method
	 *
	 * @public
	 * @async
	 * @method getAllFlags
	 * @param {String} key the identifying key for the feature, in the format `time.freemium`
	 * @param {Boolean} defaultValue the default value to use
	 */
  variation(key, defaultValue) {
    if (!this.get('isInitialized')) {
      Ember.Logger.warn("<service:launch-darkly::variation> was called before it was initialized");
    }
    return this._client.variation(key, defaultValue);
  },

  /**
   * Proxy the Launch Darkly identify method but instead of a callback function this method
   * returns a promise when launch darkly returns
   *
   * @public
   * @method identify
   * @param user {string} user key
   * @param hash {object} hash for the user
   * @return {Ember.RSVP} a promsie object for onDone
   */
  identify(user, hash) {
    if (!this.get('isInitialized')) {
      Ember.Logger.warn("<service:launch-darkly::track> was called before it was initialized");
    }
    return Ember.RSVP.Promise(resolve => {
      this._client.identify(user, hash, (res) => {
        Ember.run(null, resolve, res);
      });
    });
  },

  on(name, target, handler) {
    this._client.on(name, function(data) {
      this.trigger(name, data);
    }, this);

    this._super(name, target, handler);
  },

  off(name, target, handler) {
    this._client.off(name);
    this._super(name, target, handler);
  }
});
