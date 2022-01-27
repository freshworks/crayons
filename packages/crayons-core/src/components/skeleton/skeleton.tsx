import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'fw-skeleton',
  styleUrl: 'skeleton.scss',
  shadow: true,
})
export class Skeleton {
  /** Effect the skeleton will use. */
  @Prop()
  effect: 'pulse' | 'sheen' | 'none' = 'pulse';

  /**
   * Variant of the skeleton - circle or rectangle or text
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
   * Number of rows of current skeleton type
   */
  @Prop()
  count = 1;

  /**
   * Custom css styles (background/margins/width/height etc.)
   *
   * @type {({[k: string]: string} | string)}
   */
  @Prop() customStyles: { [key: string]: string } | string = {};

  items: number[] = [];

  componentWillLoad(): void {
    this.init();
  }

  componentWillUpdate(): void {
    this.init();
  }

  init(): void {
    this.items.length = this.count;
    this.items.fill(1);
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

    return { ...dimensionsStyles, ...styles };
  }

  render(): JSX.Element | JSX.Element[] {
    return (
      <Host>
        {this.items.map((_, index) => {
          return (
            <div
              part='base'
              key={index}
              class={{
                circle: this.variant === 'circle',
                rect: this.variant === 'rect',
                skeleton: true,
                pulse: this.effect === 'pulse',
                sheen: this.effect === 'sheen',
                only: this.count === 1,
              }}
              aria-busy='true'
              aria-live='polite'
              style={this.style}
            ></div>
          );
        })}
      </Host>
    );
  }
}
