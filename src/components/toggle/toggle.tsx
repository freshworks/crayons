import { Component, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'fw-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class Toggle {

  @Prop() checked = false;
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

  @Watch('checked')
  watchHandler(newValue: boolean) {
    this.fwChange.emit({ checked: newValue });
  }

  private toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
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
          checked={this.checked}
          class="checkboxClass" />
        <span class={{
          'slider': true,
          [this.size]: true,
        }}></span>
      </div>
    );
  }
}
