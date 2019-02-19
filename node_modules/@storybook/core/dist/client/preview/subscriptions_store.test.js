"use strict";

var _subscriptions_store = require("./subscriptions_store");

var mockSubscription = function mockSubscription() {
  var listening = false;
  var listener = jest.fn();
  return {
    listener: listener,
    subscribe: function subscribe() {
      listening = true;
      return function () {
        listening = false;
      };
    },
    trigger: function trigger(value) {
      if (listening) {
        listener(value);
      }
    }
  };
};

describe('preview.subscriptions_store', function () {
  describe('register', function () {
    it('should register a subscription', function () {
      var _mockSubscription = mockSubscription(),
          listener = _mockSubscription.listener,
          subscribe = _mockSubscription.subscribe,
          trigger = _mockSubscription.trigger;

      var store = (0, _subscriptions_store.createSubscriptionsStore)();
      trigger('foo');
      store.register(subscribe);
      trigger('bar');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith('bar');
    });
    it("shouldn't subscribe when subscription is already registered", function () {
      var subscribe = jest.fn();
      var store = (0, _subscriptions_store.createSubscriptionsStore)();
      store.register(subscribe);
      store.register(subscribe);
      expect(subscribe).toHaveBeenCalledTimes(1);
    });
  });
  describe('clearUnused', function () {
    it('should stop unused subscriptions', function () {
      var _mockSubscription2 = mockSubscription(),
          listener = _mockSubscription2.listener,
          subscribe = _mockSubscription2.subscribe,
          trigger = _mockSubscription2.trigger;

      var store = (0, _subscriptions_store.createSubscriptionsStore)();
      store.register(subscribe);
      store.markAllAsUnused();
      store.clearUnused();
      trigger();
      expect(listener).not.toHaveBeenCalled();
    });
    it("shouldn't stop used subscriptions", function () {
      var _mockSubscription3 = mockSubscription(),
          listener = _mockSubscription3.listener,
          subscribe = _mockSubscription3.subscribe,
          trigger = _mockSubscription3.trigger;

      var store = (0, _subscriptions_store.createSubscriptionsStore)();
      store.register(subscribe);
      store.markAllAsUnused();
      store.register(subscribe);
      store.clearUnused();
      trigger();
      expect(listener).toHaveBeenCalled();
    });
    it('should subscribe again after unsubscribing', function () {
      var _mockSubscription4 = mockSubscription(),
          listener = _mockSubscription4.listener,
          subscribe = _mockSubscription4.subscribe,
          trigger = _mockSubscription4.trigger;

      var store = (0, _subscriptions_store.createSubscriptionsStore)();
      store.register(subscribe);
      store.markAllAsUnused();
      store.clearUnused();
      trigger('foo');
      store.register(subscribe);
      trigger('bar');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith('bar');
    });
  });
});