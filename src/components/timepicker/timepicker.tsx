import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'fw-timepicker',
  shadow: true,
})
export class Timepicker {
  /**
   * State for all the time value\s
   */
  @State() timeValues: any[] = [];

  /**
   * Format of the time for input and output
   */
  @Prop() hourFormat = 'hh:mm p';

  /**
   * Represent the intervals and can be a number or array of numbers representing the minute values in an hour
   */
  @State() isMeridianFormat?: boolean = this.hourFormat === 'hh:mm p';

  /**
   * min time Object
   */
  @State() minTimeObj;

  /**
   * Max time obj
   */
  @State() maxTimeObj;

  /**
   * time output value
   */
  @Prop({ mutable: true }) timeValue?: string;

  /**
   * interval bw two time in minutes
   */
  @Prop() interval = 30;
  /**
   * Min  time
   */
  @Prop() minTime?: string = this.isMeridianFormat ? '12:00 AM' : '00:00';

  /**
   * Max time
   */
  @Prop() maxTime?: string = this.isMeridianFormat ? '11:30 PM' : '23:30';

  private isPrimaryMeridian(time: string) {
    return time.includes('PM');
  }

  private padZeroToTime(hours: number, mins: number) {
    let hoursStr = `${hours}`;
    let minsStr = `${mins}`;
    if (hours < 10) {
      hoursStr = `0${hours}`;
    }

    if (mins < 10) {
      minsStr = `0${mins}`;
    }
    return `${hoursStr}:${minsStr}`;
  }

  private getHoursMinutes(time: string) {
    const hoursMins = time.split(':');
    const hours = Number(hoursMins[0]);
    const mins = Number(hoursMins[1].split(' ')[0]);
    return {
      hours,
      mins,
    };
  }

  private getTimeInMeridian(timeInMinutes: number) {
    let hours = Math.floor(timeInMinutes / 60);
    const mins = timeInMinutes % 60;
    if (hours >= 12) {
      hours = hours === 12 ? hours : (hours - 12);
      return `${this.padZeroToTime(hours, mins)} PM`;
    }

    if (hours === 0) {
      hours += 12;
    }
    return `${this.padZeroToTime(hours, mins)} AM`;
  }

  private getTimeInNonMeridian(time: string) {
    let { hours } = this.getHoursMinutes(time);
    const { mins } = this.getHoursMinutes(time);
    if (!this.isPrimaryMeridian(time)) {
      if (hours === 12) {
        hours -= 12;
      }
      return this.padZeroToTime(hours, mins);
    } else {
      if (hours !== 12) {
        hours += 12;
      }
    }
    return this.padZeroToTime(hours, mins);
}

  private getTimeInMins(time: string) {
    const nonMeridianTime = this.getTimeInNonMeridian(time);
    const { hours, mins } = this.getHoursMinutes(nonMeridianTime);
    return (hours * 60) + mins;
  }

  private setMinMaxTimeObjs() {

    this.minTimeObj = {
      timeInMinutes : this.getTimeInMins(this.minTime),
      nonMeridianTime : this.getTimeInNonMeridian(this.minTime),
    };

    this.maxTimeObj = {
      timeInMinutes : this.getTimeInMins(this.maxTime),
      nonMeridianTime : this.getTimeInNonMeridian(this.maxTime),
    };
  }

  private setTimeValues = () => {
    let currentTime = this.minTimeObj.timeInMinutes;
    do {
      const timeInMeridian = this.getTimeInMeridian(currentTime);
      this.timeValues.push({
        timeInMinutes: currentTime,
        label: {
          meridian: timeInMeridian,
          nonMeridian: this.getTimeInNonMeridian(timeInMeridian),
        },
      });
      currentTime += this.interval;
    } while (currentTime <= this.maxTimeObj.timeInMinutes);
  }

  private currentTimeLabel(time: any) {
    return this.isMeridianFormat ? time.label.meridian : time.label.nonMeridian;
  }

  private currentTimeValue(time: any) {
    return time.label.nonMeridian;
  }

  private setTimeValue(e: any) {
    const { value } = e.detail;
    this.timeValue = value;
  }

  componentWillLoad() {
    this.setMinMaxTimeObjs();
    this.setTimeValues();
  }

  render() {
    return (
      <fw-select onFwChange = { this.setTimeValue }>
          {
           this.timeValues.map(time =>
              <fw-select-option value = {this.currentTimeValue(time)}> { this.currentTimeLabel(time) } </fw-select-option>
            )
          }
      </fw-select>
    );
  }
}
