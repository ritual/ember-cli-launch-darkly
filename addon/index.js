/**
 *
 */
import Ember from 'ember';
import client from 'ldclient';

let LDClient = null;

const LaunchDarkly = Ember.Object.extend(Ember.Evented, {

	/**
	 * Send a `track` event to Launch Darkly
	 *
	 * @public
	 * @async
	 * @method track
	 */
	track(goalKey) {
		return new Ember.RSVP.Promise(resolve => {
			return LDClient.track(goalKey, () => {
				Ember.run(null, resolve, {});
			});
		});
	},

	/**
	 * Triggered when the `onReady` listener is fired
	 * apply all the LD flags and attache the change listener
	 *
	 * @public
	 * @async
	 * @method onReady
	 */
	onReady() {
		this.trigger('ready');
	},

	/**
	 * Triggered when the `change` listener is fired
	 * Hot applies all the updated LD flags
	 *
	 * @public
	 * @async
	 * @method onChange
	 * @param {Object} flags
	 */
	onChange(flags) {
		this.trigger('change', flags);
	},

	/**
	 * Proxy the Launch Darkly client to call the allFlags() method
	 *
	 * @public
	 * @async
	 * @method allFlags
	 */
	allFlags() {
		return LDClient.allFlags();
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
    return LDClient.variation(key, defaultValue);
  },

  identify(user, hash) {
    return Ember.RSVP.Promise(resolve => {
      LDClient.identify(user, hash, (res) => {
        Ember.run(null, resolve, res);
      });
    });
  }
});

LaunchDarkly.reopenClass({
  _create: LaunchDarkly.create,

  create(id, data={}, options={}) {
    const inst = this._create();
    LDClient = client.initialize(id, data, options);

    LDClient.on('change', data => inst.onChage(data));
    LDClient.on('ready', () => inst.onReady());

    return inst;
  }
});

export default LaunchDarkly;
