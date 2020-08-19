export const cssVariableObserver = (el: Element) => {
  const config: MutationObserverInit = {
    subtree: false,
    childList: false,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['style'],
    characterData: false,
    characterDataOldValue: false,
  };

  // set from first subscribe call
  let rootStyleObserver!: MutationObserver;

  return {
    subscribe: (cb: MutationCallback) => {
      if (!rootStyleObserver) {
        rootStyleObserver = new MutationObserver(cb);
      }

      rootStyleObserver.observe(el, config)
    },
    unsubscribe: () => {
      rootStyleObserver.disconnect();
    }
  }
};
