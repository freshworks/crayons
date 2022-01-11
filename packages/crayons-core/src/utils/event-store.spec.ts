import EventStore from './event-store';

describe('Test Subscribe', () => {
  afterAll(() => {
    EventStore.reset();
  });
  it('should create new array for event in subscribers object if not present already', () => {
    EventStore.subscribe('Test Event', () => {
      console.log('Test Event callback triggered');
    });
    expect(Array.isArray(EventStore.subscribers['Test Event']));
  });
  it('should populate subscribers when subscribed', () => {
    EventStore.subscribe('Test Event', () => {
      console.log('Test Event callback triggered');
    });
    expect(Object.keys(EventStore.subscribers).length).toEqual(1);
  });
  it('should push callback to subscribers object when subscribed', () => {
    const callback = () => console.log('Sample callback');
    EventStore.subscribe('Test Event1', callback);
    expect(EventStore.subscribers['Test Event1']).toEqual([callback]);
  });
});

describe('Test Publish', () => {
  afterAll(() => {
    EventStore.reset();
  });
  it('should call callback subscribed for event', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    EventStore.subscribe('Test Event', () => {
      console.log('Test Event callback triggered');
    });
    EventStore.publish('Test Event', {
      data: 'Test data',
    });
    expect(console.log).toHaveBeenCalledWith('Test Event callback triggered');
    consoleSpy.mockRestore();
  });
  it('should not call any callback if no subscriber is present for the event', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    EventStore.publish('Test Event1', {
      data: 'Test data',
    });
    expect(console.log).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('Test unsubscribe', () => {
  afterAll(() => {
    EventStore.reset();
  });
  it('should remove entry from subscribers object if all events are unsubscribed', () => {
    const subscriber1 = EventStore.subscribe('Test Event', () => {
      console.log('Test Event callback triggered');
    });
    const subscriber2 = EventStore.subscribe('Test Event', () => {
      console.log('Test Event callback triggered');
    });
    subscriber1.unsubscribe();
    subscriber2.unsubscribe();
    expect(EventStore.subscribers['Test Event']).toBeUndefined();
  });
  it('should remove callback from subscribers event entry', () => {
    const subscriber1 = EventStore.subscribe('Test Event', () => {
      console.log('Test Event callback triggered');
    });
    const subscriber2 = EventStore.subscribe('Test Event', () => {
      console.log('Test Event callback triggered');
    });
    subscriber1.unsubscribe();
    expect(EventStore.subscribers['Test Event'].length).toEqual(1);
  });
});
