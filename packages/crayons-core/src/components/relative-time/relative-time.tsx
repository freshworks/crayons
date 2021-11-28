import { Component, Prop, h, Watch, State } from '@stencil/core';
import { formatDistanceStrict } from 'date-fns';
import localeObj from 'date-fns/locale/en-US';

@Component({
  tag: 'fw-relative-time',
  styleUrl: 'relative-time.scss',
  shadow: true,
})
export class RelativeTime {
  timerId;

  /**
   * The locale to use when formatting the number.
   */
  @Prop({ mutable: true }) locale: string;

  /**
   * The date from which to calculate time from. Should either be a date object / valid ISO 8601 date time string
   */
  @Prop()
  date: Date | string = new Date();

  /**
   * Keep the displayed value up to date as time passes.
   */
  @Prop()
  sync = false;

  /**
   * to set the dynamically imported locale object
   */
  @State()
  localeObj = localeObj;

  /**
   * keep track of current date
   */
  @State()
  now = new Date();

  /**
   * sync time with the current date if sync property is set to true
   */
  @Watch('sync')
  async syncTime(): Promise<void> {
    if (this.timerId) clearTimeout(this.timerId);
    if (this.sync) {
      this.timerId = setInterval(() => {
        this.now = new Date();
      }, 1);
    }
  }

  /**
   * dynamically load locale object from date-fns cdn
   */
  @Watch('locale')
  async loadLocale(locale: string): Promise<void> {
    console.log('locale change detected', locale);
    this.localeObj = await (
      await import(`https://cdn.skypack.dev/date-fns/locale/${locale}/index.js`)
    ).default;
  }

  componentWillLoad(): void {
    this.syncTime();
  }

  disconnectedCallback(): void {
    clearInterval(this.timerId);
  }

  render(): JSX.Element {
    return (
      <div>
        <button onClick={() => (this.locale = 'de')}>Change locale </button>
        {formatDistanceStrict(new Date(this.date), this.now, {
          locale: this.localeObj,
          addSuffix: true,
        })}
      </div>
    );
  }
}
