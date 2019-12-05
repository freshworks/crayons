import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'fw-timepicker',
  styleUrl: 'timepicker.scss',
  shadow: true,
})
export class Timepicker {
  @State() timeValues: any[] = [];
  /**
   * Format of the time for input and output
   */
  @Prop() hourFormat = 'hh:mm p';
  /**
   * Represent the intervals and can be a number or array of numbers representing the minute values in an hour
   */
  @State() is12HourFormat?: boolean = this.hourFormat === 'hh:mm p';
  @State() minTimeValue?: string;
  @State() maxTimeValue?: string;
  @Prop() interval = 30;

  /**
   * Min  time
   */
  @Prop() minTime?: string = this.is12HourFormat ? '12:00 AM' : '00:00';
  /**
   * Max time
   */
  @Prop() maxTime?: string = this.is12HourFormat ? '11:30 PM' : '23:30';

  private isPrimaryMeridian = time => time.includes('PM');

  private getLabel = (currentTime) => {
    const hours = currentTime.split(':')[0];
    const mins = currentTime.split(':')[1];
    let modifiedHours = hours < 10 ? `0${hours}` : `${hours}`;
    let modifiedMins = mins < 10 ? `0${mins}` : `${mins}`;
    if(this.is12HourFormat) {
      const meridian = hours < 12 ? 'AM' : 'PM';
      if(modifiedHours === '00') {
        modifiedHours = '12'
      } 
      else if(Number(modifiedHours) > 12) {
        modifiedHours = `${Number(modifiedHours) - 12}`;
      }
      return `${modifiedHours}:${modifiedMins} ${meridian}`;
    }
    return `${modifiedMins}:${modifiedMins}`;
  }


  private getNextTime = (currentTime) => {
    const hours = Number(currentTime.split(':')[0]);
    const mins = Number(currentTime.split(':')[1]);
    const currentTimeInMins = (hours * 60) + mins;
    const nextTimeInMins = currentTimeInMins + this.interval;
    const nextTimeHours = Math.floor( nextTimeInMins / 60 );
    const nextTimeMins = nextTimeInMins % 60;
    return `${nextTimeHours}:${nextTimeMins}`;
  }

  private setTimeValues = () => {
    let currentTime = this.minTimeValue;
    do {
      const label = this.getLabel(currentTime);
      const value = currentTime;

      this.timeValues.push({
        label,
        value
      });
      currentTime = this.getNextTime(value);
    } while(currentTime !== this.maxTimeValue)
    const label = this.getLabel(currentTime);
    const value = currentTime
    this.timeValues.push({
      label,
      value
    });
  }
  componentWillLoad() {
  if (this.is12HourFormat) {
    this.minTimeValue = this.minTime.split(' ')[0];
    this.maxTimeValue = this.maxTime.split(' ')[0];
      const correctedMinHours = this.isPrimaryMeridian(this.minTime) ? 
                             Number(this.minTime.split(':')[0]) + 1 :
                             Number(this.minTime.split(':')[0]) - 12;
      this.minTimeValue = `${correctedMinHours}:${Number(this.minTimeValue.split(':')[1])}`;
      const correctedMaxHours = Number(this.maxTime.split(':')[0]) + 12;
      this.maxTimeValue = `${correctedMaxHours}:${Number(this.maxTimeValue.split(':')[1])}`;
  }
  this.setTimeValues();
}

  render() {
    return (
      <fw-select label="Select time">
          {
           this.timeValues.map(time =>
              <fw-select-option value={time.value}> { time.label } </fw-select-option>
            )
          }
      </fw-select>
    );
  }
}
