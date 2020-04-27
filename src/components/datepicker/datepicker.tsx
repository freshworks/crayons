import { Component, Event, EventEmitter, Listen, Prop, State, h } from '@stencil/core';
import moment from 'moment-mini';

const weekDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

@Component({
  tag: 'fw-datepicker',
  styleUrl: 'datepicker.scss',
  shadow: true,
})
export class Datepicker {
  @State() showDatePicker: boolean;
  @State() year: number;
  @State() monthDetails: any;
  @State() nextMonthDetails: any;
  @State() month: number;
  @State() todayTimestamp: any;
  @State() selectedDay: any;
  @State() minDateFormatted: any;
  @State() maxDateFormatted: any;
  @State() dateHovered: any;

  @Prop() mode: string;
  @Prop() startDate: any;
  @Prop() endDate: any;
  @Prop() minDate: any;
  @Prop() maxDate: any;
  @Prop() dateFormat: string;
  @Prop() dateValue: any;
  @Prop() placeholder: string;

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
      this.minDateFormatted = moment(this.minDate).format(this.dateFormat);
      this.maxDateFormatted = moment(this.maxDate).format(this.dateFormat);
      this.dateValue = this.minDateFormatted + ' to ' + this.maxDateFormatted;
      this.fwChange.emit({
        fromDate: this.minDateFormatted,
        toDate: this.maxDateFormatted,
      });
    } else if (isUpdateDate) {
      this.dateValue = moment(this.selectedDay).format(this.dateFormat);
      this.fwChange.emit(this.dateValue);
    }
    this.showDatePicker = false;
  }

  componentWillLoad() {
    this.year = moment().year();
    this.month = moment().month();
    this.monthDetails = this.getMonthDetails(this.year, this.month);
    this.nextMonthDetails = this.month === 11 ? this.getMonthDetails(this.year + 1, 0) : this.getMonthDetails(this.year, this.month + 1);
    this.todayTimestamp = moment().startOf('date').valueOf();
    this.dateFormat = this.dateFormat || 'DD-MM-YYYY';
    this.placeholder = this.mode === 'range' ? 'Select Date Range' : 'Select Date';
  }

  getMonthStr = month => {
    if (month > 11) {
      month = 0;
    }
    month = (month + 1).toString();
    return moment(month).format('MMMM');
  }

  getNextMonthYear = () => {
    return this.month === 11 ? this.year + 1 : this.year;
  }

  getDayDetails = args => {
    const date = args.index - args.firstDay;
    const day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const prevMonthNumberOfDays = moment([prevYear, prevMonth]).daysInMonth() || 0;
    const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    const month = this._getValidDateInMonth(date, args);
    const timestamp = moment([args.year, args.month, _date]).valueOf();
    return {
      date: _date,
      day,
      month,
      timestamp,
    };
  }
  private _getValidDateInMonth(date, args) {
    if (this.startDate && this.endDate) {
      if (date < 0) {
        return -1;
      }
      const fromDate = moment(this.startDate, this.dateFormat);
      const toDate = moment(this.endDate, this.dateFormat);
      const argDate = moment([args.year, args.month, date + 1]);

      const isValid = fromDate.valueOf() <= argDate.valueOf() && argDate.valueOf() <= toDate.valueOf();
      return !isValid ? -1 : date >= args.numberOfDays ? 1 : 0;
    }
    return date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
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
  }

  setMonth = offset => {
    let year = this.year;
    let month = this.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    this.year = year;
    this.month = month;
    this.monthDetails = this.getMonthDetails(year, month);
    this.nextMonthDetails = this.month === 11 ? this.getMonthDetails(this.year + 1, 0) : this.getMonthDetails(this.year, this.month + 1);
  }

  isCurrentDay = day => {
    return day.timestamp === this.todayTimestamp;
  }

  isSelectedDay = ({ timestamp }) => {
    return timestamp === this.selectedDay || timestamp === this.minDate || timestamp === this.maxDate;
  }

  handleDateHover(day) {
    if (this.minDate && !this.maxDate) {
      this.dateHovered = day.timestamp;
    }
  }

  isInRange = ({ timestamp }) => {
    const { maxDate } = this;
    const { minDate } = this;

    return minDate && maxDate && ((timestamp >= minDate && timestamp <= maxDate));
  }

  isHoverInRange({ timestamp }) {

    const { minDate } = this;
    const { dateHovered } = this;

    return minDate && dateHovered && ((timestamp <= dateHovered && timestamp >= minDate)
      || (timestamp >= dateHovered && timestamp <= minDate));
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
    if (this.minDate && this.maxDate) {
      this.maxDate = undefined;
      this.minDate = timestamp;
    } else if (this.minDate && !this.maxDate) {
      if (timestamp > this.minDate) {
        this.maxDate = timestamp;
      } else if (timestamp < this.minDate) {
        this.maxDate = this.minDate;
        this.minDate = timestamp;
      }
    } else if (!this.minDate && !this.maxDate) {
      this.minDate = timestamp;
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
    if (day.timestamp === this.minDate) {
      cellStyle += ' minday';
    }
    if (day.timestamp === this.maxDate) {
      cellStyle += ' maxday';
    }
    if (this.minDate && this.dateHovered < this.minDate && day.timestamp === this.dateHovered) {
      cellStyle += ' minday';
    } else if (this.minDate && this.dateHovered > this.minDate && day.timestamp === this.dateHovered) {
      cellStyle += ' maxday';
    }

    return cellStyle;
  }

  private renderCalendar(monthDetails) {
    const days = monthDetails.map((day, index) => {
      return (
        <div class={this.getCellStyle(day)}
          key={index}>
          <div class="cdc-day">
            <span onClick={() => this.onDateClick(day)} onMouseOver={() => this.handleDateHover(day)}>
              {day.date}
            </span>
          </div>
        </div>
      );
    });
    return (
      <div class="c-container">
        <div class="cc-head">
          {weekDay.map((day, index) => <div key={index} class="cch-name">{day}</div>)}
        </div>
        <div class="cc-body">
          {days}
        </div>
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
    return (
      <div class="MyDatePicker">
        <fw-input
          value={this.dateValue}
          class="dateinput"
          placeholder={this.placeholder}
          readonly={true}>
        </fw-input>
        {this.showSingleDatePicker() ? (
          <div class="datepicker">
            <div class="mdp-container">
              {/*Head section*/}
              <div class="mdpc-head">
                <div class="mdpch-button">
                  <div class="mdpchb-inner" onClick={() => this.setMonth(-1)}>
                    <span class="mdpchbi-left-arrow"></span>
                  </div>
                </div>
                <div class="mdpch-container">
                  <span class="mdpchc-month">{this.getMonthStr(this.month)}</span>
                  <span class="mdpchc-year">{this.year}</span>
                </div>
                <div class="mdpch-button">
                  <div class="mdpchb-inner" onClick={() => this.setMonth(1)}>
                    <span class="mdpchbi-right-arrow"></span>
                  </div>
                </div>
              </div>
              {/*Body Section*/}
              <div class="mdpc-body">
                {this.renderCalendar(this.monthDetails)}
              </div>
            </div>
            {/*Footer Section*/}
            <div class="mdpc-footer">
              <fw-button color="primary" class="update-date-value"> Update </fw-button>
              <fw-button color="secondary" class="close-date-picker"> Cancel</fw-button>
            </div>
          </div>
        ) : ''}

        {this.showDateRangePicker() ? (
          <div class="daterangepicker">
            <div class="mdp-range-container">
              {/*Head section*/}
              <div class="mdpc-head">
                <div class="mdpch-button">
                  <div class="mdpchb-inner" onClick={() => this.setMonth(-1)}>
                    <span class="mdpchbi-left-arrow"></span>
                  </div>
                </div>
                <div class="mdpch-container">
                  <span class="mdpchc-month">{this.getMonthStr(this.month)}</span>
                  <span class="mdpchc-year">{this.year}</span>
                </div>
                <div class="mdpch-button-right">
                  <div class="mdpchb-inner" onClick={() => this.setMonth(1)}>
                    <span class="mdpchbi-right-arrow"></span>
                  </div>
                </div>
                <div class="mdpch-container-right">
                  <span class="mdpchc-year">{this.getNextMonthYear()}</span>
                  <span class="mdpchc-month">{this.getMonthStr(this.month + 1)}</span>
                </div>
              </div>
              {/*Body Section*/}
              <div class="body-container">
                <div class="mdpc-body">
                  {this.renderCalendar(this.monthDetails)}
                </div>
                <div class="mdpc-body mdpc-body-right">
                  {this.renderCalendar(this.nextMonthDetails)}
                </div>
              </div>
            </div>
            {/*Footer Section*/}
            <div class="mdpc-range-footer">
              <fw-button color="primary" class="update-range-value"> Update </fw-button>
              <fw-button color="secondary" class="close-date-picker"> Cancel</fw-button>
            </div>
          </div>
        ) : ''}

      </div>
    );
  }
}
