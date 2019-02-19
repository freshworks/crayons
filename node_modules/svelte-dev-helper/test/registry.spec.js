/* global describe, it */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const Registry = require('../lib/registry').default;

chai.use(sinonChai);
const { expect } = chai;

describe('Registry', () => {

  const obj = { a: 'a' },
    inst = { id:'id2' };

  Registry.set('id1', {});
  Registry.set('id2',{ component:obj });
  Registry.registerInstance(inst);

  it('enforces item signature', function() {
    expect(Registry._items['id1'].rollback).to.be.null;
    expect(Registry._items['id1'].component).to.be.null;
    expect(Registry._items['id1'].instances).to.be.instanceOf(Array);

    expect(Registry._items['id2'].component).to.eq(obj);
  });

  it('can retrieve by id', function() {
    const item = Registry.get('id2');
    expect(item.component).to.eq(obj);
  });

  it('can register instance', function() {
    const item = Registry.get('id2');
    expect(item.instances[0]).to.eq(inst);
  });

  it('can deregister instance', function() {
    Registry.deRegisterInstance(inst);
    const item = Registry.get('id2');
    expect(item.instances.length).to.eq(0);
    expect(item.instances[0]).to.undefined;
  });
});