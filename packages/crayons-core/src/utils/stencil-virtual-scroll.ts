/**
 * Usage:
 *
 * Tanstack virtual does not have an adapter for stencil framework.
 * This is an attempt to bridge the gap. We have made use of stencils store to identify changes to
 * virtual scroll instance states and update UI accordingly.
 *
 * Only one method is exposed from the adapter, createVirtualizer.
 * This method takes virtualizerOptions as a parameter. The required options are similar to virtualizer core as in below docs:
 * https://tanstack.com/virtual/v3/docs/api/virtualizer
 *
 *
 * EX:
 * const { virtualizerInstance, cleanup } = createVirtualizer({
 *  count: 1000, // Total items to virtualize
 *  getScrollElement: () => parentRef.current,  // function to return scroll container
 *  estimateSize: () => 35  // the actual size of items (or estimated size if you will be dynamically measuring items)
 * });
 *
 * In components lifecycle methods,
 * connectedCallback() {
 *  // waiting for render as options require ref. This will be available only after render.
 *  this.waitForNextRender().then(() => {
 *    // this.virtualizerInstance and this.cleanup are private properties to a component.
 *    ({virtualizer: this.virtualizerInstance, cleanup: this.cleanup} = createVirtualizer(options));
 *    // force rerender once for stencil to pick up changes from store. We can use 'this.tick = {};' where tick is a state to component, just for purpose of rerendering.
 *    // Stencil seems to pick up store updates only after rerender if store is dynamically created after a render.
 *  });
 * }
 * disconnectedCallback() {
 *  this.cleanup();
 * }
 *
 * For usage in render method, refer to below link:
 * https://tanstack.com/virtual/v3/docs/guide/introduction
 */

import {
  elementScroll,
  observeElementOffset,
  observeElementRect,
  PartialKeys,
  Virtualizer,
  VirtualizerOptions,
} from '@tanstack/virtual-core';
export * from '@tanstack/virtual-core';

import { createStore } from '@stencil/store';

function createVirtualizerBase<
  TScrollElement extends Element | Window,
  TItemElement extends Element
>(
  options: VirtualizerOptions<TScrollElement, TItemElement>
): {
  virtualizer: Virtualizer<TScrollElement, TItemElement>;
  cleanup: () => void;
} {
  const scrollVirtualizer = new Virtualizer(
    options as unknown as VirtualizerOptions<TScrollElement, TItemElement>
  );
  const cleanup = scrollVirtualizer._didMount();
  const virtualizerStore = createStore({
    totalSize: scrollVirtualizer.getTotalSize(),
    virtualItems: scrollVirtualizer.getVirtualItems(),
  });
  scrollVirtualizer._willUpdate();

  const handler = {
    get(
      target: Virtualizer<TScrollElement, TItemElement>,
      prop: keyof Virtualizer<TScrollElement, TItemElement>
    ) {
      switch (prop) {
        case 'getVirtualItems':
          return () => virtualizerStore.state.virtualItems;
        case 'getTotalSize':
          return () => virtualizerStore.state.totalSize;
        default:
          return Reflect.get(target, prop);
      }
    },
  };

  const storeCleanup = () => {
    cleanup();
    virtualizerStore.dispose();
  };

  const scrollVirtualizerProxy = new Proxy(scrollVirtualizer, handler);

  scrollVirtualizerProxy.setOptions({
    ...options,
    onChange(
      newVirtualizer: Virtualizer<TScrollElement, TItemElement>,
      sync: boolean
    ) {
      const virtualItems = newVirtualizer.getVirtualItems();
      console.log(
        'virtualizer',
        newVirtualizer,
        newVirtualizer.scrollRect?.height,
        virtualItems.length,
        virtualizerStore.state.virtualItems.length
      );
      virtualizerStore.set('virtualItems', virtualItems);
      virtualizerStore.set('totalSize', newVirtualizer.getTotalSize());
      if (newVirtualizer.scrollRect?.height) {
        // console.log(
        //   'this is on change',
        //   newVirtualizer.getVirtualItems(),
        //   newVirtualizer.getTotalSize()
        // );
        scrollVirtualizerProxy._willUpdate();

        // console.log(
        //   'measure',
        //   virtualItems.length,
        //   virtualizerStore.state.virtualItems.length
        // );
        // if (
        //   !newVirtualizer.scrollRect?.height &&
        //   virtualItems.length === 0 &&
        //   virtualizerStore.state.virtualItems.length !== 0
        // ) {
        //   console.log('this is next change');
        //   newVirtualizer.scrollToIndex(0);
        //   scrollVirtualizerProxy._didMount();
        //   storeCleanup();
        //   scrollVirtualizerProxy.measure();
        // }
        options.onChange?.(newVirtualizer, sync);
      }
    },
  });
  scrollVirtualizerProxy.measure();

  return {
    virtualizer: scrollVirtualizerProxy,
    cleanup: storeCleanup,
  };
}

export function createVirtualizer<
  TScrollElement extends Element,
  TItemElement extends Element
>(
  options: PartialKeys<
    VirtualizerOptions<TScrollElement, TItemElement>,
    'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
  >
): {
  virtualizer: Virtualizer<TScrollElement, TItemElement>;
  cleanup: () => void;
} {
  return createVirtualizerBase<TScrollElement, TItemElement>({
    observeElementRect: observeElementRect,
    observeElementOffset: observeElementOffset,
    scrollToFn: elementScroll,
    ...options,
  });
}
