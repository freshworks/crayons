import { Component, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'fw-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class Toggle {

  /**
   * Specifies whether the input control is turned on in the default state. If the attribute’s value is undefined, the value is set to true.
   */
  @Prop() state = false;

  /**
   * Size of the input control.
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';

  /**
   * Specifies whether to disable the control on the interface. If the attribute’s value is undefined, the value is set to true.
   */
  @Prop() disabled = false;

  /**
   * Triggered when the state of the component changes.
   */
  @Event() fwChange: EventEmitter;

  @Watch('state')
  watchHandler(newValue: boolean) {
    this.fwChange.emit({ state: newValue });
  }

  private toggle() {
    this.state = !this.state;
    this.fwChange.emit({ state: this.state });
  }

  render() {
    return (
      <div class={{
        'toggle-switch': true,
        [this.size]: true,
      }} onClick={() => this.toggle()}>
        <input
          name={this.name}
          type="checkbox"
          disabled={this.disabled}
          checked={this.state}
          class="checkboxClass" />
        <span class={{
          'slider': true,
          [this.size]: true,
        }}></span>
      </div>
    );
  }
}
