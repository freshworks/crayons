import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-toggle',
  styleUrl: 'toggle.scss',
  shadow: true
})
export class Toggle {
  private toggleInner:HTMLInputElement;  
  private toggle(e: Event){
    console.log("clicked");
    this.toggleInner.checked=!this.toggleInner.checked;
  }

  render() {
    return (
      <div class="toggle-switch" onClick={e => this.toggle(e)}>
        <input
          ref={input => this.toggleInner = input}
          name="valuePath"
          type="checkbox"
          
          checked
          class="checkboxClass"
          data-test-value="hintText"
          data-test-checkbox="labelId"
          data-test-id="testId" />
        <span class="slider"></span>
      </div>
    );
  }
}
