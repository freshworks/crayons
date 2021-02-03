import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
  h
} from '@stencil/core';
import moment from 'moment-mini';

import { renderHiddenField } from '../../utils/utils';

const weekDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthArr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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
  @Prop() placeholder: string;
  /**
   *   Triggered when the update button clicked
   */
  @Event() fwChange: EventEmitter;

  @Listen('fwFocus')
  displayDatePicker() {
    this.showDatePicker = true;
  }

  @Listen('fwClick')
  handleButtonClick(e) {
    const isUpdateRange = e.composedPath()[0].classList.value.includes('update-range-value');
    const isUpdateDate = e.composedPath()[0].classList.value.includes('update-date-value');
    if (isUpdateRange) {
      this.startDateFormatted = moment(this.startDate).format(this.dateFormat);
      this.endDateFormatted = moment(this.endDate).format(this.dateFormat);
      if (this.startDate && this.endDate) {
        this.value = this.startDateFormatted + ' To ' + this.endDateFormatted;
      }
      this.fromDate = this.startDateFormatted;
      this.toDate = this.endDateFormatted;
      this.fwChange.emit({ fromDate: this.startDateFormatted, toDate: this.endDateFormatted });
    } else if (isUpdateDate) {
      this.value = this.selectedDay ? moment(this.selectedDay).format(this.dateFormat) : '';
      this.fwChange.emit(this.value);
    }
    this.showDatePicker = false;
  }

  /* Listener to handle Month Year dropdown changes
  */
  @Listen('fwChange')
  handleMonthYearDropDownSelection(e) {
    if (e.path[0].tagName !== 'FW-DATEPICKER') {
      e.stopPropagation();
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
    const isMonthUpdate = e.composedPath()[0].classList.value.includes('single-month-selector');
    const isYearUpdate = e.composedPath()[0].classList.value.includes('single-year-selector');

    if (isMonthUpdate) {
      this.month = monthArr.indexOf(newValue);
    } else if (isYearUpdate) {
      this.year = newValue;
    }
  }

  handleDateRangeDropDownUpdate(e, newValue) {
    const isFromMonthUpdate = e.composedPath()[0].classList.value.includes('from-month-selector');
    const isFromYearUpdate = e.composedPath()[0].classList.value.includes('from-year-selector');
    const isToMonthUpdate = e.composedPath()[0].classList.value.includes('to-month-selector');
    const isToYearUpdate = e.composedPath()[0].classList.value.includes('to-year-selector');

    if (isFromMonthUpdate) {
      this.month = monthArr.indexOf(newValue);
      if (this.month === 11) {
        this.toMonth = 0;
        this.toYear = this.yearCalculation(this.year, 1);
      } else {
        this.toMonth = this.month + 1;
      }
    } else if (isFromYearUpdate) {
      this.year = newValue;
      this.toYear = this.month === 11 ? this.yearCalculation(this.year, 1) : this.year;
    } else if (isToMonthUpdate) {
      this.toMonth = monthArr.indexOf(newValue);
      if (this.toMonth === 0) {
        this.month = 11;
        this.year = this.yearCalculation(this.toYear, -1);
      } else {
        this.month = this.toMonth - 1;
      }
    } else if (isToYearUpdate) {
        this.toYear = newValue;
        this.year = this.toMonth === 0 ? this.yearCalculation(this.toYear, -1) : this.toYear;
    }
  }

  yearCalculation(year, offset) {
    const resultYear = Number(year) + offset;
    return resultYear.toString();
  }

  getSupportedYears = () => {
    const yearsArr = [];
    let year = 1970;
    while (year < 2050) {
      yearsArr.push(year.toString());
      year++;
    }
    return yearsArr;
  }

  componentWillLoad() {
    this.year = moment().year().toString();
    this.month = moment().month();
    this.toMonth = this.month === 11 ? 0 : this.month + 1;
    this.toYear = this.toMonth === 0 ? this.yearCalculation(this.year, 1) : this.year;
    this.monthDetails = this.getMonthDetails(this.year, this.month);
    this.todayTimestamp = moment().startOf('date').valueOf();
    this.setInitalValues();
  }

  setInitalValues() {
    this.nextMonthDetails = this.month === 11
      ? this.getMonthDetails(this.yearCalculation(this.year, 1), 0)
      : this.getMonthDetails(this.year, this.month + 1);
    this.placeholder = this.placeholder || (
      this.mode === 'range'
        ? 'Select Date Range'
        : 'Select Date');
    this.supportedYears = this.getSupportedYears();
    this.selectedDay = this.value !== undefined ? moment(this.value, this.dateFormat).valueOf() : undefined;
    this.startDate = this.fromDate !== undefined ? moment(this.fromDate, this.dateFormat).valueOf() : undefined;
    this.endDate = this.toDate !== undefined ? moment(this.toDate, this.dateFormat).valueOf() : undefined;

    if (this.mode === 'range' && this.startDate && this.endDate) {
      const formattedFromDate = moment(this.startDate).format(this.dateFormat);
      const formattedToDate = moment(this.endDate).format(this.dateFormat);
      this.value = `${formattedFromDate} To ${formattedToDate}`;
    }
  }

  getDayDetails = args => {
    const date = args.index - args.firstDay;
    const day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = Number(args.year);
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const prevMonthNumberOfDays = moment([prevYear, prevMonth]).daysInMonth() || 0;
    const _date = (
      date < 0
        ? prevMonthNumberOfDays + date
        : date % args.numberOfDays) + 1;
    const month = this._getValidDateInMonth(date, args);
    const timestamp = moment([args.year, args.month, _date]).valueOf();
    return { date: _date, day, month, timestamp };
  }
  private _getValidDateInMonth(date, args) {
    if (this.minDate !== undefined && this.maxDate !== undefined) {
      if (date < 0) {
        return -1;
      }
      const dateFormat = this.dateFormat || 'DD-MM-YYYY';
      const minDate = moment(this.minDate, dateFormat);
      const maxDate = moment(this.maxDate, dateFormat);
      const argDate = moment([args.year, args.month, date + 1]);

      const isValid = minDate.valueOf() <= argDate.valueOf() && argDate.valueOf() <= maxDate.valueOf();
      return !isValid
        ? -1
        : date >= args.numberOfDays
          ? 1
          : 0;
    }
    return date < 0
      ? -1
      : date >= args.numberOfDays
        ? 1
        : 0;
  }

  private getMonthDetails = (year, month) => {
    const firstDay = (new Date(year, month)).getDay();
    const numberOfDays = moment([year, month]).daysInMonth() || 0;
    const monthArray = [];
    const rows = 6;
    let currentDay;
    let index = 0;
    const cols = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({ index, numberOfDays, firstDay, year, month });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  }

  setMonth = offset => {
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
    this.toYear = this.toMonth === 0 ? this.yearCalculation(this.year, 1) : this.year;
    this.monthDetails = this.getMonthDetails(year, month);
    this.nextMonthDetails = this.month === 11
      ? this.getMonthDetails(this.yearCalculation(this.year, 1), 0)
      : this.getMonthDetails(this.year, this.month + 1);
  }

  isCurrentDay = day => {
    return day.timestamp === this.todayTimestamp;
  }

  isSelectedDay = ({ timestamp }) => {
    return timestamp === this.selectedDay || timestamp === this.startDate || timestamp === this.endDate;
  }

  handleDateHover(day) {
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
  }

  isInRange = ({ timestamp }) => {
    const { endDate } = this;
    const { startDate } = this;

    return startDate && endDate && ((timestamp >= startDate && timestamp <= endDate));
  }

  isHoverInRange({ timestamp }) {

    const { startDate, endDate, dateHovered } = this;
    const startDateCondtion = startDate && dateHovered && (timestamp <= dateHovered && timestamp >= startDate);
    const endDateCondition = endDate && dateHovered && (timestamp >= dateHovered && timestamp <= endDate);
    return startDateCondtion || endDateCondition;
  }

  onDateClick = ({ timestamp }) => {
    if (this.showSingleDatePicker()) {
      this.selectedDay = timestamp;
    } else if (this.showDateRangePicker()) {
      this.handleRangeSelection(timestamp);
      this.dateHovered = '';
    }
  }

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
    if (this.startDate && this.dateHovered < this.startDate && day.timestamp === this.dateHovered) {
      cellStyle += ' start-day';
    } else if (this.endDate && this.dateHovered < this.endDate && day.timestamp === this.dateHovered) {
      cellStyle += ' start-day';
    } else if (this.startDate && this.dateHovered > this.startDate && day.timestamp === this.dateHovered) {
      cellStyle += ' end-day';
    }

    return cellStyle;
  }

  private renderCalendar(monthDetails) {
    const days = monthDetails.map((day, index) => {
      return (<div class={this.getCellStyle(day)} key={index}>
        <div class="cdc-day">
          <span onClick={() => this.onDateClick(day)} onMouseOver={() => this.handleDateHover(day)}>
            {day.date}
          </span>
        </div>
      </div>);
    });
    return (<div class="c-container">
      <div class="cc-head">
        {weekDay.map((day, index) => <div key={index} class="cch-name">{day}</div>)}
      </div>
      <div class="cc-body">
        {days}
      </div>
    </div>);
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

    return (<div>
      <div onClick={() => this.showDatePicker = false} class={this.showDatePicker ? 'overlay-show' : 'overlay-hide'}></div>
      <fw-input value={this.value} class="date-input" placeholder={this.placeholder} readonly={true}></fw-input>
      {
        this.showSingleDatePicker()
          ? (<div class="datepicker">
            <div class="mdp-container">
              {/* Head section */}
              <div class="mdpc-head">
                <div class="mdpch-button">
                  <div class="mdpchb-inner" onClick={() => this.setMonth(-1)}>
                    <span class="mdpchbi-left-arrow"></span>
                  </div>
                </div>
                <div class="mdpch-container">
                  <span class="mdpchc-month">
                    <fw-select class="single-month-selector" readonly={true} value={monthArr[this.month]}>
                      {
                        monthArr.map((month, i) =>
                          <fw-select-option value={month} key={i} selected={month === monthArr[this.month]}>
                            {month}
                          </fw-select-option>
                        )
                      }

                    </fw-select>
                  </span>

                  <span class="mdpchc-year">
                    <fw-select class="single-year-selector" readonly={true} value={this.year}>
                      {
                        this.supportedYears.map((year, i) =>
                          <fw-select-option value={year} key={i} selected={year === this.year}>
                            {year}
                          </fw-select-option>
                        )
                      }
                    </fw-select>
                  </span>

                </div>
                <div class="mdpch-button-right">
                  <div class="mdpchb-inner" onClick={() => this.setMonth(1)}>
                    <span class="mdpchbi-right-arrow"></span>
                  </div>
                </div>
              </div>
              {/* Body Section */}
              <div class="mdpc-body">
                {this.renderCalendar(this.monthDetails)}
              </div>
            </div>
            {/* Footer Section */}
            <div class="mdpc-footer">
              <fw-button color="primary" class="update-date-value">
                Update
              </fw-button>
              <fw-button color="secondary" class="close-date-picker">
                Cancel</fw-button>
            </div>
          </div>)
          : ''
      }

      {
        this.showDateRangePicker()
          ? (<div class="daterangepicker">
            <div class="mdp-range-container">
              {/* Head section */}
              <div class="mdpc-head">
                <div class="mdpch-button">
                  <div class="mdpchb-inner" onClick={() => this.setMonth(-1)}>
                    <span class="mdpchbi-left-arrow"></span>
                  </div>
                </div>
                <div class="mdpch-container">
                  <span class="mdpchc-month">
                    <fw-select class="from-month-selector" readonly={true} value={monthArr[this.month]}>
                      {
                        monthArr.map((month, i) =>
                          <fw-select-option value={month} key={i} selected={month === monthArr[this.month]}>
                            {month}
                          </fw-select-option>
                        )
                      }</fw-select>
                  </span>
                  <span class="mdpchc-year">
                    <fw-select class="from-year-selector" readonly={true} value={this.year}>
                      {
                        this.supportedYears.map((year, i) =>
                          <fw-select-option value={year} key={i} selected={year === this.year}>
                            {year}
                          </fw-select-option>
                        )
                      }
                    </fw-select>
                  </span>
                </div>
                <div class="mdpch-button-right">
                  <div class="mdpchb-inner" onClick={() => this.setMonth(1)}>
                    <span class="mdpchbi-right-arrow"></span>
                  </div>
                </div>
                <div class="mdpch-container-right">
                  <span class="mdpchc-year">
                    <fw-select class="to-year-selector" readonly={true} value={this.toYear}>
                      {
                        this.supportedYears.map((year, i) =>
                          <fw-select-option value={year} key={i} selected={year === this.toYear}>
                            {year}
                          </fw-select-option>
                        )
                      }
                    </fw-select>
                  </span>
                  <span class="mdpchc-month">
                    <fw-select class="to-month-selector" readonly={true} value={monthArr[this.toMonth]}>
                      {
                        monthArr.map((month, i) =>
                          <fw-select-option value={month} key={i} selected={month === monthArr[this.toMonth]}>
                            {month}
                          </fw-select-option>)
                      }
                    </fw-select>
                  </span>
                </div>
              </div>
              {/* Body Section */}
              <div class="body-container">
                <div class="mdpc-body">
                  {this.renderCalendar(this.monthDetails)}
                </div>
                <div class="mdpc-body mdpc-body-right">
                  {this.renderCalendar(this.nextMonthDetails)}
                </div>
              </div>
            </div>
            {/* Footer Section */}
            <div class="mdpc-range-footer">
              <fw-button color="primary" class="update-range-value">
                Update
              </fw-button>
              <fw-button color="secondary" class="close-date-picker">
                Cancel</fw-button>
            </div>
          </div>)
          : ''
      }

    </div>);
  }
}
