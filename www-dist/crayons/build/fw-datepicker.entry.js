import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { f as format, a as addDays, s as startOfWeek, g as getDaysInMonth, p as parse, i as isValid, b as getMonth, c as getYear, d as getDate, e as formatISO, h as isMatch, j as parseISO, k as startOfDay } from './index-0ccdf715.js';
import { g as getFocusableChildren, a as addRTL, h as handleKeyDown, b as hasSlot, r as renderHiddenField } from './index-a4741a9c.js';
import { F as FieldControl } from './field-control-33f3464c.js';
import { T as TranslationController, i as i18n } from './Translation-c1d22902.js';

const datepickerCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.field-control{position:relative}.field-control-label{display:block;font-size:12px;color:var(--fw-label-color, #475867);font-weight:600;-webkit-margin-after:4px;margin-block-end:4px;-webkit-padding-start:2px;padding-inline-start:2px;line-height:20px}.field-control-label.required::after{content:\"*\";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}.field-control-hint-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-hint-color, #acb6be);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-error-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-error-color, #d72d30);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-warning-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-warning-color, #f8ab59);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}:host{display:block;position:relative;--fw-icon-size:14px}:host *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mdp-container,.mdp-range-container{width:264px;background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;padding:16px;overflow:hidden}.mdpc-footer{padding:4px;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-pack:end;justify-content:flex-end;background:#f5f7f9}.mdpc-footer fw-button{margin:4px}.mdp-range-container{width:536px}.mdpc-head{--fw-select-margin-bottom:16px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.mdpc-body{width:100%}:host(:not([dir=\"rtl\"])) .mdpc-body,:host([dir=\"ltr\"]) .mdpc-body{float:left}:host([dir=\"rtl\"]) .mdpc-body{float:right}.body-container{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:justify;justify-content:space-between}.body-container .mdpc-body{width:232px;padding-inline:8px;padding-block:0;position:relative}.body-container .mdpc-body-right{width:232px;padding-inline:8px;padding-block:0}.body-container .mdpc-body-right::after{content:\"\";position:absolute;inset-block-start:0;inset-inline-end:251px;-webkit-border-end:1px solid #ebeff3;border-inline-end:1px solid #ebeff3;height:100%}.btns{display:inherit;position:absolute;inset-inline-end:14px}.mdpch-button,.mdpch-button-right{width:12px;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;inset-block-end:6px;inset-inline-end:14px}.mdpchb-inner:hover,.mdpchb-inner:focus{cursor:pointer;background:#ebeff3}.mdpchb-inner{height:20px;width:20px;position:absolute;-webkit-margin-before:-11px;margin-block-start:-11px}.mdpch-button-right .mdpchb-inner{inset-inline-start:12px}.mdpchbi-left-arrow,.mdpchbi-left-arrows,.mdpchbi-left-arrows::after,.mdpchbi-right-arrow,.mdpchbi-right-arrows,.mdpchbi-right-arrows::after{display:block;width:6px;height:6px;-webkit-border-start:2px solid #183247;border-inline-start:2px solid #183247;-webkit-border-after:2px solid #183247;border-block-end:2px solid #183247;position:absolute}.mdpchbi-left-arrow,.mdpchbi-left-arrows,.mdpchbi-right-arrow,.mdpchbi-right-arrows{inset-inline-start:50%;inset-block-start:50%;-webkit-margin-start:-2px;margin-inline-start:-2px;-webkit-margin-before:-4px;margin-block-start:-4px}:host(:not([dir=\"rtl\"])) .mdpchbi-left-arrow,:host([dir=\"ltr\"]) .mdpchbi-left-arrow,:host(:not([dir=\"rtl\"])) .mdpchbi-left-arrows,:host([dir=\"ltr\"]) .mdpchbi-left-arrows,:host(:not([dir=\"rtl\"])) .mdpchbi-right-arrow,:host([dir=\"ltr\"]) .mdpchbi-right-arrow,:host(:not([dir=\"rtl\"])) .mdpchbi-right-arrows,:host([dir=\"ltr\"]) .mdpchbi-right-arrows{-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host([dir=\"rtl\"]) .mdpchbi-left-arrow,:host([dir=\"rtl\"]) .mdpchbi-left-arrows,:host([dir=\"rtl\"]) .mdpchbi-right-arrow,:host([dir=\"rtl\"]) .mdpchbi-right-arrows{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.mdpchbi-right-arrow,.mdpchbi-right-arrows{-webkit-margin-start:-4px;margin-inline-start:-4px}:host(:not([dir=\"rtl\"])) .mdpchbi-right-arrow,:host([dir=\"ltr\"]) .mdpchbi-right-arrow,:host(:not([dir=\"rtl\"])) .mdpchbi-right-arrows,:host([dir=\"ltr\"]) .mdpchbi-right-arrows{-webkit-transform:rotate(225deg);transform:rotate(225deg)}:host([dir=\"rtl\"]) .mdpchbi-right-arrow,:host([dir=\"rtl\"]) .mdpchbi-right-arrows{-webkit-transform:rotate(-225deg);transform:rotate(-225deg)}.mdpchbi-left-arrows::after,.mdpchbi-right-arrows::after{content:\"\";inset-inline-start:3px;inset-block-start:-5px}.mdpchbi-left-arrows{-webkit-margin-start:-5px;margin-inline-start:-5px}.mdpchbi-right-arrows{-webkit-margin-start:-2px;margin-inline-start:-2px}.mdpch-container,.mdpch-container-right{min-width:50%}.mdpch-container-right{-webkit-padding-start:16px;padding-inline-start:16px}.mdpchc-year{--fw-button-min-width:74px;height:30px;font-size:16px;color:#475867;text-align:center;width:74px;--fw-popover-max-height:146px;--fw-popover-min-width:170px}:host(:not([dir=\"rtl\"])) .mdpchc-year,:host([dir=\"ltr\"]) .mdpchc-year{float:left}:host([dir=\"rtl\"]) .mdpchc-year{float:right}.mdpchc-month{--fw-button-min-width:65px;font-size:16px;color:#475867;text-align:center;width:65px;--fw-popover-max-height:146px;--fw-popover-min-width:170px}:host(:not([dir=\"rtl\"])) .mdpchc-month,:host([dir=\"ltr\"]) .mdpchc-month{float:left}:host([dir=\"rtl\"]) .mdpchc-month{float:right}.mdpchc-month fw-select .input-container-inner input{width:98%}.c-container,.c-day-container,.cc-body,.cc-head,.cch-name,.cdc-day,.cdc-day span{position:relative;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}:host(:not([dir=\"rtl\"])) .c-container,:host([dir=\"ltr\"]) .c-container,:host(:not([dir=\"rtl\"])) .c-day-container,:host([dir=\"ltr\"]) .c-day-container,:host(:not([dir=\"rtl\"])) .cc-body,:host([dir=\"ltr\"]) .cc-body,:host(:not([dir=\"rtl\"])) .cc-head,:host([dir=\"ltr\"]) .cc-head,:host(:not([dir=\"rtl\"])) .cch-name,:host([dir=\"ltr\"]) .cch-name,:host(:not([dir=\"rtl\"])) .cdc-day,:host([dir=\"ltr\"]) .cdc-day,:host(:not([dir=\"rtl\"])) .cdc-day span,:host([dir=\"ltr\"]) .cdc-day span{float:left}:host([dir=\"rtl\"]) .c-container,:host([dir=\"rtl\"]) .c-day-container,:host([dir=\"rtl\"]) .cc-body,:host([dir=\"rtl\"]) .cc-head,:host([dir=\"rtl\"]) .cch-name,:host([dir=\"rtl\"]) .cdc-day,:host([dir=\"rtl\"]) .cdc-day span{float:right}.c-container{width:100%;height:100%}.cc-head{height:30px;width:100%}.cch-name{width:14.285%;height:30px;line-height:30px;font-weight:700;color:#475867;font-size:13px;text-align:center}.cc-body{height:210px;width:100%}.c-day-container{width:14.285%;height:11.185%;-webkit-margin-before:10px;margin-block-start:10px}.cdc-day{width:100%;height:100%;font-size:12px;font-weight:300;color:#475867;text-align:center}.cdc-day span:hover,.cdc-day span:focus{cursor:pointer;background:#ebeff3}.cdc-day span{width:24px;height:22px;font-size:14px;-webkit-margin-before:-11px;margin-block-start:-11px;-webkit-margin-start:-13px;margin-inline-start:-13px;inset-inline-start:50%;inset-block-start:50%;font-weight:400;border-radius:10%;line-height:20px;color:#12344d}.c-day-container.disabled{pointer-events:none}.date-input{width:200px}.icon-calendar{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-inline:0px;margin-block:4px}.icon-calendar .separator{border-inline-start-width:1px;border-inline-start-style:solid;height:20px;margin-inline:4px;margin-block:0px}.date-icon{display:-ms-flexbox;display:flex;width:24px;height:24px;border-radius:4px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:#ebeff3}.range-date-input{width:235px}.c-day-container.disabled .cdc-day span{color:#92a2b1;background:#fff !important}.c-day-container.highlight:not(.disabled) .cdc-day span{border:1px solid #cfd7df}.c-day-container.highlight-blue:not(.disabled) .cdc-day span{background:#2c5cc5;color:#f5f7f9}.c-day-container.start-day .cdc-day{-webkit-margin-start:10px;margin-inline-start:10px}:host(:not([dir=\"rtl\"])) .c-day-container.start-day .cdc-day span,:host([dir=\"ltr\"]) .c-day-container.start-day .cdc-day span{-webkit-transform:translateX(-10px);transform:translateX(-10px)}:host([dir=\"rtl\"]) .c-day-container.start-day .cdc-day span{-webkit-transform:translateX(10px);transform:translateX(10px)}.c-day-container.end-day .cdc-day{-webkit-margin-start:-10px;margin-inline-start:-10px}:host(:not([dir=\"rtl\"])) .c-day-container.end-day .cdc-day span,:host([dir=\"ltr\"]) .c-day-container.end-day .cdc-day span{-webkit-transform:translateX(10px);transform:translateX(10px)}:host([dir=\"rtl\"]) .c-day-container.end-day .cdc-day span{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.c-day-container.highlight-range:not(.disabled) .cdc-day{background:#e4f2fd}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const getMonthNames = (lang) => {
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
const getWeekDays = (lang) => {
  if (!lang)
    return defaultweekDays;
  return Array.from(Array(7)).map((_e, i) => format(addDays(startOfWeek(new Date()), i), 'EEEEE', { locale: lang }));
};
let Datepicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.firstFocusElement = null;
    this.lastFocusElement = null;
    this.hasHintTextSlot = false;
    this.hasWarningTextSlot = false;
    this.hasErrorTextSlot = false;
    /**
     *   Type of date selection enabled for the calendar. If the value is range, a user can select a date range in the calendar.
     */
    this.mode = 'single date';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    this.updateText = '';
    this.cancelText = '';
    /**
     * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
     */
    this.required = false;
    /**
     * Theme based on which the input of the datepicker is styled.
     */
    this.state = 'normal';
    /**
     * Minimum year that needs to be displayed in the year dropdown.
     */
    this.minYear = 1970;
    /**
     * Maximum year that needs to be displayed in the year dropdown.
     */
    this.maxYear = new Date().getFullYear();
    /**
     * Make the input box as readonly. Default `false`
     */
    this.readonly = false;
    /**
     * Make the datepicker box as disabled. Default `false`
     */
    this.disabled = false;
    /**
     * Indicates if footer needs to be shown. Default `true`.
     */
    this.showFooter = true;
    /**
     * Displays a clear icon in the text box. Clicking the icon clears the value. Default `false`
     */
    this.clearInput = false;
    /**
     * Hint text displayed below the text box.
     */
    this.hintText = '';
    /**
     * Warning text displayed below the text box.
     */
    this.warningText = '';
    /**
     * Error text displayed below the text box.
     */
    this.errorText = '';
    /**
     * Label displayed on the interface, for the component.
     */
    this.label = '';
    this.escapeHandler = null;
    this.isDisplayFormatSet = false;
    this.isPlaceholderSet = false;
    this.getSupportedYears = () => {
      const yearsArr = [];
      if (+this.maxYear < +this.minYear)
        this.maxYear = +this.minYear;
      let year = +this.minYear;
      while (year <= +this.maxYear) {
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
      const prevMonthNumberOfDays = getDaysInMonth(new Date(prevYear, prevMonth)) || 0;
      const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
      const month = this._getValidDateInMonth(date, args);
      const timestamp = new Date(args.year, args.month, _date).valueOf();
      return { date: _date, day, month, timestamp };
    };
    this.getMonthDetails = (year, month) => {
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
    this.isSelectedDay = ({ date, timestamp }) => {
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
      if (startDate === endDate)
        return;
      return (startDate && endDate && timestamp >= startDate && timestamp <= endDate);
    };
    this.onDateClick = (e, { date, timestamp }) => {
      if (this.showSingleDatePicker()) {
        this.selectedDay = date;
        if (!this.showFooter) {
          this.updateValueAndEmitEvent(e);
          this.showDatePicker = false;
          this.host.shadowRoot.querySelector('fw-popover').hide();
        }
      }
      else if (this.showDateRangePicker()) {
        this.handleRangeSelection(timestamp);
        if (!this.showFooter) {
          if (this.startDate && this.endDate) {
            this.updateValueAndEmitEvent(e);
            this.showDatePicker = false;
            this.host.shadowRoot.querySelector('fw-popover').hide();
          }
        }
        this.dateHovered = '';
      }
    };
    this.handleInputClear = (e) => {
      this.clearInputValue();
      this.emitEvent(e, undefined);
    };
    // handle cancel and popover close
    this.handlePopoverClose = (e) => {
      var _a, _b;
      if (((_a = e.target) === null || _a === void 0 ? void 0 : _a.tagName) === 'FW-SELECT')
        return;
      if (this.mode === 'range') {
        // handle resetting of startDate and endDate on clicking cancel
        if (this.value) {
          let [fromDateStr, toDateStr] = ((_b = this.value) === null || _b === void 0 ? void 0 : _b.split(TranslationController.t('datepicker.to'))) || [];
          fromDateStr = fromDateStr === null || fromDateStr === void 0 ? void 0 : fromDateStr.trim();
          toDateStr = toDateStr === null || toDateStr === void 0 ? void 0 : toDateStr.trim();
          const startDate = getDate(new Date(this.startDate));
          const endDate = getDate(new Date(this.endDate));
          const fromDate = getDate(parse(fromDateStr, this.displayFormat, new Date(), {
            locale: this.langModule,
          }));
          const toDate = getDate(parse(toDateStr, this.displayFormat, new Date(), {
            locale: this.langModule,
          }));
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
        }
        else if (!this.startDate && !this.endDate) {
          this.startDate = this.endDate = undefined;
        }
      }
      else {
        // handle resetting of selectedDay on clicking cancel
        if (this.value) {
          const date = getDate(parse(this.value, this.displayFormat, new Date(), {
            locale: this.langModule,
          }));
          if (this.selectedDay !== date) {
            this.selectedDay = date;
          }
        }
        else
          this.selectedDay = undefined;
      }
    };
    this.onBlur = async (e) => {
      var _a, _b, _c, _d;
      e.stopImmediatePropagation();
      if (((_d = (_c = (_b = (_a = e) === null || _a === void 0 ? void 0 : _a.detail) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.relatedTarget) === null || _d === void 0 ? void 0 : _d.tagName) !== 'SPAN') {
        this.fwBlur.emit({
          event: e,
          name: this.name,
        });
      }
    };
  }
  makeDatePickerInert() {
    if (!this.madeInert) {
      /**
       * Focus trapping inside datepicker.
       */
      const focusableElements = getFocusableChildren(this.host);
      if (focusableElements.length) {
        this.firstFocusElement = focusableElements[0];
        this.lastFocusElement = focusableElements[focusableElements.length - 1];
        this.lastFocusElement.addEventListener('keydown', (e) => {
          !e.shiftKey &&
            e.keyCode === 9 &&
            this.focusElement(this.firstFocusElement);
        });
        this.firstFocusElement.addEventListener('keydown', (e) => {
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
    this.escapeHandler = ((e) => {
      if (e.keyCode === 27) {
        this.showDatePicker = false;
        this.host.shadowRoot.querySelector('fw-popover').hide();
      }
    }).bind(this);
    document.addEventListener('keydown', this.escapeHandler);
  }
  emitEvent(event, eventDetails) {
    this.fwChange.emit({
      event: event,
      name: this.name,
      value: eventDetails,
    });
  }
  focusElement(element) {
    element.focus();
  }
  connectedCallback() {
    addRTL(this.host);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this.escapeHandler);
  }
  formatDate(value) {
    if (!value)
      return value;
    return this.displayFormat
      ? formatISO(parse(value, this.displayFormat, new Date(), {
        locale: this.langModule,
      }))
      : formatISO(new Date(value));
  }
  /**
   * Returns the date value in ISO format.
   */
  async getValue() {
    if (this.mode === 'range') {
      return {
        fromDate: (this.startDate &&
          formatISO(parse(format(new Date(this.startDate), this.displayFormat, {
            locale: this.langModule,
          }), this.displayFormat, new Date(), {
            locale: this.langModule,
          }))) ||
          undefined,
        toDate: (this.endDate &&
          formatISO(parse(format(new Date(this.endDate), this.displayFormat, {
            locale: this.langModule,
          }), this.displayFormat, new Date(), {
            locale: this.langModule,
          }))) ||
          undefined,
      };
    }
    return ((this.value &&
      formatISO(parse(this.value, this.displayFormat, new Date(), {
        locale: this.langModule,
      }))) ||
      undefined);
  }
  /**
   * Sets focus on a specific `fw-datepicker`. Use this method instead of the global `input.focus()`.
   */
  async setFocus() {
    var _a, _b;
    if (this.nativeInput) {
      (_b = (_a = this.nativeInput).setFocus) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
  }
  /**
   * Clears the input value and unselects selected date.
   */
  async clearValue() {
    this.clearInputValue();
  }
  handleKeyDown(event) {
    switch (event.code) {
      case 'Enter':
        this.host.shadowRoot.querySelector('fw-popover').show();
        break;
      case 'ArrowDown':
        event.preventDefault();
    }
    this.makeDatePickerInert();
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
      if (this.startDate && this.endDate) {
        this.updateValueAndEmitEvent(e);
      }
    }
    else if (isUpdateDate) {
      if (this.selectedDay) {
        this.updateValueAndEmitEvent(e);
      }
    }
    if (e.path[0].innerText === this.cancelText && !this.value) {
      if (this.mode === 'range') {
        this.startDate = this.endDate = undefined;
      }
      else {
        this.selectedDay = undefined;
      }
    }
    if (e.path[0].innerText === this.cancelText) {
      this.handlePopoverClose(e);
    }
    // Close datepicker only for fwClick event of Update and cancel buttons. Since this will
    // be triggered for month and year select dropdown as well the below check is added.
    if (e.path[0].innerText === this.updateText ||
      e.path[0].innerText === this.cancelText) {
      this.showDatePicker = false;
      this.host.shadowRoot.querySelector('fw-popover').hide();
    }
  }
  /**
   * Listener to handle input changes
   */
  handleInputChanges(e) {
    e.stopImmediatePropagation();
    if (e.composedPath()[0].classList.value.includes('range-date-input')) {
      // Range input
      const val = e.path[0].value;
      if (!val) {
        this.value = undefined;
      }
      let [fromDate, toDate] = (val === null || val === void 0 ? void 0 : val.split(TranslationController.t('datepicker.to'))) || [];
      fromDate = fromDate === null || fromDate === void 0 ? void 0 : fromDate.trim();
      toDate = toDate === null || toDate === void 0 ? void 0 : toDate.trim();
      if (!isMatch(fromDate, this.displayFormat, {
        locale: this.langModule,
      }) ||
        !isMatch(toDate, this.displayFormat, {
          locale: this.langModule,
        }))
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
      const year = getYear(parse(fromDate, this.displayFormat, new Date(), {
        locale: this.langModule,
      }));
      if (year < this.minYear || year > this.maxYear) {
        return;
      }
      this.year = year;
      this.month = getMonth(parse(fromDate, this.displayFormat, new Date(), {
        locale: this.langModule,
      }));
      this.startDate = parse(fromDate, this.displayFormat, new Date(), {
        locale: this.langModule,
      }).valueOf();
      this.endDate = parse(toDate, this.displayFormat, new Date(), {
        locale: this.langModule,
      }).valueOf();
      this.toMonth = this.month === 11 ? 0 : this.month + 1;
      this.toYear =
        this.toMonth === 0 ? this.yearCalculation(this.year, 1) : this.year;
    }
    else {
      // Single Date input
      const val = e.path[0].value;
      if (!val) {
        this.value = undefined;
      }
      if (!isMatch(val, this.displayFormat, {
        locale: this.langModule,
      }))
        return;
      const parsedDate = parse(val, this.displayFormat, new Date(), {
        locale: this.langModule,
      });
      const isValidDate = isValid(parsedDate);
      if (!isValidDate) {
        // Invalid date format
        return;
      }
      const year = getYear(parse(val, this.displayFormat, new Date(), {
        locale: this.langModule,
      }));
      if (year < this.minYear || year > this.maxYear) {
        return;
      }
      this.year = year;
      this.month = getMonth(parse(val, this.displayFormat, new Date(), {
        locale: this.langModule,
      }));
      this.selectedDay = getDate(parse(val, this.displayFormat, new Date(), {
        locale: this.langModule,
      }));
      this.value = format(new Date(this.year, this.month, this.selectedDay), this.displayFormat, {
        locale: this.langModule,
      });
    }
  }
  /**
   * Listener to handle Month Year dropdown.
   */
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
      this.month = this.shortMonthNames.indexOf(newValue);
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
      this.month = this.shortMonthNames.indexOf(newValue);
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
      this.toMonth = this.shortMonthNames.indexOf(newValue);
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
  async handleLocaleChange(newLocale) {
    this.langModule = await TranslationController.getDateLangModule(newLocale);
  }
  async componentWillLoad() {
    var _a, _b;
    this.langModule = await TranslationController.getDateLangModule(this.locale);
    if (this.displayFormat) {
      this.isDisplayFormatSet = true;
    }
    if (this.placeholder) {
      this.isPlaceholderSet = true;
    }
    this.checkSlotContent();
    this.displayFormat =
      this.displayFormat ||
        ((_b = (_a = this.langModule) === null || _a === void 0 ? void 0 : _a.formatLong) === null || _b === void 0 ? void 0 : _b.date({ width: 'short' }));
    this.placeholder = this.placeholder || this.displayFormat;
    const onChange = TranslationController.onChange.bind(TranslationController);
    onChange('lang', async (locale) => {
      var _a, _b;
      this.langModule = await TranslationController.getDateLangModule(locale);
      this.displayFormat = this.isDisplayFormatSet
        ? this.displayFormat
        : (_b = (_a = this.langModule) === null || _a === void 0 ? void 0 : _a.formatLong) === null || _b === void 0 ? void 0 : _b.date({ width: 'short' });
      this.placeholder = this.isPlaceholderSet
        ? this.placeholder
        : this.displayFormat;
      if (this.mode === 'range')
        this.placeholder = this.isPlaceholderSet
          ? this.placeholder
          : `${this.displayFormat} ${TranslationController.t('datepicker.to')} ${this.displayFormat}`;
      const monthNames = getMonthNames(this.langModule);
      this.shortMonthNames = monthNames.shortMonthNames;
      this.longMonthNames = monthNames.longMonthNames;
      this.weekDays = getWeekDays(this.langModule);
    });
    if (this.mode === 'range') {
      const today = new Date();
      if ((this.fromDate && !isValid(parseISO(this.fromDate))) ||
        (this.toDate && !isValid(parseISO(this.toDate)))) {
        // Show current month and year if invalid date is provided
        this.year = getYear(today);
        this.month = getMonth(today);
      }
      else {
        const fromDate = new Date(this.fromDate);
        this.year = this.fromDate ? getYear(fromDate) : getYear(today);
        this.month = this.fromDate ? getMonth(fromDate) : getMonth(today);
      }
    }
    else {
      const today = new Date();
      if (this.value && !isValid(parseISO(this.value))) {
        // Show current date if invalid date is provided
        this.year = getYear(today);
        this.month = getMonth(today);
        this.selectedDay = getDate(today);
      }
      else {
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
      this.placeholder = this.isPlaceholderSet
        ? this.placeholder
        : `${this.displayFormat} ${TranslationController.t('datepicker.to')} ${this.displayFormat}`;
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
      const formattedFromDate = format(new Date(this.startDate), this.displayFormat, {
        locale: this.langModule,
      });
      const formattedToDate = format(new Date(this.endDate), this.displayFormat, {
        locale: this.langModule,
      });
      this.value = `${formattedFromDate} to ${formattedToDate}`;
    }
  }
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
    }
    else {
      if (this.mode !== 'range') {
        const date = new Date();
        date.setMonth(this.month, 1);
        date.setFullYear(this.year);
        date.setDate(this.selectedDay);
        this.value = format(date, this.displayFormat, {
          locale: this.langModule,
        });
      }
      else {
        const formattedFromDate = format(new Date(this.startDate), this.displayFormat, {
          locale: this.langModule,
        });
        const formattedToDate = format(new Date(this.endDate), this.displayFormat, {
          locale: this.langModule,
        });
        this.value = `${formattedFromDate} to ${formattedToDate}`;
      }
    }
  }
  _getValidDateInMonth(date, args) {
    if (date < 0) {
      return -1;
    }
    if (this.minDate !== undefined && this.maxDate !== undefined) {
      const minDate = parseISO(this.minDate);
      const maxDate = parseISO(this.maxDate);
      if (!isValid(minDate) || !isValid(maxDate)) {
        // Invalid minDate or maxDate provided.
        return;
      }
      const argDate = new Date(args.year, args.month, date + 1);
      const isValidDate = minDate.valueOf() <= argDate.valueOf() &&
        argDate.valueOf() <= maxDate.valueOf();
      return !isValidDate ? -1 : date >= args.numberOfDays ? 1 : 0;
    }
    else if (this.minDate !== undefined) {
      const minDate = parseISO(this.minDate);
      if (!isValid(minDate)) {
        // Invalid minDate provided.
        return;
      }
      const argDate = new Date(args.year, args.month, date + 1);
      const isValidDate = minDate.valueOf() <= argDate.valueOf();
      return !isValidDate ? -1 : date >= args.numberOfDays ? 1 : 0;
    }
    else if (this.maxDate !== undefined) {
      const maxDate = parseISO(this.maxDate);
      if (!isValid(maxDate)) {
        // Invalid minDate or maxDate provided.
        return;
      }
      const argDate = new Date(args.year, args.month, date + 1);
      const isValidDate = maxDate.valueOf() >= argDate.valueOf();
      return !isValidDate ? -1 : date >= args.numberOfDays ? 1 : 0;
    }
    return date >= args.numberOfDays ? 1 : 0;
  }
  handleKeyUp(e, day) {
    if (e.code === 'Enter') {
      if (e
        .composedPath()
        .find((e) => e.classList && e.classList.value === 'mdp-range-container')) {
        // Range Container
        this.onDateClick(e, day);
        this.startDateFormatted = format(new Date(this.startDate), this.displayFormat, {
          locale: this.langModule,
        });
        this.endDateFormatted = format(new Date(this.endDate), this.displayFormat, {
          locale: this.langModule,
        });
        if (this.startDate && this.endDate) {
          this.value = this.startDateFormatted + ' to ' + this.endDateFormatted;
          this.emitEvent(e, {
            fromDate: this.formatDate(this.startDateFormatted),
            toDate: this.formatDate(this.endDateFormatted),
          });
          this.showDatePicker = false;
          this.host.shadowRoot.querySelector('fw-popover').hide();
        }
      }
      else {
        // Single Date Container
        this.onDateClick(e, day);
        this.value = format(new Date(this.year, this.month, this.selectedDay), this.displayFormat, {
          locale: this.langModule,
        });
        this.emitEvent(e, this.formatDate(this.value));
        this.showDatePicker = false;
        this.host.shadowRoot.querySelector('fw-popover').hide();
      }
    }
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
  updateValueAndEmitEvent(e) {
    if (this.showSingleDatePicker()) {
      this.value = format(new Date(this.year, this.month, this.selectedDay), this.displayFormat, {
        locale: this.langModule,
      });
      this.emitEvent(e, this.formatDate(this.value));
    }
    else if (this.showDateRangePicker()) {
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
  }
  clearInputValue() {
    if (this.mode !== 'range') {
      if (this.selectedDay) {
        this.selectedDay = undefined;
      }
    }
    else {
      if (this.startDate && this.endDate) {
        this.startDate = this.endDate = undefined;
      }
    }
    this.value = undefined;
  }
  handleRangeSelection(timestamp) {
    if (this.startDate && this.endDate) {
      this.endDate = undefined;
      this.startDate = timestamp;
    }
    else if (this.startDate && !this.endDate) {
      if (timestamp >= this.startDate) {
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
      return (h("div", { class: this.getCellStyle(day), key: index }, h("div", { class: 'cdc-day' }, h("span", { role: 'button', tabindex: day.month === -1 || day.month === 1 ? '-1' : '0', onClick: (e) => this.onDateClick(e, day), onMouseOver: () => this.handleDateHover(day), onFocus: () => this.handleDateHover(day), onKeyDown: handleKeyDown(() => this.handleDateHover(day)), onKeyUp: (e) => this.handleKeyUp(e, day) }, day.date))));
    });
    return (h("div", { class: 'c-container' }, h("div", { class: 'cc-head' }, this.weekDays.map((day, index) => (h("div", { key: index, class: 'cch-name' }, day)))), h("div", { class: 'cc-body' }, days)));
  }
  showSingleDatePicker() {
    return this.showDatePicker && this.mode !== 'range';
  }
  showDateRangePicker() {
    return this.showDatePicker && this.mode === 'range';
  }
  checkSlotContent() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
  }
  renderNavButtons() {
    return (h("div", { class: 'btns' }, h("div", { class: 'mdpch-button' }, h("div", { role: 'button', tabindex: '0', class: 'mdpchb-inner', onClick: () => this.setMonth(-1), onKeyDown: handleKeyDown(() => this.setMonth(-1)) }, h("span", { class: 'mdpchbi-left-arrow' }))), h("div", { class: 'mdpch-button-right' }, h("div", { role: 'button', tabindex: '0', class: 'mdpchb-inner', onClick: () => this.setMonth(1), onKeyDown: handleKeyDown(() => this.setMonth(1)) }, h("span", { class: 'mdpchbi-right-arrow' })))));
  }
  renderSupportedYears() {
    return this.supportedYears.map((year, i) => (h("fw-select-option", { value: year, key: i, selected: +year === +this.year }, year)));
  }
  renderFooter() {
    return (h("div", { class: 'mdpc-footer' }, h("fw-button", { color: 'secondary', class: 'close-date-picker' }, this.cancelText), h("fw-button", { color: 'primary', class: this.mode === 'range' ? 'update-range-value' : 'update-date-value' }, this.updateText)));
  }
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h(FieldControl, { inputId: this.name, label: this.label, labelId: `${this.label}-${this.name}`, state: this.state, hintTextId: `hint-${this.name}`, hintText: this.hintText, hasHintTextSlot: this.hasHintTextSlot, errorTextId: `error-${this.name}`, errorText: this.errorText, hasErrorTextSlot: this.hasErrorTextSlot, warningTextId: `warning-${this.name}`, warningText: this.warningText, hasWarningTextSlot: this.hasWarningTextSlot, required: this.required }, h("fw-popover", { "same-width": 'false', distance: '8', placement: 'bottom-start', fallbackPlacements: ['top-start'], "hide-on-tab": 'false', onFwHide: this.handlePopoverClose, hoist: true }, h("div", { role: 'combobox', "aria-controls": 'datepicker', "aria-expanded": this.showDatePicker, tabindex: '-1', onClick: () => !this.disabled && (this.showDatePicker = true), onKeyUp: () => !this.disabled && (this.showDatePicker = true), slot: 'popover-trigger', style: {
        display: 'inline-flex',
        alignItems: 'center',
      } }, h("fw-input", { value: this.value, name: this.name, class: (this.mode === 'range' ? 'range-' : '') + 'date-input', disabled: this.disabled, placeholder: this.placeholder, required: this.required, onFwBlur: this.onBlur, ref: (el) => (this.nativeInput = el), state: this.state, readonly: this.readonly, clearInput: this.clearInput, onFwInputClear: this.handleInputClear }, h("div", { class: 'icon-calendar', slot: 'input-suffix' }, h("div", { class: 'separator', style: {
        borderLeftColor: this.state === 'error' ? '#d72d30' : '#ebeff3',
      } }), h("span", { class: 'date-icon' }, h("fw-icon", { name: 'calendar', style: {
        '--fw-icon-color': this.state === 'error' && '#d72d30',
      } }))))), this.showSingleDatePicker() ? (h("div", { id: 'datepicker', class: 'datepicker', slot: 'popover-content', ref: (el) => (this.popoverContentElement = el) }, h("div", { class: 'mdp-container' }, h("div", { class: 'mdpc-head' }, h("div", { class: 'mdpch-container' }, h("span", { class: 'mdpchc-month' }, h("fw-select", { class: 'first single-month-selector', readonly: true, value: this.shortMonthNames[this.month], "same-width": 'false', "options-placement": 'bottom-start', variant: 'button', options: this.longMonthNames.map((month, i) => ({
        value: this.shortMonthNames[i],
        key: i,
        selected: month === this.longMonthNames[this.month],
        text: month,
      })), allowDeselect: false, boundary: this.popoverContentElement })), h("span", { class: 'mdpchc-year' }, h("fw-select", { class: 'last single-year-selector', readonly: true, value: this.year, "same-width": 'false', "options-placement": 'bottom-start', variant: 'button', "allow-deselect": 'false', boundary: this.popoverContentElement }, this.renderSupportedYears()))), this.renderNavButtons()), h("div", { class: 'mdpc-body' }, this.renderCalendar(this.monthDetails))), this.showFooter && this.renderFooter())) : (''), this.showDateRangePicker() ? (h("div", { id: 'datepicker', class: 'daterangepicker', slot: 'popover-content', ref: (el) => (this.popoverContentElement = el) }, h("div", { class: 'mdp-range-container' }, h("div", { class: 'mdpc-head' }, h("div", { class: 'mdpch-container' }, h("span", { class: 'mdpchc-month' }, h("fw-select", { class: 'first from-month-selector', readonly: true, value: this.shortMonthNames[this.month], "same-width": 'false', variant: 'button', "options-placement": 'bottom-start', options: this.longMonthNames.map((month, i) => ({
        value: this.shortMonthNames[i],
        key: i,
        selected: month === this.longMonthNames[this.month],
        text: month,
      })), allowDeselect: false, boundary: this.popoverContentElement })), h("span", { class: 'mdpchc-year' }, h("fw-select", { class: 'last from-year-selector', readonly: true, value: this.year, "same-width": 'false', "options-placement": 'bottom-start', variant: 'button', "allow-deselect": 'false', boundary: this.popoverContentElement }, this.renderSupportedYears()))), h("div", { class: 'mdpch-container-right' }, h("span", { class: 'mdpchc-month' }, h("fw-select", { class: 'first to-month-selector', readonly: true, "same-width": 'false', variant: 'button', value: this.shortMonthNames[this.toMonth], "options-placement": 'bottom-start', options: this.longMonthNames.map((month, i) => ({
        value: this.shortMonthNames[i],
        key: i,
        selected: month === this.longMonthNames[this.toMonth],
        text: month,
      })), allowDeselect: false, boundary: this.popoverContentElement })), h("span", { class: 'mdpchc-year' }, h("fw-select", { class: 'last to-year-selector', readonly: true, value: this.toYear, "same-width": 'false', "options-placement": 'bottom-start', variant: 'button', "allow-deselect": 'false', boundary: this.popoverContentElement }, this.renderSupportedYears()))), this.renderNavButtons()), h("div", { class: 'body-container' }, h("div", { class: 'mdpc-body' }, this.renderCalendar(this.monthDetails)), h("div", { class: 'mdpc-body mdpc-body-right' }, this.renderCalendar(this.nextMonthDetails)))), this.showFooter && this.renderFooter())) : (''))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "locale": ["handleLocaleChange"],
    "value": ["watchValueChanged"]
  }; }
};
__decorate([
  i18n({ keyName: 'datepicker.update' })
], Datepicker.prototype, "updateText", void 0);
__decorate([
  i18n({ keyName: 'datepicker.cancel' })
], Datepicker.prototype, "cancelText", void 0);
Datepicker.style = datepickerCss;

export { Datepicker as fw_datepicker };
