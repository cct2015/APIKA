// Meteor packages import
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.apisFilterIcon.events({
  'click #filter-icon': (event, templateInstance) => {
    // Show/hide filter options
    templateInstance.$('.filter-popup').toggleClass('filter-popup-visible');
  },
  'click [type=reset]': () => {
    // Delete query parameter
    FlowRouter.setQueryParams({ lifecycle: null });
  },
});
