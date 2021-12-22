import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'fw-custom-cell-user',
  styleUrl: 'custom-cell-user.scss',
  shadow: true,
})
export class CustomCellUser {
  @Prop() image = null;

  @Prop() name = '';

  @Prop() email = '';

  render() {
    return (
      <div class='name-box-container'>
        <div class='avatar'>
          <fw-avatar
            size='small'
            image={this.image}
            name={this.name}
            alt='Profile picture'
          ></fw-avatar>
        </div>
        <div class='name-box'>
          <div class='name-box-text'>{this.name}</div>
          <div class='name-box-email'>{this.email}</div>
        </div>
      </div>
    );
  }
}
