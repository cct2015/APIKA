import { Meteor } from 'meteor/meteor';
import Apis from '/apis/collection';

Meteor.publish('allUsersUsernamesOnly', function () {
  return Meteor.users.find({}, { fields: { username: 1 } });
});

// TODO: determine whether this publication is used
// If it is used, refactor it to be a regular publication
Meteor.publishComposite('user', function () {
  return {
    find () {
      return Meteor.users.find({
        _id: this.userId,
      });
    },
  };
});

Meteor.publish('apiAuthorizedUsersPublicDetails', function (apiId) {
  // Get API document
  const api = Apis.findOne(apiId);

  // Return all authorized user documents
  return Meteor.users.find({_id: {$in: api.authorizedUserIds } },
    { fields: { username: 1, emails: 1, _id: 1 } }
  );
});
