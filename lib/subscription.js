"use strict";

module.exports = Subscription;

function Subscription(client, topic, handlers) {
  this.client = client;
  this.cancelled = false;
  this.topic = topic;
  this.handlers = handlers;

  this.client.router.add(topic, this);
}

Subscription.prototype.cancel = function (cb) {
  if (this.cancelled) return;
  this.cancelled = true;
  this.client.router.remove(this.topic, this);
  this.client._unsubscribe(this.topic, cb);
};
