import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { TAPi18n } from 'meteor/tap:i18n';
import { ProxyBackends } from '/proxy_backends/collection';
import { Proxies } from '../../collection';

Template.removeProxy.onCreated(function () {
  const proxyId = Template.currentData().proxy._id;
  // Subscribe to proxy backends of currentProxy
  this.subscribe('proxyBackends', proxyId);
});

Template.removeProxy.helpers({
  connectedProxyBackends () {
    let connectedProxyBackends = 0;
    // Get proxyId from template data
    const proxyId = Template.currentData().proxy._id;

    // Check proxyId
    if (proxyId) {
      // Get count of connected proxy backends
      connectedProxyBackends = ProxyBackends.find({ proxyId }).count();
    }
    // Return count
    return connectedProxyBackends;
  },
});

Template.removeProxy.events({
  'click #confirm-remove-proxy': function () {
    const proxyId = Template.currentData().proxy._id;

    // Check proxyId
    if (proxyId) {
      Proxies.remove(proxyId);
    } else {
      // Show alert of failed removal
      const errorMessage = TAPi18n.__('removeProxy_errorMessage');
      sAlert.error(errorMessage);
    }

    Modal.hide('removeProxy');
  },
});
