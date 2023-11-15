/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Component,
  Element,
  Prop,
  h,
  Host,
  EventEmitter,
  Event,
} from '@stencil/core';
import { hasCustomProperty, i18nText } from '../utils/form-builder-utils';

@Component({
  tag: 'fw-fb-field-dropdown-item',
  styleUrl: 'fb-field-dropdown-item.scss',
  shadow: true,
})
export class FbFieldDropdownItem {
  @Element() host!: HTMLElement;

  private divBaseElement: HTMLElement;

  /**
   * flag to notify if an api call is in progress
   */
  @Prop({ mutable: true }) isLoading = false;
  /**
   * variable to store the data source
   */
  @Prop({ mutable: true }) dataProvider = null;
  /**
   * variable to determine if the element is sortable
   */
  @Prop({ mutable: true }) sortable = true;
  /**
   * property to show the errors on click of the save/add button from the parent
   */
  @Prop({ mutable: true }) showErrors = false;
  /**
   * Disables all the options which can't be edited, reordered or deleted if set to true.
   */
  @Prop() disabled = false;
  /**
   * property to determine if this is a new choice or an existing choice
   */
  @Prop() isNewChoice = false;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;

  @Prop() isDependentField = false;

  @Prop() itemSelected = false;
  /**
   * Triggered on delete button click
   */
  @Event() fwDelete!: EventEmitter;
  /**
   * Triggered on choice input blur
   */
  @Event() fwChange!: EventEmitter;
  /**
   * Triggered on choice selection
   */
  @Event() fwSelect!: EventEmitter;

  /**
   * function called on reorder button mousedown to enable the parent as draggable
   */
  private startParentDragging = () => {
    if (!this.sortable || this.disabled) {
      return;
    }
    this.enableParentDrag(true);
  };

  /**
   * function to disable the parent as draggable
   */
  private stopParentDragging = () => {
    this.enableParentDrag(false);
  };

  /**
   * function to enable/disable the draggable property for the base div
   */
  private enableParentDrag = (value: boolean) => {
    if (this.divBaseElement) {
      if (value) {
        if (this.disabled) {
          return;
        }
        this.divBaseElement.setAttribute('draggable', 'true');
        this.host.setAttribute('draggable', 'true');
      } else {
        this.divBaseElement.removeAttribute('draggable');
        this.host.removeAttribute('draggable');
      }
    }
  };

  private performLabelChange = (event: CustomEvent, isBlur = false) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    const strUpdatedValue = !isBlur
      ? event?.detail?.value || ''
      : event?.target?.['value']?.trim() || '';

    if (
      !strUpdatedValue ||
      strUpdatedValue.length === 0 ||
      strUpdatedValue !== this.dataProvider.value
    ) {
      this.fwChange.emit({ index: this.index, value: strUpdatedValue });
    }
  };

  private nameBlurHandler = (event: CustomEvent) => {
    this.performLabelChange(event, true);
  };

  private nameChangeHandler = (event: CustomEvent) => {
    this.performLabelChange(event, false);
  };

  private deleteButtonClickHandler = (event: MouseEvent) => {
    if (this.disabled) {
      return;
    }
    if (event.detail && event.detail > 1) {
      return;
    }
    this.fwDelete.emit({ index: this.index, isNewChoice: this.isNewChoice });
  };

  /**
   * function to convert the number to its ordinal number for the place holder options - eg: 1 - 1st, 2- 2nd
   */
  private toOrdinalSuffix = (numSource) => {
    const int = parseInt(numSource),
      digits = [int % 10, int % 100],
      ordinals = ['st', 'nd', 'rd', 'th'],
      oPattern = [1, 2, 3, 4],
      tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
    return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
      ? int + ordinals[digits[0] - 1]
      : int + ordinals[3];
  };

  private nameFocusHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    this.fwSelect.emit({
      index: this.index,
      id: this.dataProvider.id,
    });
  };

  render() {
    const dpSource = this.dataProvider;
    if (!dpSource) {
      return null;
    }

    const strErrorMsg = hasCustomProperty(dpSource, 'error')
      ? dpSource.error
      : '';
    let showFieldNameError =
      this.showErrors && strErrorMsg && strErrorMsg !== '' ? true : false;
    // condition to display duplicate errors on input blur and show the empty messages on parent save click
    if (strErrorMsg === i18nText('errors.duplicate')) {
      showFieldNameError = true;
    }

    const strBaseClassName = 'fb-field-dropdown-item';
    const strInputPrompt = `${this.toOrdinalSuffix(
      this.index + 1
    ).toString()} ${i18nText('choicePlaceholderSuffix')}`;

    const strBaseDeleteClassName = `${strBaseClassName}-delete-container`;
    const strBaseDragClassName = `${strBaseClassName}-drag-container`;
    let strDeleteClassName = strBaseDeleteClassName;
    let strDragClassName = strBaseDragClassName;
    if (this.disabled) {
      strDragClassName += ` ${strBaseDragClassName}--disabled`;
      strDeleteClassName += ` ${strBaseDeleteClassName}--disabled`;
    } else if (!this.sortable) {
      strDragClassName += ` ${strBaseDragClassName}--unsortable`;
    }

    const itemSelectedClass =
      this.isDependentField && this.itemSelected
        ? 'dropdown-item-selected'
        : '';

    const dropdownItemClass = this.isDependentField
      ? `${strBaseClassName} fb-field-dependent-dropdown-item ${itemSelectedClass}`
      : strBaseClassName;

    return (
      <Host tabIndex='-1'>
        <div
          class={dropdownItemClass}
          ref={(el) => (this.divBaseElement = el)}
          onDragEnd={this.stopParentDragging}
          onDrop={this.stopParentDragging}
        >
          <div
            role='none'
            class={strDragClassName}
            onMouseDown={this.startParentDragging}
          >
            <fw-icon size={14} name='drag' color='#475867' />
          </div>
          <div class={`${strBaseClassName}-input-container`}>
            <fw-input
              class={`${strBaseClassName}-content-required-input`}
              state={showFieldNameError ? 'error' : 'normal'}
              errorText={strErrorMsg}
              placeholder={strInputPrompt}
              value={dpSource.value}
              disabled={this.disabled}
              onFwBlur={this.nameBlurHandler}
              onFwInput={this.nameChangeHandler}
              onFwFocus={this.nameFocusHandler}
            ></fw-input>
          </div>
          <span
            class={strDeleteClassName}
            onClick={this.deleteButtonClickHandler}
          >
            <fw-icon name='delete' size={14}></fw-icon>
          </span>
        </div>
      </Host>
    );
  }
}
