import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import  { timelist } from '../../helpers/calendar';

@Component({
  tag: 'fw-time-picker',
  styleUrl: 'time-picker.scss',
  shadow: true
})
export class TimePicker {
  /**
   * Disabled prop
   */
  @Prop() disabled: boolean;
  /**
   * State to maintain the dropdown
   */
  @State() isDropdownOpen: boolean = false;
  /**
   * State for the selected time value
   */
  @State() timeValue: Object = { label: '12:00 AM', value: '00:00' };
  /**
   * Method to toggle dropdown open and close
   */
  @Event() timeValueChanged: EventEmitter;
  private toggleDropDown(event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  private selectTime(time) {
    this.timeValue = time;
    this.timeValueChanged.emit(time);
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  render() {
    return <div>
    <input class = "time-picker time-picker-text"
     onClick = {(event: UIEvent) => this.toggleDropDown(event)}
     disabled = {this.disabled}
     readonly value = {!this.disabled ? this.timeValue.label : ""}>
    </input>
    <span class = { "arrow " + (this.isDropdownOpen ? "up-arrow" : "down-arrow")}>
    </span>
      <ul class = {"time-picker-drop-down " + (this.isDropdownOpen ? "dropdown-open" : "")}>
        {
          timelist.map((time) => {
            return <li class = "time-picker-option" 
            aria-selected = {time === this.timeValue ? true : false}
            onClick = {() => this.selectTime(time)}
            >
              {time.label}
            </li>
          })
        }
      </ul>
  </div>;
  }
}
