import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'fw-skeleton',
  styleUrl: 'skeleton.scss',
  shadow: true,
})
export class Skeleton {
  /** Effect the skeleton will use. */
  @Prop()
  effect: 'pulse' | 'progress' | 'progress-dark' | 'sheen' | 'false' = 'pulse';

  /**
   * Variant of the skeleton - circle or row or text
   */
  @Prop()
  variant: 'circle' | 'rect' | 'text' = 'text';

  /**
   * Width of the skeleton ex. 100px, 100%, auto etc.
   */
  @Prop()
  width: string = null;

  /**
   * Height of the skeleton ex. 100px, 100%, auto etc.
   */
  @Prop()
  height: string = null;

  /**
   * MarginBottom of the skeleton ex. 10px, 0 etc.
   */
  @Prop()
  marginBottom: string = null;

  /**
   * Custom css styles (background/margins/width/height etc.)
   *
   * @type {({[k: string]: string} | string)}
   */
  @Prop() customStyles: { [key: string]: string } | string = {};

  componentWillLoad(): void {
    this.init();
  }

  componentWillUpdate(): void {
    this.init();
  }

  init(): void {
    if (this.customStyles && typeof this.customStyles === 'string') {
      try {
        this.customStyles = JSON.parse(this.customStyles);
      } catch (error) {
        console.warn(`can't parse styles`, this.customStyles);
      }
    }
  }

  get style(): any {
    const dimensionsStyles: {
      width?: string;
      height?: string;
      marginBottom?: string;
    } = {
      width: null,
      height: null,
      marginBottom: null,
    };

    if (this.width) {
      dimensionsStyles.width = this.width;
    }

    if (this.height) {
      dimensionsStyles.height = this.height;
    }

    if (this.marginBottom) {
      dimensionsStyles.marginBottom = this.marginBottom;
    }
    const styles =
      typeof this.customStyles === 'object' ? this.customStyles : {};
    console.log(styles);
    return { ...dimensionsStyles, ...styles };
  }

  render(): JSX.Element {
    return (
      <Host>
        <span
          part='base'
          class={{
            'circle': this.variant === 'circle',
            'rect': this.variant === 'rect',
            'skeleton': true,
            'progress': this.effect === 'progress',
            'progress-dark': this.effect === 'progress-dark',
            'pulse': this.effect === 'pulse',
            'sheen': this.effect === 'sheen',
          }}
          aria-busy='true'
          aria-live='polite'
          style={this.style}
        ></span>
      </Host>
    );
  }
}
