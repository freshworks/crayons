/* eslint-disable */
import { use } from 'typescript-mix';
import {
    Component,
    Element,
    Method,
    h
  } from '@stencil/core';
import { Datepicker } from './datepicker';
export interface TestDatePicker extends Datepicker {}

@Component({
  tag: 'fw-datepicker-uitest',
  styleUrl: 'datepicker.scss',
  shadow: true,
})
export class TestDatePicker {
  /**
   * Theme based on which the label is styled.
   */
  @Element() host: HTMLElement;

  @use(Datepicker) this: Datepicker;

  componentWillLoad = this.componentWillLoad.bind(this);
  
  @Method()
  async testShowSingleDatePicker() {
    this.showDatePicker=true;
    this.mode='single date';
    //this.getDayDetails = this.getDayDetails.bind(this);
    this.getMonthDetails = this.getMonthDetails.bind(this);
    this.host.shadowRoot.querySelector('fw-datepicker').shadowRoot.querySelector('fw-popover').show();
  }

  render() {
    return (
        <fw-datepicker value="2021-12-02" display-format="DD-MM-YYYY"></fw-datepicker>
    );
  }
}
