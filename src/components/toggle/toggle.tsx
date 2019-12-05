import { Component, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'fw-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class Toggle {

  @Prop() state = false;
  /**
   * The type of control to display. The default type is text.
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name = '';
  /**
   * Is it disabled
   */
  @Prop() disabled = false;

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
