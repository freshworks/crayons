/* global describe, it */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { spy } = require('sinon');

const { configure, getConfig, Registry, createProxy } = require('../index');
const Component = require('./fixtures/mockComponent').default;
const ErrorComponent = require('./fixtures/mockComponentWithError').default;
const ComponentWithStatic = require('./fixtures/mockComponentWithStaticStuff').default;

chai.use(sinonChai);
const { expect } = chai;

const noop = function() {};

describe('Config', function() {

  configure({ x: 'y' });

  it('allows configuration', function() {
    let config = getConfig();
    expect(config.noPreserveState).to.be.false;

    configure({ noPreserveState: true });
    config = getConfig();
    expect(config.noPreserveState).to.be.true;

    configure({ noPreserveState: true });
  });

});

describe('Proxy', function() {

  const id = 'fixtures\\mockComponent.html';
  const idStatic = 'fixtures\\mockComponentWithPreload.html';
  const allMethods = 'get,fire,observe,on,set,teardown,_recompute,_set,_bind,_mount,_unmount,destroy,_register,_rerender'.split(',');
  const straightProxiedMethods = allMethods.slice(0, 8);
  const proxiedMethods = allMethods.slice(0, 11);
  const customMethods = 'customMethod,anotherCustomMethod'.split(',');
  const allProps = 'refs,_fragment,_slotted,root,store'.split(',');

  const SpiedComponent = spy(Component),
    SpiedComponent2 = spy(Component),
    SpiedErrorComponent = spy(ErrorComponent),
    SpiedPreload = spy(ComponentWithStatic, 'preload'),
    SpiedBar = spy(ComponentWithStatic, 'bar');

  Registry.set(id, {
    rollback: null,
    component: SpiedComponent,
    instances: []
  });

  Registry.set(idStatic, {
    rollback: null,
    component: ComponentWithStatic,
    instances: []
  });

  const Wrapped = createProxy(id),
    wrappedComponent = new Wrapped({}),
    WrappedWithStatic = createProxy(idStatic);

  let methodSpies = {};
  proxiedMethods.forEach((method) => { methodSpies[method] = spy(wrappedComponent.proxyTarget, method); });

  const customMethodSpies = {};
  customMethods.forEach((method) => { customMethodSpies[method] = spy(wrappedComponent.proxyTarget, method); });

  it('should forward calls to static methods', function() {
    WrappedWithStatic.preload();
    WrappedWithStatic.bar();
    expect(SpiedPreload).to.be.calledOnce;
    expect(SpiedBar).to.be.calledOnce;
  });

  it('should forward static properties', function() {
    expect(WrappedWithStatic.foo).to.eq(42);
  });

  it('should contain the right component and instance in Registry', function() {
    const item = Registry.get(id);
    expect(item.component).to.eq(SpiedComponent);
    expect(item.instances[0]).to.eq(wrappedComponent);
  });

  it('Underlying component gets constructed when proxy is constructed', function() {
    expect(SpiedComponent).to.be.calledOnce;
    expect(wrappedComponent.proxyTarget).to.be.instanceOf(SpiedComponent);
  });

  it('wrapped component contains right props', function() {

    allProps.forEach((prop) => {
      expect(wrappedComponent[prop]).not.to.be.undefined;
      expect(wrappedComponent[prop]).to.eq(wrappedComponent.proxyTarget[prop]);
    });

    expect(wrappedComponent._debugName).to.eq('<MockComponent>');
    expect(wrappedComponent.id).to.eq(id);

  });

  it('wrapped component contains right methods', function() {

    allMethods.forEach((method) => {
      expect(typeof wrappedComponent[method]).to.eq('function');
    });

  });

  it('wrapped component forwards proxied method calls', function() {

    straightProxiedMethods.forEach((method) => {
      wrappedComponent[method]();
      expect(methodSpies[method]).to.be.calledOnce;
    });

  });

  it('handles custom methods', function() {

    customMethods.forEach((method) => {
      expect(typeof wrappedComponent[method]).to.eq('function');
    });

    customMethods.forEach((method) => {
      wrappedComponent[method]();
      expect(customMethodSpies[method]).to.be.calledOnce;
    });

  });

  it('wrapped component mounts properly', function() {
    expect(wrappedComponent.__mounted).to.be.false;

    // eslint-disable-next-line no-undef
    wrappedComponent._mount(document.body);
    expect(methodSpies._mount).to.be.calledOnce;

    expect(wrappedComponent.__mounted).to.be.true;
    expect(wrappedComponent.__insertionPoint.__component__).to.eq(wrappedComponent);
  });

  it('wrapped component can be re rendered', function() {

    //swap component in registry
    let item = Registry.get(id);
    item.component = SpiedComponent2;
    Registry.set(id, item);

    wrappedComponent._rerender();

    //re-spy the methods
    methodSpies = {};
    proxiedMethods.forEach((method) => { methodSpies[method] = spy(wrappedComponent.proxyTarget, method); });

    expect(SpiedComponent2).to.be.calledOnce;

    expect(wrappedComponent.proxyTarget).to.be.instanceOf(SpiedComponent2);

  });

  it('rolls back to previous good component on component error', function() {

    //swap component in registry
    let item = Registry.get(id);
    item.rollback = SpiedComponent2;
    item.component = SpiedErrorComponent;
    Registry.set(id, item);

    //shim console
    const _consolewarn = console.warn;
    const _consoleinfo = console.info;
    console.warn = noop;
    console.info = noop;

    wrappedComponent._rerender();
    //re-spy the methods
    methodSpies = {};
    proxiedMethods.forEach((method) => { methodSpies[method] = spy(wrappedComponent.proxyTarget, method); });

    //restore console
    console.warn = _consolewarn;
    console.info = _consoleinfo;

    expect(SpiedErrorComponent).to.be.calledOnce;
    expect(SpiedComponent2).to.be.calledTwice;
    expect(wrappedComponent.proxyTarget).to.be.instanceOf(SpiedComponent2);

  });

  it('rollback updates component in registry', function() {
    const item = Registry.get(id);
    expect(item.component).to.eq(SpiedComponent2);
  });

  it('removes itself from Registry and cleans up on destruction', function() {

    wrappedComponent._unmount();
    expect(methodSpies._unmount).to.be.calledOnce;

    expect(wrappedComponent.__mounted).to.be.false;

    wrappedComponent.destroy();

    expect(wrappedComponent.__insertionPoint.__component__).to.be.null;


    const item = Registry.get(id);
    expect(item.component).to.eq(SpiedComponent2);
    expect(item.instances[0]).to.be.undefined;
    expect(item.instances.length).to.eq(0);
  });

  it('rerenders components with computed properties (#6)', function() {


    const Component = require('./fixtures/mockComponentWithComputed').default;

    const id = 'computedComponent';

    Registry.set(id, {
      rollback: null,
      component: Component,
      instances: []
    });

    // eslint-disable-next-line no-undef
    const target = document.body;
    const WrappedComponent = createProxy(id);
    const wrappedComponent = new WrappedComponent({ target });
    // eslint-disable-next-line no-undef
    wrappedComponent._mount(target);

    configure({ noPreserveState: false });
    wrappedComponent._rerender();
    configure({ noPreserveState: true });
    wrappedComponent._rerender();

  });

});