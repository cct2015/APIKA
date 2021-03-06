import _ from 'lodash';

// The structure "requiredFields" describes proxy types and list of required fields for this proxy 
// Key is proxy_type
// Value is list of required fields
const requiredFieldsForProxy = {
  emqtt: ['url', 'elasticsearch'],
  apiUmbrella: ['url', 'apiKey', 'authToken', 'elasticsearch'],
}

export default function validateSchema(proxyType, proxyFields) {
  // Find required fields for current proxy type
  const requiredFields = requiredFieldsForProxy[proxyType];

  // If unknown proxy type then show error
  if (requiredFields === undefined) {
    throw new Error(`Not implemented schema validation for "${proxyType}" type`);
  }

  // Check all fields in schema for filling 
  return _.reduce(requiredFields, (result, field) => 
    {
      return result && !!proxyFields[field]
    }, true)
}