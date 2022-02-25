import { Component, Prop, h, Watch, State } from '@stencil/core';
import { formatDistanceStrict } from 'date-fns';
import { TranslationController } from '../../global/Translation';

@Component({
  tag: 'fw-relative-time',
  shadow: true,
})
export class RelativeTime {
  timerId;
  listener;

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
   * The displayed value is synced with the current time in every `syncDelay` milliseconds.
   * Default value is `10000` milliseconds
   */
  @Prop()
  syncDelay = 10000;

  /**
   * keep track of current date
   */
  @State()
  now = new Date();

  /**
   * Locale module of date-fns
   */
  @State()
  langModule: any;

  /**
   * sync time with the current date if sync property is set to true
   */
  @Watch('sync')
  async setupSync(): Promise<void> {
    if (this.timerId) clearTimeout(this.timerId);
    if (this.sync) {
      this.timerId = setInterval(() => {
        this.now = new Date();
      }, this.syncDelay);
    }
  }

  async componentWillLoad(): Promise<void> {
    this.langModule = await TranslationController.getDateLangModule();

    const onChange = TranslationController.onChange.bind(TranslationController);
    this.listener = onChange('dateLangModule', (newLang) => {
      this.langModule = newLang;
    });

    if (this.sync) this.setupSync();
  }

  disconnectedCallback(): void {
    clearInterval(this.timerId);
    this.listener();
  }

  render(): JSX.Element {
    const date = new Date(this.date);
    if (isNaN(date.getMilliseconds())) {
      console.error(`${date}`);
      return;
    }
    const titleTime = new Intl.DateTimeFormat(
      this.langModule?.code || 'en-US',
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
        locale: this.langModule,
        addSuffix: true,
      });
    } catch (err) {
      console.error(`Error occurred in formatting date ${err}`);
    }

    return (
      <time dateTime={date.toISOString()} title={titleTime}>
        {formattedTime}
      </time>
    );
  }
}
