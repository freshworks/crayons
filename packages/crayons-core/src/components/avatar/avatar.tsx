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
  @Prop() name = '';
  @Prop() size:
    | 'xxlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'xxsmall' = 'large';
  @Prop() mode: 'dark' | 'light' = 'dark';

  /**
   * Function to get the initials to display inside the avatar
   * @returns initials from either initials prop or from name prop
   */
  getInitials() {
    let initials = '';
    if (this.initials) {
      initials = this.initials;
    } else if (this.name.trim().length > 0) {
      const nameParts = this.name.trim().split(' ');
      if (nameParts.length === 1) {
        initials = nameParts.shift().charAt(0);
      } else if (nameParts.length > 1) {
        initials = nameParts.shift().charAt(0) + nameParts.pop().charAt(0);
      }
    }
    return initials;
  }

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
            {this.getInitials()}
          </div>
        )}
      </div>
    );
  }
}
