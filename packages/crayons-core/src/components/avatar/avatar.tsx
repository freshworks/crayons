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
  @Prop() mode: 'dark' | 'light' | 'error' = 'dark';

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

  renderAltIcon() {
    const color = this.mode === 'error' ?  '#C82124' : '#283DA5';
    return <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#a)" fill={color}>
      <circle cx={12} cy={9} r={5} />
      <ellipse cx={12} cy={24.5} rx={11} ry={9.5} />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
  }

  render() {
    let strBaseClassName = `avatar 
    avatar--${this.shape}
    avatar--${this.size}
    avatar--${this.mode}
    `;
    if (!this.image && this.initials) {
      strBaseClassName += ` avatar--${this.mode}--initials`;
    } else if (!this.image && !this.initials) {
      strBaseClassName += ` avatar--${this.mode}--default`;
    }

    return (
      <div class={strBaseClassName} aria-label={this.alt}>
        {this.image ? (
          <img
            part='image'
            class='avatar__image'
            src={this.image}
            alt={this.alt}
          ></img>
        ) : this.initials ? (
          <div part='initials' class='avatar__initials'>
            {this.getInitials()}
          </div>
        ) : this.renderAltIcon()
      }
      </div>
    );
  }
}
