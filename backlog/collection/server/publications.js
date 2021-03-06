import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import ApiBacklogItems from '/backlog/collection';

Meteor.publish('apiBacklogItems', (apiBackendId) => {
  // Make sure apiBackendId is a String
  check(apiBackendId, String);

  // returning backlog items object for current apibackend
  return ApiBacklogItems.find({ apiBackendId });
});
