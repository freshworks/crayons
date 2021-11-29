import { Component, Prop, h, Watch, State, Host, Method } from '@stencil/core';
import { formatDistanceStrict } from 'date-fns';
import enLocaleObj from 'date-fns/locale/en-US';

@Component({
  tag: 'fw-relative-time',
  styleUrl: 'relative-time.scss',
  shadow: true,
})
export class RelativeTime {
  timerId;

  /**
   * The date-fns locale module to use when formatting the number.
   * You can import locale modules like below.
   * `import enLocaleObj from date-fns/locale/en-US`.
   * Default module is `en-US`
   */
  @Prop({ mutable: true }) localeModule: any;

  /**
   * The date from which, time is calculated from. Should either be a date object / valid `ISO 8601` date time string
   */
  @Prop()
  date: Date | string = new Date();

  /**
   * Keep the displayed value up to date as time passes.
   */
  @Prop()
  sync = false;

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
      }, 1000);
    }
  }
  /**
   * set Locale Module to use when formatting the number.
   * You can import the locale modules like below.
   * `import deLocaleObj from date-fns/locale/de`.
   * `setLocale(deLocaleObj)`
   * @param localeModule
   */
  @Method()
  async setLocaleModule(localeModule: any): Promise<void> {
    this.localeModule = localeModule;
  }

  componentWillLoad(): void {
    this.localeModule = enLocaleObj;
    this.syncTime();
  }

  disconnectedCallback(): void {
    clearInterval(this.timerId);
  }

  render(): JSX.Element {
    const date = new Date(this.date);
    if (isNaN(date.getMilliseconds())) {
      console.error(`${date}`);
      return;
    }
    const titleTime = new Intl.DateTimeFormat(
      this.localeModule?.code || 'en_US',
      {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        second: 'numeric',
      }
    ).format(date);

    let formattedTime = '';
    try {
      formattedTime = formatDistanceStrict(date, this.now, {
        locale: this.localeModule,
        addSuffix: true,
      });
    } catch (err) {
      console.error(`Error occurred in formatting date ${err}`);
    }

    return (
      <Host>
        <time dateTime={date.toISOString()} title={titleTime}>
          {formattedTime}
        </time>
      </Host>
    );
  }
}
