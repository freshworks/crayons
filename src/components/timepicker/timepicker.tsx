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
  @State() isMeridianFormat?: boolean = this.hourFormat === 'hh:mm p';
  
  @State() minTimeObj;
  @State() maxTimeObj;

  @Prop() value?: string;

  @Prop() interval?: number = 30;
  

  /**
   * Min  time
   */
  @Prop() minTime?: string = this.isMeridianFormat ? '12:00 AM' : '00:00';
  /**
   * Max time
   */
  @Prop() maxTime?: string = this.isMeridianFormat ? '11:30 PM' : '23:30';

  private isPrimaryMeridian(time:string) {
    return time.includes('PM');
  }

  private padZeroToTime(hours:number, mins:number) {
    let hoursStr = `${hours}`, minsStr = `${mins}`;
    if(hours < 10) {
      hoursStr = `0${hours}`;
    }

    if(mins < 10) {
      minsStr = `0${mins}`;
    }
    return `${hoursStr}:${minsStr}`;
  }

  private getHoursMinutes(time:string) {
    const hoursMins = time.split(':');
    const hours = Number(hoursMins[0]);
    const mins = Number(hoursMins[1].split(' ')[0]);
    return {
      hours, 
      mins
    }
  }

  private getTimeInMeridian(timeInMinutes:number) {
    let hours = Math.floor(timeInMinutes / 60);
    let mins = timeInMinutes % 60;
    if(hours >= 12) {
      hours = hours === 12 ? hours : (hours - 12);
      return `${this.padZeroToTime(hours, mins)} PM`;
    }

    if(hours === 0) {
      hours += 12;
    }
    return `${this.padZeroToTime(hours, mins)} AM`;
  }

  private getTimeInNonMeridian(time:string) {
    let { hours, mins } = this.getHoursMinutes(time);
    if(!this.isPrimaryMeridian(time)) {
      if(hours === 12) {
        hours -= 12;
      }
      return this.padZeroToTime(hours, mins);
    }
    else {
      if(hours !== 12) {
        hours += 12;
      }
    }
    return this.padZeroToTime(hours, mins);
}

  private getTimeInMins(time:string) {
    const nonMeridianTime = this.getTimeInNonMeridian(time);
    const { hours,mins } = this.getHoursMinutes(nonMeridianTime);
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
          nonMeridian: this.getTimeInNonMeridian(timeInMeridian)
        }
      });
      currentTime += this.interval;
    } while(currentTime <= this.maxTimeObj.timeInMinutes);
  }

  private currentTimeLabel(time:any) {
    return this.isMeridianFormat ? time.label.meridian : time.label.nonMeridian;
  }

  private currentTimeValue(time:any) {
    return time.label.meridian;
  }

  componentWillLoad() {
    this.setMinMaxTimeObjs();
    this.setTimeValues();
    
  }

  render() {
    return (
      <fw-select>
          {
           this.timeValues.map(time =>
              <fw-select-option value = {this.currentTimeValue(time)}> { this.currentTimeLabel(time) } </fw-select-option>
            )
          }
      </fw-select>
    );
  }
}
