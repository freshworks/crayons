import { Component, State, Listen, Prop, EventEmitter, h } from '@stencil/core';
import moment from 'moment-mini';

const weekDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

@Component({
  tag: 'fw-datepicker',
  styleUrl: 'datepicker.scss',
  shadow: true,
})

export class Datepicker {
  @State() showDatePicker: Boolean;
  @State() year: number;
  @State() monthDetails: any;
  @State() nextMonthDetails: any;
  @State() month: number;
  @State() todayTimestamp: any;
  @State() selectedDay: any;
  @State() minDateFormatted: any;
  @State() maxDateFormatted: any;

  @Prop() mode: string;
  @Prop() startDate: any;
  @Prop() endDate: any;
  @Prop() minDate: any;
  @Prop() maxDate: any;
  @Prop() dateFormat: string;
  @Prop() dateValue: any;
  @Prop() placeholder: string

  @Event() fwChange: EventEmitter;

  @Listen('fwFocus')
  private displayDatePicker() {
    this.showDatePicker = true;
  }

  @Listen('fwClick')
  private handleButtonClick(e) {
    let isUpdateRange = e.composedPath()[0].classList.value.includes('update-range-value');
    let isUpdateDate = e.composedPath()[0].classList.value.includes('update-date-value');
    if (isUpdateRange) {
      this.minDateFormatted = moment(this.minDate).format(this.dateFormat);
      this.maxDateFormatted = moment(this.maxDate).format(this.dateFormat);
      this.dateValue = this.minDateFormatted +' to ' + this.maxDateFormatted;
      this.fwChange.emit({
        fromDate: this.minDateFormatted,
        toDate: this.maxDateFormatted
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
    this.nextMonthDetails = this.month === 11 ? this.getMonthDetails(this.year+1, 0) : this.getMonthDetails(this.year, this.month + 1);
    this.todayTimestamp = moment().startOf('date').valueOf();
    this.dateFormat = this.dateFormat || 'DD-MM-YYYY'
    this.placeholder = this.mode === 'range' ? 'Select Date Range' : 'Select Date';
  }

  getMonthStr = (month) => {
    if (month > 11) {
      month = 0;
    }
    month = (month + 1).toString();
    return moment(month).format('MMMM');
  }

  getNextMonthYear = () => {
    return this.month === 11 ? this.year+1 : this.year;
  }

  getDayDetails = (args) => {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    let prevMonthNumberOfDays = moment([prevYear, prevMonth]).daysInMonth() || 0;
    let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    let timestamp = moment([args.year, args.month, _date]).valueOf();
    return {
      date: _date,
      day,
      month,
      timestamp
    }
  }

  private getMonthDetails = (year, month) => {
    let firstDay = (new Date(year, month)).getDay();
    let numberOfDays = moment([year, month]).daysInMonth() || 0;
    let monthArray = [];
    let rows = 6;
    let currentDay = null;
    let index = 0;
    let cols = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  }

  setMonth = (offset) => {
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
    this.nextMonthDetails = this.month === 11 ? this.getMonthDetails(this.year+1, 0) : this.getMonthDetails(this.year, this.month + 1);
  }

  isCurrentDay = (day) => {
    return day.timestamp === this.todayTimestamp;
  }

  isSelectedDay = ({ timestamp }) => {
    return timestamp === this.selectedDay || timestamp === this.minDate || timestamp === this.maxDate;
  }

  isInRange = ({ timestamp }) => {
    let { maxDate } = this;
    let { minDate } = this;
    const isMinOrMaxDate = (timestamp === minDate || timestamp === maxDate);

    return minDate && maxDate && ((timestamp > minDate && timestamp < maxDate) || isMinOrMaxDate);
  }

  onDateClick = ({ timestamp }) => {
    if (this.showSingleDatePicker()) {
      this.selectedDay = timestamp;
    } else if (this.showDateRangePicker()) {
      this.handleRangeSelection(timestamp);
    }
  }

  private handleRangeSelection(timestamp) {
    if(this.minDate && this.maxDate) {
      this.maxDate = null;
      this.minDate = timestamp
    } else if (this.minDate && !this.maxDate) {
      if (timestamp > this.minDate) {
        this.maxDate = timestamp
      } else if (timestamp < this.minDate) {
        this.maxDate = this.minDate;
        this.minDate = timestamp;
      }
    } else if (!this.minDate && !this.maxDate) {
      this.minDate = timestamp;
    }
  }
  CheckAvailDateRange() {
    // TODO:  Render only date between startDate and endDate
  }
  getCellStyle(day) {
    // TODO:  all highlight, Selected and hovering will be handled here
  }

  private renderCalendar(monthDetails) {
    let days = monthDetails.map((day, index) => {
      return (
        <div class={'c-day-container ' + (day.month !== 0 ? ' disabled' : '') + (this.isCurrentDay(day) ? ' highlight' : '') +
          (this.isSelectedDay(day) ? ' highlight-blue' : '') + (this.isInRange(day) ? ' highlight-range' : '') +
          (day.timestamp === this.minDate ? ' minday' : '') + (day.timestamp === this.maxDate ? ' maxday' : '')}
          key={index}>
          <div class='cdc-day'>
            <span onClick={() => this.onDateClick(day)}>
              {day.date}
            </span>
          </div>
        </div>
      )
    })
    return (
      <div class='c-container'>
        <div class='cc-head'>
          {weekDay.map((day, index) => <div key={index} class='cch-name'>{day}</div>)}
        </div>
        <div class='cc-body'>
          {days}
        </div>
      </div>
    )
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
          readonly=true>
        </fw-input>
        {this.showSingleDatePicker() ? (
          <div>
            <div class='mdp-container'>
              {/*Head section*/}
              <div class='mdpc-head'>
                <div class='mdpch-button'>
                  <div class='mdpchb-inner' onClick={() => this.setMonth(-1)}>
                    <span class='mdpchbi-left-arrow'></span>
                  </div>
                </div>
                <div class='mdpch-container'>
                  <span class='mdpchc-month'>{this.getMonthStr(this.month)}</span>
                  <span class='mdpchc-year'>{this.year}</span>
                </div>
                <div class='mdpch-button'>
                  <div class='mdpchb-inner' onClick={() => this.setMonth(1)}>
                    <span class='mdpchbi-right-arrow'></span>
                  </div>
                </div>
              </div>
              {/*Body Section*/}
              <div class='mdpc-body'>
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
          <div>
            <div class='mdp-range-container'>
              {/*Head section*/}
              <div class='mdpc-head'>
                <div class='mdpch-button'>
                  <div class='mdpchb-inner' onClick={() => this.setMonth(-1)}>
                    <span class='mdpchbi-left-arrow'></span>
                  </div>
                </div>
                <div class='mdpch-container'>
                  <span class='mdpchc-month'>{this.getMonthStr(this.month)}</span>
                  <span class='mdpchc-year'>{this.year}</span>
                </div>
                <div class='mdpch-button-right'>
                  <div class='mdpchb-inner' onClick={() => this.setMonth(1)}>
                    <span class='mdpchbi-right-arrow'></span>
                  </div>
                </div>
                <div class='mdpch-container-right'>
                  <span class='mdpchc-year'>{this.getNextMonthYear()}</span>
                  <span class='mdpchc-month'>{this.getMonthStr(this.month + 1)}</span>
                </div>
              </div>
              {/*Body Section*/}
              <div class="body-container">
                <div class='mdpc-body'>
                  {this.renderCalendar(this.monthDetails)}
                </div>
                <div class='mdpc-body mdpc-body-right'>
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
    )
  }
}
