import { Component, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'fw-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class Toggle {
  /**
   * Sets the selected state as the default state. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() checked = false;
  /**
   * Size of the input control.
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Specifies whether to disable the control on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() disabled = false;
  /**
   * Triggered when the input control is selected or deselected.
   */
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
      <div
        class={{
          'toggle-switch': true,
          [this.size]: true,
        }}
        onClick={() => this.toggle()}
      >
        <input
          name={this.name}
          type='checkbox'
          disabled={this.disabled}
          checked={this.checked}
          class='checkboxClass'
        />
        <span
          class={{
            slider: true,
            [this.size]: true,
          }}
        ></span>
      </div>
    );
  }
}
