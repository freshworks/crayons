class EventStore {
  subscribers: any;
  constructor() {
    this.subscribers = {};
  }
  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((subscriberCallback) =>
      subscriberCallback(data)
    );
  }
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return {
      unsubscribe: () => {
        this.subscribers[event] = this.subscribers[event].filter(
          (subscriberCallback) => subscriberCallback !== callback
        );
        this.subscribers[event].length === 0 && delete this.subscribers[event];
      },
    };
  }
}

export default new EventStore();
