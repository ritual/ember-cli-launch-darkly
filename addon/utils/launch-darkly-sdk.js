/**
 * @module Utils
 *
 */
export default function launchDarklySdk(id, data, options={}) {
  return window.LDClient.initialize(id, data, options);
}
