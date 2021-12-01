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
  async syncTime(): Promise<void> {
    if (this.timerId) clearTimeout(this.timerId);
    if (this.sync) {
      this.timerId = setInterval(() => {
        this.now = new Date();
      }, 1000);
    }
  }

  componentWillLoad(): void {
    this.langModule = TranslationController.getDateLangModule();

    const onChange = TranslationController.onChange.bind(TranslationController);
    this.listener = onChange('dateLangModule', (newLang) => {
      this.langModule = newLang;
    });

    this.syncTime();
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
