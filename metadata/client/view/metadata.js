import { Template } from 'meteor/templating';

import formatDate from '/core/helper_functions/format_date';
import { ApiMetadata } from '../../collection';

Template.viewApiMetadata.onCreated(function () {
  // Get reference to template instance
  const instance = this;

  // Subscribe to metadata for this API Backend
  instance.subscribe('apiMetadata', instance.data.api._id);
});

Template.viewApiMetadata.helpers({
  metadata () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get the API Backend ID from template instance
    const apiId = instance.data.api._id;

    // Get API Backend metadata
    // TODO: migrate ApiMetadata schema to use 'apiId' instead of 'apiBackendId'
    const apiMetadata = ApiMetadata.findOne({ apiBackendId: apiId });

    // Check apiMetadata is defined
    if (apiMetadata) {
      // Check service is defined
      if (apiMetadata.service) {
        const service = apiMetadata.service;
        // Format validSince if defined
        if (service.validSince) {
          service.validSince = formatDate(service.validSince);
        }
        // Format validUntil if defined
        if (service.validUntil) {
          service.validUntil = formatDate(service.validUntil);
        }
        // Attach formatted dates to metadata service object
        apiMetadata.service = service;
      }
    }

    return apiMetadata;
  },
});
