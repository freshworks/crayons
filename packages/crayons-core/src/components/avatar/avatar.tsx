import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-avatar',
  styleUrl: 'avatar.scss',
  shadow: true,
})
export class Avatar {
  @Prop() image: string;
  @Prop() alt: string;
  @Prop() initials: string;
  @Prop() shape: 'circle' | 'square' | 'rounded' = 'circle';
  @Prop() size: 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall' =
    'large';
  @Prop() mode: 'dark' | 'light' = 'dark';

  render() {
    return (
      <div
        class={`avatar 
     avatar--${this.shape}
     avatar--${this.size}
     avatar--${this.mode}
     `}
        aria-label={this.alt}
      >
        {this.image ? (
          <img
            part='image'
            class='avatar__image'
            src={this.image}
            alt={this.alt}
          ></img>
        ) : (
          <div part='initials' class='avatar__initials'>
            {this.initials}
          </div>
        )}
      </div>
    );
  }
}
