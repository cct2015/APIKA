/* eslint-env browser */

import { Mongo } from 'meteor/mongo';
import { TAPi18n } from 'meteor/tap:i18n';
import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';

import Branding from '/branding/collection';
import CoverPhoto from '/branding/cover_photo/collection';

Template.uploadCoverPhoto.onCreated(function () {
  const instance = this;

  // Subscribe to Branding collection
  instance.subscribe('branding');
  // Subscribe to Cover Photo collection
  instance.subscribe('coverPhoto');
});

Template.uploadCoverPhoto.helpers({
  uploadedCoverPhotoFile () {
    // Get cover photo ID
    const currentCoverPhotoFileId = this.branding.coverPhotoFileId;

    // Convert to Mongo ObjectID
    const objectId = new Mongo.Collection.ObjectID(currentCoverPhotoFileId);

    // Check if cover photo file is available
    return CoverPhoto.findOne(objectId);
  },
});

Template.uploadCoverPhoto.events({
  'click .delete-cover-photo': function () {
    // Show confirmation dialog to use
    // eslint-disable-next-line no-alert
    const confirmation = confirm(TAPi18n.__('uploadCoverPhoto_confirm_delete'));

    // Check if user clicked "OK"
    if (confirmation) {
      // Get cover photo file id from branding
      const coverPhotoFileId = this.branding.coverPhotoFileId;

      // Convert to Mongo ObjectID
      const objectId = new Mongo.Collection.ObjectID(coverPhotoFileId);

      // Remove the cover photo object
      CoverPhoto.remove(objectId);

      // Remove the cover photo file id field
      Branding.update(this.branding._id, { $unset: { coverPhotoFileId: '' } });

      // Get deletion success message translation
      const message = TAPi18n.__('uploadCoverPhoto_successfully_deleted');

      // Alert user of successful delete
      sAlert.success(message);
    }
  },
});
