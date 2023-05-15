import { r as registerInstance, f as createEvent, h, g as getElement } from './index-4996832f.js';
import { m as moment_min } from './moment.min-732e0e96.js';
import { h as handleKeyDown, r as renderHiddenField } from './index-268121b7.js';

const datepickerCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{position:relative}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mdp-container,.mdp-range-container{float:left;left:0;top:40px;width:300px;min-height:336px;background:#fff;overflow:hidden}.mdpc-footer,.mdpc-range-footer{float:left;left:0;top:344px;width:312px;padding:8px;background:#f3f5f7}.mdpc-footer fw-button,.mdpc-range-footer fw-button{float:right;margin-left:7px}.mdpc-range-footer{width:612px}.mdp-range-container{width:600px}.mdpc-head{height:53px}.mdpc-body{float:left;width:100%}.body-container{margin:0 10px}.body-container .mdpc-body{width:48%}.body-container .mdpc-body-right{float:right;border-left:1px solid #ebeff3;padding-left:10px}.mdpch-button,.mdpch-button-right{float:left;width:30px;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.mdpch-button-right{float:right}.mdpchb-inner:hover,.mdpchb-inner:focus{cursor:pointer;background:#ebeff3}.mdpchb-inner{float:left;height:20px;width:20px;border-radius:100%;line-height:35px;text-align:center;position:absolute;top:45%;left:50%;margin-left:-17px;margin-top:-11px}.mdpch-button-right .mdpchb-inner{left:75%}.mdpchbi-left-arrow,.mdpchbi-left-arrows,.mdpchbi-left-arrows::after,.mdpchbi-right-arrow,.mdpchbi-right-arrows,.mdpchbi-right-arrows::after{display:block;float:left;width:6px;height:6px;border-left:2px solid #92a2b1;border-bottom:2px solid #92a2b1;position:absolute}.mdpchbi-left-arrow,.mdpchbi-left-arrows,.mdpchbi-right-arrow,.mdpchbi-right-arrows{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:50%;top:50%;margin-left:-2px;margin-top:-4px}.mdpchbi-right-arrow,.mdpchbi-right-arrows{-webkit-transform:rotate(225deg);transform:rotate(225deg);margin-left:-4px}.mdpchbi-left-arrows::after,.mdpchbi-right-arrows::after{content:\"\";left:3px;top:-5px}.mdpchbi-left-arrows{margin-left:-5px}.mdpchbi-right-arrows{margin-left:-2px}.mdpch-container,.mdpch-container-right{float:left;width:200px;height:100%}.mdpch-container-right{float:right}.mdpch-container-right .mdpchc-month,.mdpch-container-right .mdpchc-year{float:right}.mdpchc-year{float:left;height:30px;font-size:16px;color:#475867;text-align:center;width:90px}.mdpchc-month{float:left;font-size:16px;color:#475867;text-align:center;margin-right:10px;width:90px}.mdpchc-month fw-select .input-container-inner input{width:98%}.c-container,.c-day-container,.cc-body,.cc-head,.cch-name,.cdc-day,.cdc-day span{position:relative;display:block;float:left;-webkit-box-sizing:border-box;box-sizing:border-box}.c-container{width:100%;height:100%}.cc-head{height:30px;width:100%}.cch-name{width:14.285%;height:30px;line-height:30px;font-weight:700;color:#475867;font-size:13px;text-align:center}.cc-body{height:210px;width:100%}.c-day-container{width:14.285%;height:11.185%;margin-top:10px}.cdc-day{width:100%;height:100%;font-size:12px;font-weight:300;color:#475867;text-align:center}.cdc-day span:hover,.cdc-day span:focus{cursor:pointer;background:#ebeff3}.cdc-day span{width:24px;height:22px;font-size:13px;margin-top:-11px;margin-left:-13px;left:50%;top:50%;font-weight:400;border-radius:10%;line-height:20px;color:#12344d}.c-day-container.disabled{pointer-events:none}.date-input{width:210px}.c-day-container.disabled .cdc-day span{color:#cfd7df;background:#fff !important}.c-day-container.highlight:not(.disabled) .cdc-day span{border:1px solid #cfd7df}.c-day-container.highlight-blue:not(.disabled) .cdc-day span{background:#2c5cc5;color:#f3f5f7}.c-day-container.start-day .cdc-day{margin-left:10px}.c-day-container.start-day .cdc-day span{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.c-day-container.end-day .cdc-day{margin-left:-10px}.c-day-container.end-day .cdc-day span{-webkit-transform:translateX(10px);transform:translateX(10px)}.c-day-container.highlight-range:not(.disabled) .cdc-day{background:#e4f2fd}";

const weekDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthArr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
let Datepicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    /**
     *   Type of date selection enabled for the calendar. If the value is range, a user can select a date range in the calendar.
     */
    this.mode = 'single date';
    /**
     *   Format in which the date values selected in the calendar are populated in the input box and saved when the form data is saved.
     */
    this.dateFormat = 'DD-MM-YYYY';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    this.getSupportedYears = () => {
      const yearsArr = [];
      let year = 1970;
      while (year < 2050) {
        yearsArr.push(year.toString());
        year++;
      }
      return yearsArr;
    };
    this.getDayDetails = (args) => {
      const date = args.index - args.firstDay;
      const day = args.index % 7;
      let prevMonth = args.month - 1;
      let prevYear = Number(args.year);
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      const prevMonthNumberOfDays = moment_min([prevYear, prevMonth]).daysInMonth() || 0;
      const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
      const month = this._getValidDateInMonth(date, args);
      const timestamp = moment_min([args.year, args.month, _date]).valueOf();
      return { date: _date, day, month, timestamp };
    };
    this.getMonthDetails = (year, month) => {
      const firstDay = new Date(year, month).getDay();
      const numberOfDays = moment_min([year, month]).daysInMonth() || 0;
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
    this.setMonth = (offset) => {
      let year = Number(this.year);
      let month = this.month + offset;
      if (month === -1) {
        month = 11;
        year--;
      }
      else if (month === 12) {
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
    this.isCurrentDay = (day) => {
      return day.timestamp === this.todayTimestamp;
    };
    this.isSelectedDay = ({ timestamp }) => {
      return (timestamp === this.selectedDay ||
        timestamp === this.startDate ||
        timestamp === this.endDate);
    };
    this.handleDateHover = (day) => {
      if (this.startDate && !this.endDate) {
        if (this.startDate > day.timestamp) {
          this.endDate = this.startDate;
          this.startDate = undefined;
        }
        this.dateHovered = day.timestamp;
      }
      else if (!this.startDate && this.endDate) {
        if (this.endDate < day.timestamp) {
          this.startDate = this.endDate;
          this.endDate = undefined;
        }
        this.dateHovered = day.timestamp;
      }
    };
    this.isInRange = ({ timestamp }) => {
      const { endDate } = this;
      const { startDate } = this;
      return (startDate && endDate && timestamp >= startDate && timestamp <= endDate);
    };
    this.onDateClick = ({ timestamp }) => {
      if (this.showSingleDatePicker()) {
        this.selectedDay = timestamp;
      }
      else if (this.showDateRangePicker()) {
        this.handleRangeSelection(timestamp);
        this.dateHovered = '';
      }
    };
  }
  displayDatePicker() {
    this.showDatePicker = true;
  }
  handleButtonClick(e) {
    const isUpdateRange = e
      .composedPath()[0]
      .classList.value.includes('update-range-value');
    const isUpdateDate = e
      .composedPath()[0]
      .classList.value.includes('update-date-value');
    if (isUpdateRange) {
      this.startDateFormatted = moment_min(this.startDate).format(this.dateFormat);
      this.endDateFormatted = moment_min(this.endDate).format(this.dateFormat);
      if (this.startDate && this.endDate) {
        this.value = this.startDateFormatted + ' To ' + this.endDateFormatted;
      }
      this.fromDate = this.startDateFormatted;
      this.toDate = this.endDateFormatted;
      this.fwChange.emit({
        fromDate: this.startDateFormatted,
        toDate: this.endDateFormatted,
      });
    }
    else if (isUpdateDate) {
      this.value = this.selectedDay
        ? moment_min(this.selectedDay).format(this.dateFormat)
        : '';
      this.fwChange.emit(this.value);
    }
    this.showDatePicker = false;
  }
  /* Listener to handle Month Year dropdown changes
   */
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
    }
    else {
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
      this.month = monthArr.indexOf(newValue);
    }
    else if (isYearUpdate) {
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
      this.month = monthArr.indexOf(newValue);
      if (this.month === 11) {
        this.toMonth = 0;
        this.toYear = this.yearCalculation(this.year, 1);
      }
      else {
        this.toMonth = this.month + 1;
      }
    }
    else if (isFromYearUpdate) {
      this.year = newValue;
      this.toYear =
        this.month === 11 ? this.yearCalculation(this.year, 1) : this.year;
    }
    else if (isToMonthUpdate) {
      this.toMonth = monthArr.indexOf(newValue);
      if (this.toMonth === 0) {
        this.month = 11;
        this.year = this.yearCalculation(this.toYear, -1);
      }
      else {
        this.month = this.toMonth - 1;
      }
    }
    else if (isToYearUpdate) {
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
  componentWillLoad() {
    this.year = moment_min().year().toString();
    this.month = moment_min().month();
    this.toMonth = this.month === 11 ? 0 : this.month + 1;
    this.toYear =
      this.toMonth === 0 ? this.yearCalculation(this.year, 1) : this.year;
    this.monthDetails = this.getMonthDetails(this.year, this.month);
    this.todayTimestamp = moment_min().startOf('date').valueOf();
    this.setInitalValues();
  }
  setInitalValues() {
    this.nextMonthDetails =
      this.month === 11
        ? this.getMonthDetails(this.yearCalculation(this.year, 1), 0)
        : this.getMonthDetails(this.year, this.month + 1);
    this.placeholder =
      this.placeholder ||
        (this.mode === 'range' ? 'Select Date Range' : 'Select Date');
    this.supportedYears = this.getSupportedYears();
    this.selectedDay =
      this.value !== undefined
        ? moment_min(this.value, this.dateFormat).valueOf()
        : undefined;
    this.startDate =
      this.fromDate !== undefined
        ? moment_min(this.fromDate, this.dateFormat).valueOf()
        : undefined;
    this.endDate =
      this.toDate !== undefined
        ? moment_min(this.toDate, this.dateFormat).valueOf()
        : undefined;
    if (this.mode === 'range' && this.startDate && this.endDate) {
      const formattedFromDate = moment_min(this.startDate).format(this.dateFormat);
      const formattedToDate = moment_min(this.endDate).format(this.dateFormat);
      this.value = `${formattedFromDate} To ${formattedToDate}`;
    }
  }
  _getValidDateInMonth(date, args) {
    if (this.minDate !== undefined && this.maxDate !== undefined) {
      if (date < 0) {
        return -1;
      }
      const dateFormat = this.dateFormat || 'DD-MM-YYYY';
      const minDate = moment_min(this.minDate, dateFormat);
      const maxDate = moment_min(this.maxDate, dateFormat);
      const argDate = moment_min([args.year, args.month, date + 1]);
      const isValid = minDate.valueOf() <= argDate.valueOf() &&
        argDate.valueOf() <= maxDate.valueOf();
      return !isValid ? -1 : date >= args.numberOfDays ? 1 : 0;
    }
    return date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  }
  isHoverInRange({ timestamp }) {
    const { startDate, endDate, dateHovered } = this;
    const startDateCondtion = startDate &&
      dateHovered &&
      timestamp <= dateHovered &&
      timestamp >= startDate;
    const endDateCondition = endDate &&
      dateHovered &&
      timestamp >= dateHovered &&
      timestamp <= endDate;
    return startDateCondtion || endDateCondition;
  }
  handleRangeSelection(timestamp) {
    if (this.startDate && this.endDate) {
      this.endDate = undefined;
      this.startDate = timestamp;
    }
    else if (this.startDate && !this.endDate) {
      if (timestamp > this.startDate) {
        this.endDate = timestamp;
      }
      else if (timestamp < this.startDate) {
        this.endDate = this.startDate;
        this.startDate = timestamp;
      }
    }
    else if (!this.startDate && this.endDate) {
      this.startDate = timestamp;
    }
    else if (!this.startDate && !this.endDate) {
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
    if (this.startDate &&
      this.dateHovered < this.startDate &&
      day.timestamp === this.dateHovered) {
      cellStyle += ' start-day';
    }
    else if (this.endDate &&
      this.dateHovered < this.endDate &&
      day.timestamp === this.dateHovered) {
      cellStyle += ' start-day';
    }
    else if (this.startDate &&
      this.dateHovered > this.startDate &&
      day.timestamp === this.dateHovered) {
      cellStyle += ' end-day';
    }
    return cellStyle;
  }
  renderCalendar(monthDetails) {
    const days = monthDetails.map((day, index) => {
      return (h("div", { class: this.getCellStyle(day), key: index }, h("div", { class: 'cdc-day' }, h("span", { role: 'button', tabindex: '0', onClick: () => this.onDateClick(day), onMouseOver: () => this.handleDateHover(day), onFocus: () => this.handleDateHover(day), onKeyDown: handleKeyDown(() => this.handleDateHover(day)) }, day.date))));
    });
    return (h("div", { class: 'c-container' }, h("div", { class: 'cc-head' }, weekDay.map((day, index) => (h("div", { key: index, class: 'cch-name' }, day)))), h("div", { class: 'cc-body' }, days)));
  }
  showSingleDatePicker() {
    return this.showDatePicker && this.mode !== 'range';
  }
  showDateRangePicker() {
    return this.showDatePicker && this.mode === 'range';
  }
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h("fw-popover", { "same-width": 'false', distance: '8', placement: 'bottom-start', fallbackPlacements: ['top-start'] }, h("fw-input", { slot: 'popover-trigger', value: this.value, class: 'date-input', placeholder: this.placeholder, readonly: true }), this.showSingleDatePicker() ? (h("div", { class: 'datepicker', slot: 'popover-content' }, h("div", { class: 'mdp-container' }, h("div", { class: 'mdpc-head' }, h("div", { class: 'mdpch-button' }, h("div", { role: 'button', tabindex: '0', class: 'mdpchb-inner', onClick: () => this.setMonth(-1), onKeyDown: handleKeyDown(() => this.setMonth(-1)) }, h("span", { class: 'mdpchbi-left-arrow' }))), h("div", { class: 'mdpch-container' }, h("span", { class: 'mdpchc-month' }, h("fw-select", { class: 'single-month-selector', readonly: true, value: monthArr[this.month] }, monthArr.map((month, i) => (h("fw-select-option", { value: month, key: i, selected: month === monthArr[this.month] }, month))))), h("span", { class: 'mdpchc-year' }, h("fw-select", { class: 'single-year-selector', readonly: true, value: this.year }, this.supportedYears.map((year, i) => (h("fw-select-option", { value: year, key: i, selected: year === this.year }, year)))))), h("div", { class: 'mdpch-button-right' }, h("div", { role: 'button', tabindex: '0', class: 'mdpchb-inner', onClick: () => this.setMonth(1), onKeyDown: handleKeyDown(() => this.setMonth(1)) }, h("span", { class: 'mdpchbi-right-arrow' })))), h("div", { class: 'mdpc-body' }, this.renderCalendar(this.monthDetails))), h("div", { class: 'mdpc-footer' }, h("fw-button", { color: 'primary', class: 'update-date-value' }, "Update"), h("fw-button", { color: 'secondary', class: 'close-date-picker' }, "Cancel")))) : (''), this.showDateRangePicker() ? (h("div", { class: 'daterangepicker', slot: 'popover-content' }, h("div", { class: 'mdp-range-container' }, h("div", { class: 'mdpc-head' }, h("div", { class: 'mdpch-button' }, h("div", { role: 'button', tabindex: '0', class: 'mdpchb-inner', onClick: () => this.setMonth(-1), onKeyDown: handleKeyDown(() => this.setMonth(-1)) }, h("span", { class: 'mdpchbi-left-arrow' }))), h("div", { class: 'mdpch-container' }, h("span", { class: 'mdpchc-month' }, h("fw-select", { class: 'from-month-selector', readonly: true, value: monthArr[this.month] }, monthArr.map((month, i) => (h("fw-select-option", { value: month, key: i, selected: month === monthArr[this.month] }, month))))), h("span", { class: 'mdpchc-year' }, h("fw-select", { class: 'from-year-selector', readonly: true, value: this.year }, this.supportedYears.map((year, i) => (h("fw-select-option", { value: year, key: i, selected: year === this.year }, year)))))), h("div", { class: 'mdpch-button-right' }, h("div", { role: 'button', tabindex: '0', class: 'mdpchb-inner', onClick: () => this.setMonth(1), onKeyDown: handleKeyDown(() => this.setMonth(1)) }, h("span", { class: 'mdpchbi-right-arrow' }))), h("div", { class: 'mdpch-container-right' }, h("span", { class: 'mdpchc-year' }, h("fw-select", { class: 'to-year-selector', readonly: true, value: this.toYear }, this.supportedYears.map((year, i) => (h("fw-select-option", { value: year, key: i, selected: year === this.toYear }, year))))), h("span", { class: 'mdpchc-month' }, h("fw-select", { class: 'to-month-selector', readonly: true, value: monthArr[this.toMonth] }, monthArr.map((month, i) => (h("fw-select-option", { value: month, key: i, selected: month === monthArr[this.toMonth] }, month))))))), h("div", { class: 'body-container' }, h("div", { class: 'mdpc-body' }, this.renderCalendar(this.monthDetails)), h("div", { class: 'mdpc-body mdpc-body-right' }, this.renderCalendar(this.nextMonthDetails)))), h("div", { class: 'mdpc-range-footer' }, h("fw-button", { color: 'primary', class: 'update-range-value' }, "Update"), h("fw-button", { color: 'secondary', class: 'close-date-picker' }, "Cancel")))) : ('')));
  }
  get host() { return getElement(this); }
};
Datepicker.style = datepickerCss;

export { Datepicker as fw_datepicker };
