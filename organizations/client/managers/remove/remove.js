import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Meteor } from 'meteor/meteor';

Template.organizationRemoveManagers.events({
  'click #confirm-remove': function (event, templateInstance) {
    // Get organization ID
    const organizationId = templateInstance.data.organization._id;

    // Get User ID
    const userId = templateInstance.data.user._id;

    // Remove user from organization managers
    Meteor.call('removeOrganizationManager', organizationId, userId);

    // Dismiss the modal dialogue
    Modal.hide('organizationRemoveManagers');
  },
});
