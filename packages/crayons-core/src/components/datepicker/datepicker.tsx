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
} from '@stencil/core';
import moment from 'moment-mini';

import {
  handleKeyDown,
  renderHiddenField,
  getFocusableChildren,
} from '../../utils';

const weekDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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

@Component({ tag: 'fw-datepicker', styleUrl: 'datepicker.scss', shadow: true })
export class Datepicker {
  @State() showDatePicker: boolean;
  @State() year: string;
  @State() toYear: string;
  @State() monthDetails: any;
  @State() nextMonthDetails: any;
  @State() month: number;
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

  @Element() host: HTMLElement;

  /**
   *   Type of date selection enabled for the calendar. If the value is range, a user can select a date range in the calendar.
   */
  @Prop() mode: 'single date' | 'range' = 'single date';
  /**
   *   Earliest date a user can select in the calendar, if mode is range.
   */
  @Prop() minDate: string;
  /**
   *   Latest date a user can select in the calendar, if mode is range.
   */
  @Prop() maxDate: string;
  /**
   *   Starting date of the date range that is preselected in the calendar, if mode is range. Must be a date later than the min-date value.
   */
  @Prop({ mutable: true }) fromDate: string;
  /**
   *   Ending date of the date range that is preselected in the calendar, if mode is range. Must be a date earlier than the max-date value.
   */
  @Prop({ mutable: true }) toDate: string;
  /**
   *   Format in which the date values selected in the calendar are populated in the input box and saved when the form data is saved.
   */
  @Prop() dateFormat = 'DD-MM-YYYY';
  /**
   *   Date that is preselected in the calendar, if mode is single date or undefined.
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
  /**
   *   Triggered when the update button clicked
   */
  @Event() fwChange: EventEmitter;

  private shortMonthNames;
  private longMonthNames;
  private escapeHandler = null;
  private madeInert;

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
      }
    }).bind(this);
    document.addEventListener('keydown', this.escapeHandler);
  }

  focusElement(element: HTMLElement) {
    element.focus();
  }

  private formatDate(value) {
    return this.dateFormat
      ? moment(value, this.dateFormat).format()
      : moment(value).format();
  }

  @Method()
  async getValue() {
    if (this.mode === 'range') {
      return {
        fromDate: this.formatDate(this.startDateFormatted),
        toDate: this.formatDate(this.endDateFormatted),
      };
    }
    return this.dateFormat
      ? moment(this.value, this.dateFormat).format()
      : moment(this.value).format();
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
      this.startDateFormatted = moment(this.startDate).format(this.dateFormat);
      this.endDateFormatted = moment(this.endDate).format(this.dateFormat);
      if (this.startDate && this.endDate) {
        this.value = this.startDateFormatted + ' to ' + this.endDateFormatted;
      }
      this.fromDate = this.startDateFormatted;
      this.toDate = this.endDateFormatted;
      this.fwChange.emit({
        fromDate: this.formatDate(this.startDateFormatted),
        toDate: this.formatDate(this.endDateFormatted),
      });
    } else if (isUpdateDate) {
      this.value = moment([this.year, this.month, this.selectedDay]).format(
        this.dateFormat
      );
      this.fwChange.emit(this.formatDate(this.value));
    }
    // Close datepicker only for fwClick event of Update and cancel buttons. Since this will
    // be triggered for month and year select dropdown as well the below check is added.
    if (e.path[0].innerText === 'Update' || e.path[0].innerText === 'Cancel') {
      this.showDatePicker = false;
    }
  }

  /* Listener to handle Month Year dropdown and input changes
   */
  @Listen('fwChange')
  handleMonthYearDropDownSelection(e) {
    if (e.path[0].tagName !== 'FW-DATEPICKER') {
      e.stopPropagation();
    }

    if (e.path[0].tagName === 'FW-INPUT') {
      if (e.composedPath()[0].classList.value.includes('range-date-input')) {
        //TODO: Handle Range input
      } else {
        // Single Date input
        const val = e.path[0].value;
        if (!moment(val, this.dateFormat, true).isValid()) {
          // Invalid date format
          return;
        }
        this.year = `${moment(val, this.dateFormat).get('year')}`;
        this.month = moment(val, this.dateFormat).get('month');
        this.selectedDay = moment(val, this.dateFormat).get('date');
        this.value = moment([this.year, this.month, this.selectedDay]).format(
          this.dateFormat
        );
      }
    }

    //TODO: Replace this with e.detail && e.detail.value once bug in select is fixed
    const newValue =
      e.detail && Array.isArray(e.detail.value)
        ? e.detail.value[0]
        : e.detail.value;

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
    let year = new Date().getFullYear() - 10;
    const lastYear = year + 20;
    while (year < lastYear) {
      yearsArr.push(year.toString());
      year++;
    }
    return yearsArr;
  };

  componentWillLoad() {
    if (this.value && !moment(this.value, this.dateFormat).isValid()) {
      // Show current date if invalid date is provided
      this.year = moment().year().toString();
      this.month = moment().month();
      this.selectedDay = moment().startOf('date').get('date');
    } else {
      this.year = this.value
        ? `${moment(this.value, this.dateFormat).get('year')}`
        : moment().year().toString();
      this.month = this.value
        ? moment(this.value, this.dateFormat).get('month')
        : moment().month();
      this.selectedDay =
        this.value && moment(this.value, this.dateFormat).get('date');
    }
    this.toMonth = this.month === 11 ? 0 : this.month + 1;
    this.toYear =
      this.toMonth === 0 ? this.yearCalculation(this.year, 1) : this.year;
    this.monthDetails = this.getMonthDetails(this.year, this.month);
    this.todayTimestamp = moment().startOf('date').valueOf();
    this.shortMonthNames = monthDetails.map((month) => month.value);
    this.longMonthNames = monthDetails.map((month) => month.text);
    this.value = this.value
      ? moment(this.value).format(this.dateFormat)
      : this.value;
    this.setInitalValues();
  }

  setInitalValues() {
    this.nextMonthDetails =
      this.month === 11
        ? this.getMonthDetails(this.yearCalculation(this.year, 1), 0)
        : this.getMonthDetails(this.year, this.month + 1);
    this.placeholder =
      this.placeholder ||
      (this.mode === 'range'
        ? `${this.dateFormat}` && `${this.dateFormat} to ${this.dateFormat}`
        : this.dateFormat);
    this.supportedYears = this.getSupportedYears();
    this.startDate =
      this.fromDate !== undefined
        ? moment(this.fromDate, this.dateFormat).valueOf()
        : undefined;
    this.endDate =
      this.toDate !== undefined
        ? moment(this.toDate, this.dateFormat).valueOf()
        : undefined;
    if (this.mode === 'range' && this.startDate && this.endDate) {
      const formattedFromDate = moment(this.startDate).format(this.dateFormat);
      const formattedToDate = moment(this.endDate).format(this.dateFormat);
      this.value = `${formattedFromDate} to ${formattedToDate}`;
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
      moment([prevYear, prevMonth]).daysInMonth() || 0;
    const _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    const month = this._getValidDateInMonth(date, args);
    const timestamp = moment([args.year, args.month, _date]).valueOf();
    return { date: _date, day, month, timestamp };
  };

  private _getValidDateInMonth(date, args) {
    if (this.minDate !== undefined && this.maxDate !== undefined) {
      if (date < 0) {
        return -1;
      }
      const dateFormat = this.dateFormat || 'DD-MM-YYYY';
      const minDate = moment(this.minDate, dateFormat);
      const maxDate = moment(this.maxDate, dateFormat);
      const argDate = moment([args.year, args.month, date + 1]);

      const isValid =
        minDate.valueOf() <= argDate.valueOf() &&
        argDate.valueOf() <= maxDate.valueOf();
      return !isValid ? -1 : date >= args.numberOfDays ? 1 : 0;
    }
    return date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  }

  private getMonthDetails = (year, month) => {
    const firstDay = new Date(year, month).getDay();
    const numberOfDays = moment([year, month]).daysInMonth() || 0;
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
      return moment(this.value, this.dateFormat).isValid()
        ? date === this.selectedDay &&
            moment(this.value, this.dateFormat).get('month') ===
              moment(timestamp).get('month') &&
            moment(this.value, this.dateFormat).get('year') ===
              moment(timestamp).get('year')
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
        this.startDateFormatted = moment(this.startDate).format(
          this.dateFormat
        );
        this.endDateFormatted = moment(this.endDate).format(this.dateFormat);
        if (this.startDate && this.endDate) {
          this.value = this.startDateFormatted + ' to ' + this.endDateFormatted;
          this.fwChange.emit({
            fromDate: this.formatDate(this.startDateFormatted),
            toDate: this.formatDate(this.endDateFormatted),
          });
          this.showDatePicker = false;
        }
      } else {
        // Single Date Container
        this.onDateClick(day);
        this.value = moment([this.year, this.month, this.selectedDay]).format(
          this.dateFormat
        );
        this.fwChange.emit(this.formatDate(this.value));
        this.showDatePicker = false;
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
      this.value = moment([this.year, this.month, this.selectedDay]).format(
        this.dateFormat
      );
    } else if (this.showDateRangePicker()) {
      this.handleRangeSelection(timestamp);
      this.dateHovered = '';
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
          {weekDay.map((day, index) => (
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
  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <fw-popover
        same-width='false'
        distance='8'
        placement='bottom-start'
        fallbackPlacements={['top-start']}
      >
        <fw-input
          slot='popover-trigger'
          value={this.value}
          class={(this.mode === 'range' ? 'range-' : '') + 'date-input'}
          placeholder={this.placeholder}
          title={this.placeholder}
          iconRight='calendar'
        ></fw-input>
        {this.showSingleDatePicker() ? (
          <div class='datepicker' slot='popover-content'>
            <div class='mdp-container'>
              {/* Head section */}
              <div class='mdpc-head'>
                <div class='mdpch-container'>
                  <span class='mdpchc-month'>
                    <fw-select
                      class='single-month-selector'
                      readonly={true}
                      value={this.shortMonthNames[this.month]}
                      same-width='false'
                      variant='button'
                      options-placement='bottom-start'
                    >
                      {this.longMonthNames.map((month, i) => (
                        <fw-select-option
                          value={month.slice(0, 3)}
                          key={i}
                          selected={month === this.longMonthNames[this.month]}
                        >
                          {month}
                        </fw-select-option>
                      ))}
                    </fw-select>
                  </span>

                  <span class='mdpchc-year'>
                    <fw-select
                      class='single-year-selector'
                      readonly={true}
                      value={this.year}
                      same-width='false'
                      options-placement='bottom'
                      variant='button'
                    >
                      {this.supportedYears.map((year, i) => (
                        <fw-select-option
                          value={year}
                          key={i}
                          selected={year === this.year}
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
                Cancel
              </fw-button>
              <fw-button color='primary' class='update-date-value'>
                Update
              </fw-button>
            </div>
          </div>
        ) : (
          ''
        )}

        {this.showDateRangePicker() ? (
          <div class='daterangepicker' slot='popover-content'>
            <div class='mdp-range-container'>
              {/* Head section */}
              <div class='mdpc-head'>
                <div class='mdpch-container'>
                  <span class='mdpchc-month'>
                    <fw-select
                      class='from-month-selector'
                      readonly={true}
                      value={this.shortMonthNames[this.month]}
                      same-width='false'
                      options-placement='bottom-start'
                      variant='button'
                    >
                      {this.longMonthNames.map((month, i) => (
                        <fw-select-option
                          value={month.slice(0, 3)}
                          key={i}
                          selected={month === this.longMonthNames[this.month]}
                        >
                          {month}
                        </fw-select-option>
                      ))}
                    </fw-select>
                  </span>
                  <span class='mdpchc-year'>
                    <fw-select
                      class='from-year-selector'
                      readonly={true}
                      value={this.year}
                      same-width='false'
                      options-placement='bottom'
                      variant='button'
                    >
                      {this.supportedYears.map((year, i) => (
                        <fw-select-option
                          value={year}
                          key={i}
                          selected={year === this.year}
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
                      class='to-month-selector'
                      readonly={true}
                      value={this.shortMonthNames[this.toMonth]}
                      same-width='false'
                      options-placement='bottom-start'
                      variant='button'
                    >
                      {this.longMonthNames.map((month, i) => (
                        <fw-select-option
                          value={month.slice(0, 3)}
                          key={i}
                          selected={month === this.longMonthNames[this.toMonth]}
                        >
                          {month}
                        </fw-select-option>
                      ))}
                    </fw-select>
                  </span>
                  <span class='mdpchc-year'>
                    <fw-select
                      class='to-year-selector'
                      readonly={true}
                      value={this.toYear}
                      same-width='false'
                      options-placement='bottom'
                      variant='button'
                    >
                      {this.supportedYears.map((year, i) => (
                        <fw-select-option
                          value={year}
                          key={i}
                          selected={year === this.toYear}
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
                Cancel
              </fw-button>
              <fw-button color='primary' class='update-range-value'>
                Update
              </fw-button>
            </div>
          </div>
        ) : (
          ''
        )}
      </fw-popover>
    );
  }
}
