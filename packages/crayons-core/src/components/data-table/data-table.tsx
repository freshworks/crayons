import {
  Component,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

import { Column, Row } from './types';

@Component({
  tag: 'fw-data-table',
  styleUrl: 'data-table.scss',
  shadow: true,
})
export class DataGrid {
  /**
   * Label attribute is not visible on screen. There for accessibility purposes.
   */
  @Prop({ mutable: true, reflect: false }) label = '';

  /**
   * Rows Array of objects to be displayed in the table.
   */
  @Prop({ mutable: true, reflect: false }) rows: Row[] = [];

  /**
   * Columns Array of objects that provides information regarding the columns in the table.
   */
  @Prop({ mutable: true, reflect: false }) columns: Column[] = [];

  /**
   * isSelectable Boolean based on which selectable options appears for rows in the table.
   */
  @Prop() isSelectable = false;

  /**
   * orderedColumns Maintains a collection of ordered columns.
   */
  @State() orderedColumns: Column[] = [];

  /**
   * selected Array of selected row id.
   */
  @State() selected: string[] = [];

  /**
   * fwSelectionChange Emits this event when row is selected/unselected.
   */
  @Event() fwSelectionChange: EventEmitter;

  /**
   * fwChangeHandler
   */
  @Listen('fwChange')
  fwChangeHandler(event) {
    if (event.detail) {
      if (event.detail.checked) {
        this.selected.push(event.detail.value);
        event.path[0].closest('tr').classList.add('active');
      } else {
        this.selected.splice(this.selected.indexOf(event.detail.value), 1);
        event.path[0].closest('tr').classList.remove('active');
      }
      this.fwSelectionChange.emit({
        rowId: event.detail.value,
        checked: event.detail.checked,
        selected: this.selected,
      });
    }
  }

  @Listen('keydown')
  handleKeyDown(event) {
    const currentElement: HTMLElement =
      event.path[0].nodeName === 'TD'
        ? event.path[0]
        : event.path[0].closest('td');
    const currentRowIndex: number =
      +currentElement.parentElement.getAttribute('aria-rowIndex');
    const currentColIndex: number =
      +currentElement.getAttribute('aria-colIndex');
    let nextRowIndex: number;
    let nextColIndex: number;
    const columnLength: number = this.isSelectable
      ? this.orderedColumns.length + 1
      : this.orderedColumns.length;
    switch (event.key) {
      case 'ArrowDown':
        nextRowIndex = currentRowIndex + 1;
        nextColIndex = currentColIndex;
        break;
      case 'ArrowUp':
        nextRowIndex = currentRowIndex - 1;
        nextColIndex = currentColIndex;
        break;
      case 'ArrowRight':
        if (currentColIndex !== columnLength) {
          nextRowIndex = currentRowIndex;
          nextColIndex = currentColIndex + 1;
        } else {
          nextRowIndex = currentRowIndex + 1;
          nextColIndex = 1;
        }
        break;
      case 'ArrowLeft':
        if (currentColIndex !== 1) {
          nextRowIndex = currentRowIndex;
          nextColIndex = currentColIndex - 1;
        } else {
          nextRowIndex = currentRowIndex - 1;
          nextColIndex = columnLength;
        }
        break;
      default:
        break;
    }
    const nextCell = event.currentTarget.shadowRoot.querySelector(
      `[aria-rowIndex="${nextRowIndex}"] > [aria-colIndex="${nextColIndex}"]`
    );
    if (nextCell) {
      const nextFocusCell = nextCell.dataset.hasComponent
        ? nextCell.firstChild
        : nextCell;
      currentElement.setAttribute('tabIndex', '-1');
      nextCell.setAttribute('tabIndex', '0');
      nextFocusCell.focus();
    }
  }

  /**
   * connectedCallback
   */
  connectedCallback() {
    this.orderedColumns = this.columns.sort((a, b) => {
      return a.orderIndex - b.orderIndex;
    });
  }

  @Watch('columns')
  onColumnsChanged(newValue: Column[]) {
    this.orderedColumns = newValue.sort((a, b) => {
      return a.orderIndex - b.orderIndex;
    });
  }

  render() {
    return (
      <div class='fw-data-table-container'>
        <table
          class='fw-data-table'
          role='grid'
          aria-colcount={this.orderedColumns.length}
          aria-label={this.label}
        >
          <thead>
            <tr role='row'>
              {this.orderedColumns.length && this.isSelectable && (
                <th key='isSelectable' aria-colindex={1}></th>
              )}
              {this.orderedColumns.map((column, columnIndex) => (
                <th
                  role='columnheader'
                  key={column.key}
                  aria-colindex={
                    this.isSelectable ? columnIndex + 2 : columnIndex + 1
                  }
                >
                  {column.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.rows.map((row, rowIndex) => (
              <tr role='row' aria-rowindex={rowIndex + 1}>
                {this.orderedColumns.length && this.isSelectable && (
                  <td
                    class='data-table-checkbox'
                    aria-colindex={1}
                    data-has-component='true'
                  >
                    <fw-checkbox
                      label=''
                      value={row.id ? row.id : ''}
                    ></fw-checkbox>
                  </td>
                )}
                {this.orderedColumns.map((orderedColumn, columnIndex) => (
                  <td
                    role='gridcell'
                    tabindex={
                      !this.isSelectable && rowIndex === 0 && columnIndex === 0
                        ? '0'
                        : '-1'
                    }
                    aria-colindex={
                      this.isSelectable ? columnIndex + 2 : columnIndex + 1
                    }
                  >
                    {row[orderedColumn.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
