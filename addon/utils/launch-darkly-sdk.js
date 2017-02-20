/**
 * @module Utils
 *
 */
import client from 'ldclient';

export default function launchDarklySdk(id, data, options={}) {
  return client.initialize(id, data, options);
}
