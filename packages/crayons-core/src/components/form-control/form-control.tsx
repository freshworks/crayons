/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, h, Element, State, Method } from '@stencil/core';

import { hasSlot } from '../../utils';

const NATIVE_CONTROLS = ['input', 'select', 'textarea'];
@Component({
  tag: 'fw-form-control',
  styleUrl: 'form-control.scss',
  shadow: true,
})
export class FormControl {
  @Element() el;

  @Prop()
  type:
    | 'TEXT'
    | 'NUMBER'
    | 'DECIMAL'
    | 'DROPDOWN'
    | 'MULTI_SELECT'
    | 'RADIO'
    | 'CHECKBOX'
    | 'DATE'
    | 'PARAGRAPH'
    | 'EMAIL'
    | 'URL'
    | 'TEL'
    | 'TIME' = 'TEXT';
  @Prop({ reflect: true })
  name: any;
  @Prop()
  label: any;
  @Prop()
  required = false;
  @Prop()
  hint = '';
  @Prop()
  placeholder = '';
  @Prop()
  choices: any = [];
  /**
   * Additional props can be passed here for crayons components. Useful when rendering crayons components implicitly via form-control.
   */
  @Prop({ mutable: true })
  fieldProps?: any = {};
  /**
   * Contains value and Event handlers for crayons components. Useful when rendering crayons components implicitly via form-control.
   * Not required when using controls via slots.
   */
  @Prop()
  controlProps?: any;
  @Prop()
  touched = false;
  @Prop()
  error = '';
  private slotElement;
  private crayonsControlRef;

  @State() hasSlot = false;

  renderControl(): JSX.Element {
    if (this.hasSlot) return null;
    if (!this.name) return null;

    let cmp;
    switch (this.type) {
      case 'TEXT':
      case 'NUMBER':
      case 'DECIMAL':
      case 'EMAIL':
      case 'TEL':
      case 'URL': {
        const type =
          this.type === 'DECIMAL' ? 'number' : this.type?.toLowerCase();
        const componentProps = {
          ...this.fieldProps,
          name: this.name,
          placeholder: this.placeholder,
          label: '',
          required: this.required,
          hint: '',
          type: type,
          ...this.controlProps?.inputProps(this.name, type),
          state: this.touched && this.error && 'error',
        };

        cmp = (
          <fw-input
            {...componentProps}
            ref={(el) => (this.crayonsControlRef = el)}
          ></fw-input>
        );
        break;
      }
      case 'PARAGRAPH':
        {
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...this.controlProps?.inputProps(
              this.name,
              this.type?.toLowerCase()
            ),
            state: this.touched && this.error && 'error',
          };
          cmp = (
            <fw-textarea
              {...componentProps}
              ref={(el) => (this.crayonsControlRef = el)}
            ></fw-textarea>
          );
        }
        break;

      case 'DATE':
        {
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...this.controlProps?.inputProps(
              this.name,
              this.type?.toLowerCase()
            ),
            state: this.touched && this.error && 'error',
          };
          cmp = (
            <fw-datepicker
              {...componentProps}
              ref={(el) => (this.crayonsControlRef = el)}
            ></fw-datepicker>
          );
        }
        break;

      case 'CHECKBOX':
        {
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...this.controlProps?.checkboxProps(
              this.name,
              this.type?.toLowerCase()
            ),
            state: this.touched && this.error && 'error',
          };
          cmp = (
            <fw-checkbox
              {...componentProps}
              ref={(el) => (this.crayonsControlRef = el)}
            >
              {this.label}
            </fw-checkbox>
          );
        }
        break;

      case 'RADIO':
        {
          const controlProps = this.controlProps?.radioProps(
            this.name,
            this.type?.toLowerCase()
          );
          const componentProps = {
            ...this.fieldProps,
            'name': this.name,
            'placeholder': this.placeholder,
            'label': '',
            'required': this.required,
            'hint': '',
            'allow-empty': true,
            ...controlProps,
          };
          cmp = (
            <fw-radio-group
              {...componentProps}
              label={this.name}
              ref={(el) => (this.crayonsControlRef = el)}
            >
              {this.choices?.map((ch) => {
                const val = ch[componentProps.optionValuePath] || ch.value;
                const label = ch[componentProps.optionLabelPath] || ch.value;
                return (
                  <fw-radio
                    form-id={controlProps['form-id']}
                    name={this.name}
                    value={val}
                    state={this.touched && this.error ? 'error' : 'normal'}
                  >
                    {label}
                  </fw-radio>
                );
              })}
            </fw-radio-group>
          );
        }
        break;

      case 'DROPDOWN':
      case 'MULTI_SELECT':
        {
          const isRelationshipField = !!this.fieldProps?.search;

          const controlProps = this.controlProps?.selectProps(
            this.name,
            this.type?.toLowerCase()
          );

          let componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            state: this.touched && this.error && 'error',
            multiple: this.type === 'MULTI_SELECT',
          };
          if (!isRelationshipField) {
            componentProps = {
              ...componentProps,
              ...controlProps,
              options: this.choices,
            };
          } else {
            if (
              Array.isArray(controlProps.value) &&
              typeof controlProps.value[0] === 'object' &&
              typeof controlProps.value === 'object'
              // handle multi_select [{}] and single select {} initialValues
            ) {
              componentProps.selectedOptions =
                this.type === 'MULTI_SELECT'
                  ? controlProps.value
                  : [controlProps.value];
            }

            if (componentProps.selectedOptions?.length > 0)
              this.crayonsControlRef?.setSelectedOptions(
                componentProps.selectedOptions
              );
            componentProps.noDataText = 'Start Typing...';

            componentProps['form-id'] = controlProps['form-id'];
          }

          cmp = (
            <fw-select
              {...componentProps}
              ref={(el) => (this.crayonsControlRef = el)}
            ></fw-select>
          );
        }
        break;

      case 'TIME':
        {
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...this.controlProps?.inputProps(
              this.name,
              this.type?.toLowerCase()
            ),
            state: this.touched && this.error && 'error',
          };
          cmp = (
            <fw-timepicker
              {...componentProps}
              ref={(el) => (this.crayonsControlRef = el)}
            ></fw-timepicker>
          );
        }
        break;
    }
    return cmp;
  }

  componentWillLoad(): void {
    this.handleSlotChange();
  }

  /**
   * Set Focus on the child
   */
  @Method()
  async setFocus() {
    if (!this.hasSlot) {
      await this.crayonsControlRef?.setFocus?.();
    } else {
      this.slotElement?.focus?.();
    }
  }

  private handleSlotChange() {
    this.hasSlot = hasSlot(this.el);
    this.slotElement = [...this.el.querySelectorAll('*')].filter((el: any) => {
      return NATIVE_CONTROLS.includes(el?.tagName?.toLowerCase());
    })?.[0];
  }

  render(): JSX.Element {
    return (
      <div class='form-control-container'>
        {this.type !== 'CHECKBOX' && (
          <label
            htmlFor={this.name}
            class={{
              label: true,
              required: this.required,
            }}
          >
            {this.label}
          </label>
        )}
        {this.renderControl()}
        <slot></slot>
        {!(this.touched && this.error) && (
          <div class='hint' id={`hint-${this.name}`}>
            {this.hint}
          </div>
        )}
        {this.touched && this.error && (
          <div class='error' id={`error-${this.name}`}>
            {this.error}
          </div>
        )}
      </div>
    );
  }
}
