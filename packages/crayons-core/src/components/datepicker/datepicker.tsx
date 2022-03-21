import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
  h,
  Method,
  Watch,
} from '@stencil/core';
import {
  isValid,
  parse,
  parseISO,
  getYear,
  getMonth,
  getDate,
  startOfDay,
  getDaysInMonth,
  format,
  isMatch,
  formatISO,
  addDays,
  startOfWeek,
} from 'date-fns';
import {
  handleKeyDown,
  renderHiddenField,
  getFocusableChildren,
  hasSlot,
} from '../../utils';
import FieldControl from '../../function-components/field-control';

import { i18n, TranslationController } from '../../global/Translation';

const defaultweekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const monthDetails = [
  { value: 'Jan', text: 'January' },
  { value: 'Feb', text: 'February' },
  { value: 'Mar', text: 'March' },
  { value: 'Apr', text: 'April' },
  { value: 'May', text: 'May' },
  { value: 'Jun', text: 'June' },
  { value: 'Jul', text: 'July' },
  { value: 'Aug', text: 'August' },
  { value: 'Sep', text: 'September' },
  { value: 'Oct', text: 'October' },
  { value: 'Nov', text: 'November' },
  { value: 'Dec', text: 'December' },
];

const getMonthNames = (lang): any => {
  if (!lang) {
    return {
      longMonthNames: monthDetails.map((m) => m.text),
      shortMonthNames: monthDetails.map((m) => m.value),
    };
  }

  const shortMonthNames = [];
  const longMonthNames = [];
  for (let i = 0; i <= 11; i++) {
    shortMonthNames.push(lang.localize.month(i, { width: 'abbreviated' }));
    longMonthNames.push(lang.localize.month(i));
  }
  return {
    longMonthNames,
    shortMonthNames,
  };
};

const getWeekDays = (lang): any => {
  if (!lang) return defaultweekDays;
  return Array.from(Array(7)).map((_e, i) =>
    format(addDays(startOfWeek(new Date()), i), 'EEEEE', { locale: lang })
  );
};
@Component({ tag: 'fw-datepicker', styleUrl: 'datepicker.scss', shadow: true })
export class Datepicker {
  @State() showDatePicker: boolean;
  @State() year: any;
  @State() toYear: string;
  @State() monthDetails: any;
  @State() nextMonthDetails: any;
  @State() month: any;
  @State() todayTimestamp: any;
  @State() selectedDay: any;
  @State() startDate: any;
  @State() endDate: any;
  @State() startDateFormatted: any;
  @State() endDateFormatted: any;
  @State() dateHovered: any;
  @State() supportedYears: any;
  @State() toMonth: number;
  @State() firstFocusElement: HTMLElement = null;
  @State() lastFocusElement: HTMLElement = null;
  @State() langModule: any;
  @State() shortMonthNames: any;
  @State() longMonthNames: any;
  @State() weekDays: any;
  @State() hasHintTextSlot = false;
  @State() hasWarningTextSlot = false;
  @State() hasErrorTextSlot = false;

  @Element() host: HTMLElement;

  /**
   *   Type of date selection enabled for the calendar. If the value is range, a user can select a date range in the calendar.
   */
  @Prop() mode: 'single date' | 'range' = 'single date';
  /**
   *   Earliest date a user can select in the calendar, if mode is range. Must be a valid ISO date format if set.
   */
  @Prop() minDate: string;
  /**
   *   Latest date a user can select in the calendar, if mode is range. Must be a valid ISO date format if set.
   */
  @Prop() maxDate: string;
  /**
   *   Starting date of the date range that is preselected in the calendar, if mode is range. Must be a date later than the min-date value and valid ISO date format.
   */
  @Prop({ mutable: true }) fromDate: string;
  /**
   *   Ending date of the date range that is preselected in the calendar, if mode is range. Must be a date earlier than the max-date value and valid ISO date format.
   */
  @Prop({ mutable: true }) toDate: string;
  /**
   *   Format in which the date values selected in the calendar are populated in the input box. Defaults to the locale specific display format.
   */
  @Prop({ mutable: true }) displayFormat: string;
  /**
   *   Date that is preselected in the calendar, if mode is single date or undefined. If set this must be valid ISO date format.
   */
  @Prop({ mutable: true }) value: string;
  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';
  /**
   *   Text displayed in the input box before a user selects a date or date range.
   */
  @Prop({ mutable: true }) placeholder: string;

  @i18n({ keyName: 'datepicker.update' })
  @Prop({ mutable: true })
  updateText = '';
  @i18n({ keyName: 'datepicker.cancel' })
  @Prop({ mutable: true })
  cancelText = '';

  /**
   * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() required = false;
  /**
   * Theme based on which the input of the datepicker is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';

  /**
   * Minimum year that needs to be displayed in the year dropdown.
   */
  @Prop() minYear = 1970;

  /**
   * Maximum year that needs to be displayed in the year dropdown.
   */
  @Prop() maxYear = new Date().getFullYear();

  /**
   *   Locale for which datepicker needs to be shown. Defaults to browser's current locale.
   */
  @Prop({ mutable: true }) locale: string;

  /**
   * Make the input box as readonly. Default `false`
   */
  @Prop() readonly = false;

  /**
   * Hint text displayed below the text box.
   */
  @Prop() hintText = '';
  /**
   * Warning text displayed below the text box.
   */
  @Prop() warningText = '';
  /**
   * Error text displayed below the text box.
   */
  @Prop() errorText = '';
  /**
   * Label displayed on the interface, for the component.
   */
  @Prop() label = '';

  /**
   *   Triggered when the update button clicked
   */
  @Event() fwChange: EventEmitter;

  /**
   *   Triggered when the input box loses focus.
   */
  @Event() fwBlur: EventEmitter;

  private escapeHandler = null;
  private madeInert;
  private nativeInput;
  private isDisplayFormatSet = false;
  private isPlaceholderSet = false;

  private makeDatePickerInert() {
    if (!this.madeInert) {
      /**
       * Focus trapping inside datepicker.
       */
      const focusableElements = getFocusableChildren(this.host);
      if (focusableElements.length) {
        this.firstFocusElement = focusableElements[0];
        this.lastFocusElement = focusableElements[focusableElements.length - 1];
        this.lastFocusElement.addEventListener('keydown', (e: any) => {
          !e.shiftKey &&
            e.keyCode === 9 &&
            this.focusElement(this.firstFocusElement);
        });
        this.firstFocusElement.addEventListener('keydown', (e: any) => {
          e.shiftKey &&
            e.keyCode === 9 &&
            this.focusElement(this.lastFocusElement);
        });
      }
      if (this.firstFocusElement) {
        this.focusElement(this.firstFocusElement);
      }
      this.madeInert = true;
    }
    this.escapeHandler = ((e: any) => {
      if (e.keyCode === 27) {
        this.showDatePicker = false;
        this.host.shadowRoot.querySelector('fw-popover').hide();
      }
    }).bind(this);
    document.addEventListener('keydown', this.escapeHandler);
  }

  private emitEvent(event, eventDetails) {
    this.fwChange.emit({
      event: event,
      name: this.name,
      value: eventDetails,
    });
  }

  focusElement(element: HTMLElement) {
    element.focus();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.escapeHandler);
    this.host.shadowRoot?.removeEventListener(
      'slotchange',
      this.handleSlotChange
    );
  }

  private formatDate(value) {
    if (!value) return value;
    return this.displayFormat
      ? formatISO(
          parse(value, this.displayFormat, new Date(), {
            locale: this.langModule,
          })
        )
      : formatISO(new Date(value));
  }

  /**
   * Returns the date value in ISO format.
   */
  @Method()
  async getValue() {
    if (this.mode === 'range') {
      return {
        fromDate:
          (this.startDate &&
            format(
              parse(this.startDate, this.displayFormat, new Date(), {
                locale: this.langModule,
              }),
              this.displayFormat,
              {
                locale: this.langModule,
              }
            )) ||
          undefined,
        toDate:
          (this.endDate &&
            format(
              parse(this.endDate, this.displayFormat, new Date(), {
                locale: this.langModule,
              }),
              this.displayFormat,
              {
                locale: this.langModule,
              }
            )) ||
          undefined,
      };
    }
    return this.displayFormat
      ? (this.value &&
          format(
            parse(this.value, this.displayFormat, new Date(), {
              locale: this.langModule,
            }),
            this.displayFormat,
            {
              locale: this.langModule,
            }
          )) ||
          undefined
      : (this.value && formatISO(new Date(this.value))) || undefined;
  }

  /**
   * Sets focus on a specific `fw-datepicker`. Use this method instead of the global `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.setFocus?.();
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'Enter':
        this.host.shadowRoot.querySelector('fw-popover').show();
        break;
      case 'ArrowDown':
        event.preventDefault();
    }
    this.makeDatePickerInert();
  }

  @Listen('fwFocus')
  displayDatePicker() {
    this.showDatePicker = true;
  }

  @Listen('fwClick')
  handleButtonClick(e) {
    const isUpdateRange = e
      .composedPath()[0]
      .classList.value.includes('update-range-value');
    const isUpdateDate = e
      .composedPath()[0]
      .classList.value.includes('update-date-value');
    if (isUpdateRange) {
      if (this.startDate && this.endDate) {
        this.startDateFormatted = format(this.startDate, this.displayFormat, {
          locale: this.langModule,
        });

        this.endDateFormatted = format(this.endDate, this.displayFormat, {
          locale: this.langModule,
        });

        this.fromDate = this.startDateFormatted;
        this.toDate = this.endDateFormatted;

        this.value = this.startDateFormatted + ' to ' + this.endDateFormatted;
        this.emitEvent(e, {
          fromDate: this.formatDate(this.startDateFormatted),
          toDate: this.formatDate(this.endDateFormatted),
        });
      }
    } else if (isUpdateDate) {
      if (this.selectedDay) {
        this.value = format(
          new Date(this.year, this.month, this.selectedDay),
          this.displayFormat,
          {
            locale: this.langModule,
          }
        );
        this.emitEvent(e, this.formatDate(this.value));
      }
    }
    if (e.path[0].innerText === this.cancelText && !this.value) {
      if (this.mode === 'range') {
        this.startDate = this.endDate = undefined;
      } else {
        this.selectedDay = undefined;
      }
    }

    if (e.path[0].innerText === this.cancelText) {
      this.handlePopoverClose(e);
    }

    // Close datepicker only for fwClick event of Update and cancel buttons. Since this will
    // be triggered for month and year select dropdown as well the below check is added.
    if (
      e.path[0].innerText === this.updateText ||
      e.path[0].innerText === this.cancelText
    ) {
      this.showDatePicker = false;
      this.host.shadowRoot.querySelector('fw-popover').hide();
    }
  }

  /**
   * Listener to handle input changes
   */
  @Listen('fwInput')
  handleInputChanges(e) {
    e.stopImmediatePropagation();
    if (e.composedPath()[0].classList.value.includes('range-date-input')) {
      // Range input
      const val = e.path[0].value;

      if (!val) {
        this.value = undefined;
      }

      let [fromDate, toDate] =
        val?.split(TranslationController.t('datepicker.to')) || [];
      fromDate = fromDate?.trim();
      toDate = toDate?.trim();

      if (
        !isMatch(fromDate, this.displayFormat, {
          locale: this.langModule,
        }) ||
        !isMatch(toDate, this.displayFormat, {
          locale: this.langModule,
        })
      )
        return;

      const parsedFromDate = parse(fromDate, this.displayFormat, new Date(), {
        locale: this.langModule,
      });

      const parsedToDate = parse(toDate, this.displayFormat, new Date(), {
        locale: this.langModule,
      });

      const isValidFromDate = isValid(parsedFromDate);
      const isValidToDate = isValid(parsedToDate);

      if (!isValidFromDate || !isValidToDate) {
        // Invalid date format
        return;
      }

      const year = getYear(
        parse(fromDate, this.displayFormat, new Date(), {
          locale: this.langModule,
        })
      );

      if (year < this.minYear || year > this.maxYear) {
        return;
      }

      this.year = year;

      this.month = getMonth(
        parse(fromDate, this.displayFormat, new Date(), {
          locale: this.langModule,
        })
      );
      this.startDate = parse(fromDate, this.displayFormat, new Date(), {
        locale: this.langModule,
      }).valueOf();

      this.endDate = parse(toDate, this.displayFormat, new Date(), {
        locale: this.langModule,
      }).valueOf();

      this.toMonth = this.month === 11 ? 0 : this.month + 1;
      this.toYear =
        this.toMonth === 0 ? this.yearCalculation(this.year, 1) : this.year;
    } else {
      // Single Date input
      const val = e.path[0].value;

      if (!val) {
        this.value = undefined;
      }

      if (
        !isMatch(val, this.displayFormat, {
          locale: this.langModule,
        })
      )
        return;

      const parsedDate = parse(val, this.displayFormat, new Date(), {
        locale: this.langModule,
      });

      const isValidDate = isValid(parsedDate);

      if (!isValidDate) {
        // Invalid date format
        return;
      }

      const year = getYear(
        parse(val, this.displayFormat, new Date(), {
          locale: this.langModule,
        })
      );

      if (year < this.minYear || year > this.maxYear) {
        return;
      }

      this.year = year;

      this.month = getMonth(
        parse(val, this.displayFormat, new Date(), {
          locale: this.langModule,
        })
      );
      this.selectedDay = getDate(
        parse(val, this.displayFormat, new Date(), {
          locale: this.langModule,
        })
      );
      this.value = format(
        new Date(this.year, this.month, this.selectedDay),
        this.displayFormat,
        {
          locale: this.langModule,
        }
      );
    }
  }

  /**
   * Listener to handle Month Year dropdown.
   */
  @Listen('fwChange')
  handleMonthYearDropDownSelection(e) {
    if (e.path[0].tagName !== 'FW-DATEPICKER') {
      e.stopImmediatePropagation();
    }

    const newValue = e.detail && e.detail.value;

    if (!newValue) {
      return;
    }
    if (this.mode === 'range') {
      this.handleDateRangeDropDownUpdate(e, newValue);
      this.nextMonthDetails = this.getMonthDetails(this.toYear, this.toMonth);
    } else {
      this.handleSingleDateDropDownUpdate(e, newValue);
    }
    this.monthDetails = this.getMonthDetails(this.year, this.month);
  }

  handleSingleDateDropDownUpdate(e, newValue) {
    const isMonthUpdate = e
      .composedPath()[0]
      .classList.value.includes('single-month-selector');
    const isYearUpdate = e
      .composedPath()[0]
      .classList.value.includes('single-year-selector');

    if (isMonthUpdate) {
      this.month = this.shortMonthNames.indexOf(newValue);
    } else if (isYearUpdate) {
      this.year = newValue;
    }
  }

  handleDateRangeDropDownUpdate(e, newValue) {
    const isFromMonthUpdate = e
      .composedPath()[0]
      .classList.value.includes('from-month-selector');
    const isFromYearUpdate = e
      .composedPath()[0]
      .classList.value.includes('from-year-selector');
    const isToMonthUpdate = e
      .composedPath()[0]
      .classList.value.includes('to-month-selector');
    const isToYearUpdate = e
      .composedPath()[0]
      .classList.value.includes('to-year-selector');

    if (isFromMonthUpdate) {
      this.month = this.shortMonthNames.indexOf(newValue);
      if (this.month === 11) {
        this.toMonth = 0;
        this.toYear = this.yearCalculation(this.year, 1);
      } else {
        this.toMonth = this.month + 1;
      }
    } else if (isFromYearUpdate) {
      this.year = newValue;
      this.toYear =
        this.month === 11 ? this.yearCalculation(this.year, 1) : this.year;
    } else if (isToMonthUpdate) {
      this.toMonth = this.shortMonthNames.indexOf(newValue);
      if (this.toMonth === 0) {
        this.month = 11;
        this.year = this.yearCalculation(this.toYear, -1);
      } else {
        this.month = this.toMonth - 1;
      }
    } else if (isToYearUpdate) {
      this.toYear = newValue;
      this.year =
        this.toMonth === 0
          ? this.yearCalculation(this.toYear, -1)
          : this.toYear;
    }
  }

  yearCalculation(year, offset) {
    const resultYear = Number(year) + offset;
    return resultYear.toString();
  }

  getSupportedYears = () => {
    const yearsArr = [];
    if (+this.maxYear < +this.minYear) this.maxYear = +this.minYear;
    let year = +this.minYear;
    while (year <= +this.maxYear) {
      yearsArr.push(year.toString());
      year++;
    }
    return yearsArr;
  };

  @Watch('locale')
  async handleLocaleChange(newLocale) {
    this.langModule = await TranslationController.getDateLangModule(newLocale);
  }

  async componentWillLoad() {
    this.langModule = await TranslationController.getDateLangModule(
      this.locale
    );

    if (this.displayFormat) {
      this.isDisplayFormatSet = true;
    }
    if (this.placeholder) {
      this.isPlaceholderSet = true;
    }
    this.handleSlotChange();
    this.displayFormat =
      this.displayFormat ||
      this.langModule?.formatLong?.date({ width: 'short' });

    this.placeholder = this.placeholder || this.displayFormat;

    const onChange = TranslationController.onChange.bind(TranslationController);
    onChange('lang', async (locale) => {
      this.langModule = await TranslationController.getDateLangModule(locale);
      this.displayFormat = this.isDisplayFormatSet
        ? this.displayFormat
        : this.langModule?.formatLong?.date({ width: 'short' });

      this.placeholder = this.isPlaceholderSet
        ? this.placeholder
        : this.displayFormat;

      if (this.mode === 'range')
        this.placeholder = `${this.placeholder} ${TranslationController.t(
          'datepicker.to'
        )} ${this.placeholder}`;

      const monthNames = getMonthNames(this.langModule);
      this.shortMonthNames = monthNames.shortMonthNames;
      this.longMonthNames = monthNames.longMonthNames;
      this.weekDays = getWeekDays(this.langModule);
    });

    if (this.mode === 'range') {
      const today = new Date();
      if (
        (this.fromDate && !isValid(parseISO(this.fromDate))) ||
        (this.toDate && !isValid(parseISO(this.toDate)))
      ) {
        // Show current month and year if invalid date is provided
        this.year = getYear(today);
        this.month = getMonth(today);
      } else {
        const fromDate = new Date(this.fromDate);
        this.year = this.fromDate ? getYear(fromDate) : getYear(today);
        this.month = this.fromDate ? getMonth(fromDate) : getMonth(today);
      }
    } else {
      const today = new Date();
      if (this.value && !isValid(parseISO(this.value))) {
        // Show current date if invalid date is provided
        this.year = getYear(today);
        this.month = getMonth(today);
        this.selectedDay = getDate(today);
      } else {
        const date = new Date(this.value);
        this.year = this.value ? getYear(date) : getYear(today);
        this.month = this.value ? getMonth(date) : getMonth(today);
        this.selectedDay = this.value && getDate(date);
      }
    }
    this.toMonth = this.month === 11 ? 0 : this.month + 1;
    this.toYear =
      this.toMonth === 0 ? this.yearCalculation(this.year, 1) : this.year;
    this.monthDetails = this.getMonthDetails(this.year, this.month);
    this.todayTimestamp = startOfDay(new Date()).valueOf();

    const monthNames = getMonthNames(this.langModule);
    this.shortMonthNames = monthNames.shortMonthNames;
    this.longMonthNames = monthNames.longMonthNames;
    this.weekDays = getWeekDays(this.langModule);

    this.value = this.value
      ? format(new Date(this.value), this.displayFormat, {
          locale: this.langModule,
        })
      : this.value;
    this.setInitialValues();
  }

  setInitialValues() {
    this.nextMonthDetails =
      this.month === 11
        ? this.getMonthDetails(this.yearCalculation(this.year, 1), 0)
        : this.getMonthDetails(this.year, this.month + 1);
    if (this.mode === 'range')
      this.placeholder = `${this.placeholder} ${TranslationController.t(
        'datepicker.to'
      )} ${this.placeholder}`;

    this.supportedYears = this.getSupportedYears();
    this.startDate =
      this.fromDate !== undefined
        ? parse(this.fromDate, this.displayFormat, new Date(), {
            locale: this.langModule,
          }).valueOf()
        : undefined;
    this.endDate =
      this.toDate !== undefined
        ? parse(this.toDate, this.displayFormat, new Date(), {
            locale: this.langModule,
          }).valueOf()
        : undefined;
    if (this.mode === 'range' && this.startDate && this.endDate) {
      const formattedFromDate = format(
        new Date(this.startDate),
        this.displayFormat,
        {
          locale: this.langModule,
        }
      );
      const formattedToDate = format(
        new Date(this.endDate),
        this.displayFormat,
        {
          locale: this.langModule,
        }
      );
      this.value = `${formattedFromDate} to ${formattedToDate}`;
    }
  }

  @Watch('value')
  watchValueChanged(value) {
    if (!value) {
      this.startDate = undefined;
      this.endDate = undefined;
      this.selectedDay = undefined;
      this.value = undefined;
      const date = new Date();
      this.year = getYear(date);
      this.month = getMonth(date);
      this.monthDetails = this.getMonthDetails(this.year, this.month);
    } else {
      if (this.mode !== 'range') {
        const date = new Date();
        date.setMonth(this.month);
        date.setFullYear(this.year);
        date.setDate(this.selectedDay);
        this.value = format(date, this.displayFormat, {
          locale: this.langModule,
        });
      } else {
        const formattedFromDate = format(
          new Date(this.startDate),
          this.displayFormat,
          {
            locale: this.langModule,
          }
        );
        const formattedToDate = format(
          new Date(this.endDate),
          this.displayFormat,
          {
            locale: this.langModule,
          }
        );
        this.value = `${formattedFromDate} to ${formattedToDate}`;
      }
    }
  }

  getDayDetails = (args) => {
    const date = args.index - args.firstDay;
    const day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = Number(args.year);
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const prevMonthNumberOfDays =
      getDaysInMonth(new Date(prevYear, prevMonth)) || 0;
    const _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    const month = this._getValidDateInMonth(date, args);
    const timestamp = new Date(args.year, args.month, _date).valueOf();
    return { date: _date, day, month, timestamp };
  };

  private _getValidDateInMonth(date, args) {
    if (this.minDate !== undefined && this.maxDate !== undefined) {
      if (date < 0) {
        return -1;
      }

      const minDate = new Date(this.minDate);
      const maxDate = new Date(this.maxDate);
      const argDate = new Date(args.year, args.month, date + 1);

      const isValid =
        minDate.valueOf() <= argDate.valueOf() &&
        argDate.valueOf() <= maxDate.valueOf();
      return !isValid ? -1 : date >= args.numberOfDays ? 1 : 0;
    }
    return date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  }

  private getMonthDetails = (year, month) => {
    const firstDay = new Date(year, month).getDay();
    const numberOfDays = getDaysInMonth(new Date(year, month)) || 0;
    const monthArray = [];
    const rows = 6;
    let currentDay;
    let index = 0;
    const cols = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  };

  setMonth = (offset) => {
    let year = Number(this.year);
    let month = this.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    this.year = year.toString();
    this.month = month;
    this.toMonth = this.month === 11 ? 0 : this.month + 1;
    this.toYear =
      this.toMonth === 0 ? this.yearCalculation(this.year, 1) : this.year;
    this.monthDetails = this.getMonthDetails(year, month);
    this.nextMonthDetails =
      this.month === 11
        ? this.getMonthDetails(this.yearCalculation(this.year, 1), 0)
        : this.getMonthDetails(this.year, this.month + 1);
  };

  isCurrentDay = (day) => {
    return day.timestamp === this.todayTimestamp;
  };

  isSelectedDay = ({ date, timestamp }) => {
    if (this.mode !== 'range') {
      const parsedDate = parse(this.value, this.displayFormat, new Date(), {
        locale: this.langModule,
      });
      const isValidDate = isValid(parsedDate);
      return isValidDate
        ? date === this.selectedDay &&
            getMonth(parsedDate) === getMonth(timestamp) &&
            getYear(parsedDate) === getYear(timestamp)
        : date === this.selectedDay;
    }
    return timestamp === this.startDate || timestamp === this.endDate;
  };

  handleDateHover = (day): void => {
    if (this.startDate && !this.endDate) {
      if (this.startDate > day.timestamp) {
        this.endDate = this.startDate;
        this.startDate = undefined;
      }
      this.dateHovered = day.timestamp;
    } else if (!this.startDate && this.endDate) {
      if (this.endDate < day.timestamp) {
        this.startDate = this.endDate;
        this.endDate = undefined;
      }
      this.dateHovered = day.timestamp;
    }
  };

  handleKeyUp(e, day) {
    if (e.code === 'Enter') {
      if (
        e
          .composedPath()
          .find(
            (e) => e.classList && e.classList.value === 'mdp-range-container'
          )
      ) {
        // Range Container
        this.onDateClick(day);
        this.startDateFormatted = format(
          new Date(this.startDate),
          this.displayFormat,
          {
            locale: this.langModule,
          }
        );
        this.endDateFormatted = format(
          new Date(this.endDate),
          this.displayFormat,
          {
            locale: this.langModule,
          }
        );
        if (this.startDate && this.endDate) {
          this.value = this.startDateFormatted + ' to ' + this.endDateFormatted;
          this.emitEvent(e, {
            fromDate: this.formatDate(this.startDateFormatted),
            toDate: this.formatDate(this.endDateFormatted),
          });
          this.showDatePicker = false;
          this.host.shadowRoot.querySelector('fw-popover').hide();
        }
      } else {
        // Single Date Container
        this.onDateClick(day);
        this.value = format(
          new Date(this.year, this.month, this.selectedDay),
          this.displayFormat,
          {
            locale: this.langModule,
          }
        );
        this.emitEvent(e, this.formatDate(this.value));
        this.showDatePicker = false;
        this.host.shadowRoot.querySelector('fw-popover').hide();
      }
    }
  }

  isInRange = ({ timestamp }) => {
    const { endDate } = this;
    const { startDate } = this;

    return (
      startDate && endDate && timestamp >= startDate && timestamp <= endDate
    );
  };

  isHoverInRange({ timestamp }) {
    const { startDate, endDate, dateHovered } = this;
    const startDateCondtion =
      startDate &&
      dateHovered &&
      timestamp <= dateHovered &&
      timestamp >= startDate;
    const endDateCondition =
      endDate &&
      dateHovered &&
      timestamp >= dateHovered &&
      timestamp <= endDate;
    return startDateCondtion || endDateCondition;
  }

  onDateClick = ({ date, timestamp }) => {
    if (this.showSingleDatePicker()) {
      this.selectedDay = date;
    } else if (this.showDateRangePicker()) {
      this.handleRangeSelection(timestamp);
      this.dateHovered = '';
    }
  };

  // handle cancel and popover close
  handlePopoverClose = (e: any) => {
    if (e.target?.tagName === 'FW-SELECT') return;
    if (this.mode === 'range') {
      // handle resetting of startDate and endDate on clicking cancel
      if (this.value) {
        let [fromDateStr, toDateStr] =
          this.value?.split(TranslationController.t('datepicker.to')) || [];
        fromDateStr = fromDateStr?.trim();
        toDateStr = toDateStr?.trim();
        const startDate = getDate(new Date(this.startDate));
        const endDate = getDate(new Date(this.endDate));

        const fromDate = getDate(
          parse(fromDateStr, this.displayFormat, new Date(), {
            locale: this.langModule,
          })
        );
        const toDate = getDate(
          parse(toDateStr, this.displayFormat, new Date(), {
            locale: this.langModule,
          })
        );
        if (startDate !== fromDate) {
          this.startDate = parse(fromDateStr, this.displayFormat, new Date(), {
            locale: this.langModule,
          }).valueOf();
        }
        if (endDate !== toDate) {
          this.endDate = parse(toDateStr, this.displayFormat, new Date(), {
            locale: this.langModule,
          }).valueOf();
        }
      } else if (!this.startDate && !this.endDate) {
        this.startDate = this.endDate = undefined;
      }
    } else {
      // handle resetting of selectedDay on clicking cancel
      if (this.value) {
        const date = getDate(
          parse(this.value, this.displayFormat, new Date(), {
            locale: this.langModule,
          })
        );
        if (this.selectedDay !== date) {
          this.selectedDay = date;
        }
      } else this.selectedDay = undefined;
    }
  };

  private handleRangeSelection(timestamp) {
    if (this.startDate && this.endDate) {
      this.endDate = undefined;
      this.startDate = timestamp;
    } else if (this.startDate && !this.endDate) {
      if (timestamp > this.startDate) {
        this.endDate = timestamp;
      } else if (timestamp < this.startDate) {
        this.endDate = this.startDate;
        this.startDate = timestamp;
      }
    } else if (!this.startDate && this.endDate) {
      this.startDate = timestamp;
    } else if (!this.startDate && !this.endDate) {
      this.startDate = timestamp;
    }
  }

  getCellStyle(day) {
    let cellStyle = 'c-day-container';
    if (day.month !== 0) {
      cellStyle += ' disabled';
    }
    if (this.isCurrentDay(day)) {
      cellStyle += ' highlight';
    }
    if (this.isSelectedDay(day) || day.timestamp === this.dateHovered) {
      cellStyle += ' highlight-blue';
    }
    if (this.isInRange(day) || this.isHoverInRange(day)) {
      cellStyle += ' highlight-range';
    }
    if (day.timestamp === this.startDate) {
      cellStyle += ' start-day';
    }
    if (day.timestamp === this.endDate) {
      cellStyle += ' end-day';
    }
    if (
      this.startDate &&
      this.dateHovered < this.startDate &&
      day.timestamp === this.dateHovered
    ) {
      cellStyle += ' start-day';
    } else if (
      this.endDate &&
      this.dateHovered < this.endDate &&
      day.timestamp === this.dateHovered
    ) {
      cellStyle += ' start-day';
    } else if (
      this.startDate &&
      this.dateHovered > this.startDate &&
      day.timestamp === this.dateHovered
    ) {
      cellStyle += ' end-day';
    }

    return cellStyle;
  }

  private renderCalendar(monthDetails) {
    const days = monthDetails.map((day, index) => {
      return (
        <div class={this.getCellStyle(day)} key={index}>
          <div class='cdc-day'>
            <span
              role='button'
              tabindex={day.month === -1 || day.month === 1 ? '-1' : '0'}
              onClick={() => this.onDateClick(day)}
              onMouseOver={() => this.handleDateHover(day)}
              onFocus={() => this.handleDateHover(day)}
              onKeyDown={handleKeyDown(() => this.handleDateHover(day))}
              onKeyUp={(e) => this.handleKeyUp(e, day)}
            >
              {day.date}
            </span>
          </div>
        </div>
      );
    });
    return (
      <div class='c-container'>
        <div class='cc-head'>
          {this.weekDays.map((day, index) => (
            <div key={index} class='cch-name'>
              {day}
            </div>
          ))}
        </div>
        <div class='cc-body'>{days}</div>
      </div>
    );
  }
  private showSingleDatePicker() {
    return this.showDatePicker && this.mode !== 'range';
  }
  private showDateRangePicker() {
    return this.showDatePicker && this.mode === 'range';
  }

  private onBlur = async (e: Event) => {
    e.stopImmediatePropagation();
    if ((e as any)?.detail?.event?.relatedTarget?.tagName !== 'SPAN') {
      this.fwBlur.emit({
        event: e,
        name: this.name,
      });
    }
  };

  handleSlotChange() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
  }

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <FieldControl
        inputId={this.name}
        label={this.label}
        labelId={`${this.label}-${this.name}`}
        state={this.state}
        hintTextId={`hint-${this.name}`}
        hintText={this.hintText}
        hasHintTextSlot={this.hasHintTextSlot}
        errorTextId={`error-${this.name}`}
        errorText={this.errorText}
        hasErrorTextSlot={this.hasErrorTextSlot}
        warningTextId={`warning-${this.name}`}
        warningText={this.warningText}
        hasWarningTextSlot={this.hasWarningTextSlot}
        required={this.required}
      >
        <fw-popover
          same-width='false'
          distance='8'
          placement='bottom-start'
          fallbackPlacements={['top-start']}
          hide-on-tab='false'
          onFwHide={this.handlePopoverClose}
        >
          <div
            role='combobox'
            aria-controls='datepicker'
            aria-expanded={this.showDatePicker}
            tabindex='-1'
            onClick={() => (this.showDatePicker = true)}
            onKeyUp={() => (this.showDatePicker = true)}
            slot='popover-trigger'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <fw-input
              value={this.value}
              name={this.name}
              class={(this.mode === 'range' ? 'range-' : '') + 'date-input'}
              placeholder={this.placeholder}
              required={this.required}
              onFwBlur={this.onBlur}
              ref={(el) => (this.nativeInput = el)}
              state={this.state}
              readonly={this.readonly}
            >
              <div class='icon-calendar' slot='input-suffix'>
                <div
                  class='separator'
                  style={{
                    borderLeftColor:
                      this.state === 'error' ? '#d72d30' : '#ebeff3',
                  }}
                ></div>
                <span class='date-icon'>
                  <fw-icon
                    name='calendar'
                    style={{
                      '--fw-icon-color': this.state === 'error' && '#d72d30',
                    }}
                  ></fw-icon>
                </span>
              </div>
            </fw-input>
          </div>
          {this.showSingleDatePicker() ? (
            <div id='datepicker' class='datepicker' slot='popover-content'>
              <div class='mdp-container'>
                {/* Head section */}
                <div class='mdpc-head'>
                  <div class='mdpch-container'>
                    <span class='mdpchc-month'>
                      <fw-select
                        class='first single-month-selector'
                        readonly={true}
                        value={this.shortMonthNames[this.month]}
                        same-width='false'
                        variant='button'
                        options-placement='bottom-start'
                        options={this.longMonthNames.map((month, i) => ({
                          value: this.shortMonthNames[i],
                          key: i,
                          selected: month === this.longMonthNames[this.month],
                          text: month,
                        }))}
                        allowDeselect={false}
                      ></fw-select>
                    </span>

                    <span class='mdpchc-year'>
                      <fw-select
                        class='last single-year-selector'
                        readonly={true}
                        value={this.year}
                        same-width='false'
                        options-placement='bottom'
                        variant='button'
                        allow-deselect='false'
                      >
                        {this.supportedYears.map((year, i) => (
                          <fw-select-option
                            value={year}
                            key={i}
                            selected={+year === +this.year}
                          >
                            {year}
                          </fw-select-option>
                        ))}
                      </fw-select>
                    </span>
                  </div>
                  <div class='btns'>
                    <div class='mdpch-button'>
                      <div
                        role='button'
                        tabindex='0'
                        class='mdpchb-inner'
                        onClick={() => this.setMonth(-1)}
                        onKeyDown={handleKeyDown(() => this.setMonth(-1))}
                      >
                        <span class='mdpchbi-left-arrow'></span>
                      </div>
                    </div>
                    <div class='mdpch-button-right'>
                      <div
                        role='button'
                        tabindex='0'
                        class='mdpchb-inner'
                        onClick={() => this.setMonth(1)}
                        onKeyDown={handleKeyDown(() => this.setMonth(1))}
                      >
                        <span class='mdpchbi-right-arrow'></span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Body Section */}
                <div class='mdpc-body'>
                  {this.renderCalendar(this.monthDetails)}
                </div>
              </div>
              {/* Footer Section */}
              <div class='mdpc-footer'>
                <fw-button color='secondary' class='close-date-picker'>
                  {this.cancelText}
                </fw-button>
                <fw-button color='primary' class='update-date-value'>
                  {this.updateText}
                </fw-button>
              </div>
            </div>
          ) : (
            ''
          )}
          {this.showDateRangePicker() ? (
            <div id='datepicker' class='daterangepicker' slot='popover-content'>
              <div class='mdp-range-container'>
                {/* Head section */}
                <div class='mdpc-head'>
                  <div class='mdpch-container'>
                    <span class='mdpchc-month'>
                      <fw-select
                        class='first from-month-selector'
                        readonly={true}
                        value={this.shortMonthNames[this.month]}
                        same-width='false'
                        variant='button'
                        options-placement='bottom-start'
                        options={this.longMonthNames.map((month, i) => ({
                          value: this.shortMonthNames[i],
                          key: i,
                          selected: month === this.longMonthNames[this.month],
                          text: month,
                        }))}
                        allowDeselect={false}
                      ></fw-select>
                    </span>
                    <span class='mdpchc-year'>
                      <fw-select
                        class='last from-year-selector'
                        readonly={true}
                        value={this.year}
                        same-width='false'
                        options-placement='bottom'
                        variant='button'
                        allow-deselect='false'
                      >
                        {this.supportedYears.map((year, i) => (
                          <fw-select-option
                            value={year}
                            key={i}
                            selected={+year === +this.year}
                          >
                            {year}
                          </fw-select-option>
                        ))}
                      </fw-select>
                    </span>
                  </div>
                  <div class='mdpch-container-right'>
                    <span class='mdpchc-month'>
                      <fw-select
                        class='first to-month-selector'
                        readonly={true}
                        same-width='false'
                        variant='button'
                        value={this.shortMonthNames[this.toMonth]}
                        options-placement='bottom-start'
                        options={this.longMonthNames.map((month, i) => ({
                          value: this.shortMonthNames[i],
                          key: i,
                          selected: month === this.longMonthNames[this.toMonth],
                          text: month,
                        }))}
                        allowDeselect={false}
                      ></fw-select>
                    </span>
                    <span class='mdpchc-year'>
                      <fw-select
                        class='last to-year-selector'
                        readonly={true}
                        value={this.toYear}
                        same-width='false'
                        options-placement='bottom'
                        variant='button'
                        allow-deselect='false'
                      >
                        {this.supportedYears.map((year, i) => (
                          <fw-select-option
                            value={year}
                            key={i}
                            selected={+year === +this.toYear}
                          >
                            {year}
                          </fw-select-option>
                        ))}
                      </fw-select>
                    </span>
                  </div>
                  <div class='btns'>
                    <div class='mdpch-button'>
                      <div
                        role='button'
                        tabindex='0'
                        class='mdpchb-inner'
                        onClick={() => this.setMonth(-1)}
                        onKeyDown={handleKeyDown(() => this.setMonth(-1))}
                      >
                        <span class='mdpchbi-left-arrow'></span>
                      </div>
                    </div>
                    <div class='mdpch-button-right'>
                      <div
                        role='button'
                        tabindex='0'
                        class='mdpchb-inner'
                        onClick={() => this.setMonth(1)}
                        onKeyDown={handleKeyDown(() => this.setMonth(1))}
                      >
                        <span class='mdpchbi-right-arrow'></span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Body Section */}
                <div class='body-container'>
                  <div class='mdpc-body'>
                    {this.renderCalendar(this.monthDetails)}
                  </div>
                  <div class='mdpc-body mdpc-body-right'>
                    {this.renderCalendar(this.nextMonthDetails)}
                  </div>
                </div>
              </div>
              {/* Footer Section */}
              <div class='mdpc-range-footer'>
                <fw-button color='secondary' class='close-date-picker'>
                  {this.cancelText}
                </fw-button>
                <fw-button color='primary' class='update-range-value'>
                  {this.updateText}
                </fw-button>
              </div>
            </div>
          ) : (
            ''
          )}
        </fw-popover>
      </FieldControl>
    );
  }
}
