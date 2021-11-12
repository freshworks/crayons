import FwProgress from 'multi-nprogress';

export interface ProgressBarOptions {
  /**
   * Changes the minimum percentage used upon starting. Default is `0.08`
   */
  minimum?: number;
  /**
   * Adjust animation settings using easing (a CSS easing string). Default is `ease`
   */
  easing?: string;
  /**
   * Add speed (in ms). Default is `200`
   */
  speed?: number;
  /**
   * Turn on/off the automatic incrementing behavior by setting this to false. Default is `true`
   */
  trickle?: boolean;
  /**
   * Adjust how often to trickle/increment, in ms. Default is `200`
   */
  trickleSpeed?: number;
  /**
   * Specify a selector to change the parent container. Default is `body`
   */
  parent?: string;
  /**
   * Specify a background color for the progress bar. Default is `#29d`
   */
  color?: string;
  /**
   * Use Custom markup. To keep the progress bar working, keep an element with role='bar' in there
   */
  template?: string;
}

export interface NProgressType {
  settings: any;
  configure: any;
  start: any;
  done: any;
  status: any;
  set: any;
  isStarted: any;
  inc: any;
  trickle: any;
  remove: any;
  isRendered: any;
  render: any;
}

const DEFAULT_OPTIONS = {
  parent: 'body',
  minimum: 0.08,
  easing: 'ease',
  speed: 200,
  trickle: true,
  trickleSpeed: 200,
  template: '<div class="bar" role="bar"></div>',
};
export function getPropOptions(
  opts: ProgressBarOptions = {}
): ProgressBarOptions {
  return {
    parent: opts.parent ?? DEFAULT_OPTIONS.parent,
    minimum: opts.minimum ?? DEFAULT_OPTIONS.minimum,
    easing: opts.easing ?? DEFAULT_OPTIONS.easing,
    speed: opts.speed ?? DEFAULT_OPTIONS.speed,
    trickle: opts.trickle ?? DEFAULT_OPTIONS.trickle,
    trickleSpeed: opts.trickleSpeed ?? DEFAULT_OPTIONS.trickleSpeed,
    template: opts.template ?? DEFAULT_OPTIONS.template,
  };
}

export function createProgressContainer(
  options: ProgressBarOptions
): NProgressType {
  const customizedOptions = getPropOptions(options);
  const instance = FwProgress().configure(customizedOptions);

  if (!document.querySelector('#fw-progress-bar-style')) {
    const style = document.createElement('style');
    style.id = 'fw-progress-bar-style';
    style.innerHTML = `
            .nprogress [role="bar"] {
              background: #29d;
              position: fixed;
              z-index: 1031;
              top: 0;
              left: 0;
              width: 100%;
              height: 2px;
            }
            .nprogress-custom-parent {
              overflow: hidden;
              position: relative;
            }
            .nprogress-custom-parent .nprogress [role="bar"] {
              position: absolute;
            }
      `;
    document.head.appendChild(style);
  }

  return {
    ...instance,
  };
}
