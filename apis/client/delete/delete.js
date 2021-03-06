import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';

Template.deleteApiConfirmation.events({
  'click #modal-delete-api': function (event, templateInstance) {
    // Get API ID
    const apiId = templateInstance.data.api._id;

    // Route to API Catalog
    FlowRouter.go('apiCatalog');

    Meteor.call('removeApi', apiId, () => {
      // Dismiss the confirmation modal
      Modal.hide('deleteApiConfirmation');

      // Get success message translation
      const message = TAPi18n.__('deleteApiConfirmation_successMessage');

      // Alert the user of success
      sAlert.success(message + templateInstance.data.api.name);
    });
  },
});
