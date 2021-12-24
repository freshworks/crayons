import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
  Watch,
  h,
  Method,
} from '@stencil/core';

import { DataTableColumn, DataTableRow } from '../../utils/types';

@Component({
  tag: 'fw-data-table',
  styleUrl: 'data-table.scss',
  shadow: true,
})
export class DataTable {
  /**
   * To get access to the host element
   */
  @Element() el: HTMLFwDataTableElement;

  /**
   * Label attribute is not visible on screen. There for accessibility purposes.
   */
  @Prop({ mutable: true, reflect: false }) label = '';

  /**
   * Rows Array of objects to be displayed in the table.
   */
  @Prop({ mutable: true, reflect: false }) rows: DataTableRow[] = [];

  /**
   * Columns Array of objects that provides information regarding the columns in the table.
   */
  @Prop({ mutable: true, reflect: false }) columns: DataTableColumn[] = [];

  /**
   * isSelectable Boolean based on which selectable options appears for rows in the table.
   */
  @Prop() isSelectable = false;

  /**
   * isAllSelectable Booleam based on which select all option appears in the table header
   */
  @Prop() isAllSelectable = false;

  /**
   * orderedColumns Maintains a collection of ordered columns.
   */
  @State() orderedColumns: DataTableColumn[] = [];

  /**
   * selected Array of selected row id.
   */
  @State() selected: string[] = [];

  /**
   * fwSelectionChange Emits this event when row is selected/unselected.
   */
  @Event() fwSelectionChange: EventEmitter;

  /**
   * fwSelectAllChange Emits this event when select all is checked.
   */
  @Event() fwSelectAllChange: EventEmitter;

  /**
   * Private
   * To understand when select all event completes.
   */
  selectAllProgressCount = 0;

  /**
   * componentWillLoad lifecycle event
   */
  componentWillLoad() {
    this.orderedColumns = this.columns.sort((a, b) => {
      return a.orderIndex - b.orderIndex;
    });
  }

  /**
   * fwChangeHandler
   */
  @Listen('fwChange')
  fwChangeHandler(event) {
    if (event.detail) {
      if (
        event.detail.value === 'select-all' &&
        event.path[0].id === 'select-all'
      ) {
        const checkboxSelector = event.detail.checked
          ? 'tr > td:first-child > fw-checkbox:not([checked])'
          : 'tr > td:first-child > fw-checkbox[checked]';
        const checkboxes =
          this.el.shadowRoot.querySelectorAll(checkboxSelector);
        this.selectAllProgressCount = checkboxes.length;
        checkboxes.forEach((checkbox: HTMLFwCheckboxElement) => {
          checkbox.checked = event.detail.checked;
        });
      } else {
        if (event.detail.checked) {
          this.selected.push(event.detail.value);
          event.path[0].closest('tr').classList.add('active');
        } else {
          this.selected.splice(this.selected.indexOf(event.detail.value), 1);
          event.path[0].closest('tr').classList.remove('active');
        }
        if (!this.selectAllProgressCount) {
          this.fwSelectionChange.emit({
            rowId: event.detail.value,
            checked: event.detail.checked,
            selected: this.selected,
          });
        } else {
          this.selectAllProgressCount = this.selectAllProgressCount - 1;
          if (!this.selectAllProgressCount) {
            this.fwSelectAllChange.emit({
              checked: event.detail.checked,
              selected: this.selected,
            });
          }
        }
      }
    }
  }

  /**
   * keyDownHandler
   * @param event
   */
  @Listen('keydown')
  keyDownHandler(event) {
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
   * columnsChangeHandler
   * @param newValue recent datatable columns value
   */
  @Watch('columns')
  columnsChangeHandler(newValue: DataTableColumn[]) {
    this.orderedColumns = newValue.sort((a, b) => {
      return a.orderIndex - b.orderIndex;
    });
  }

  /**
   * getSelectedRows
   * @returns selected rows from the data table
   */
  @Method()
  async getSelectedRows() {
    return this.rows.filter((row) => this.selected.includes(row.id));
  }

  /**
   * getSelectedIds
   * @returns an array of selected row IDs
   */
  @Method()
  async getSelectedIds() {
    return this.selected;
  }

  /**
   * private
   * @returns {JSX.Element} returns jsx for a webcomponent
   */
  renderWebComponent(componentName: string, props: any) {
    let template: JSX.Element;
    if (window.customElements.get(componentName)) {
      const WebComponentTag = `${componentName}`;
      let slotText: JSX.Element;
      if (props.slotText) {
        slotText = props.slotText;
        delete props.slotText;
      }
      template = <WebComponentTag {...props}>{slotText}</WebComponentTag>;
    } else {
      template = null;
    }
    return template;
  }

  /**
   * private
   * @returns {JSX.Element} returns jsx for a custom HTML template
   */
  renderCustomTemplate(
    customTemplate: DataTableColumn['customTemplate'],
    cellValue: any
  ) {
    return customTemplate(h, cellValue);
  }

  /**
   * private
   * @returns {JSX.Element} returns jsx from a predefined set of components
   */
  renderPredefinedVariant(columnVariant: string, cellValue: any) {
    let template: JSX.Element;
    switch (columnVariant) {
      case 'anchor':
        template = this.renderWebComponent('fw-custom-cell-anchor', cellValue);
        break;
      case 'user':
        template = this.renderWebComponent('fw-custom-cell-user', cellValue);
        break;
      default:
        template = null;
        break;
    }
    return template;
  }

  /**
   * private
   * @returns {JSX.Element} table body cell
   */
  renderTableCell(column: DataTableColumn, cellValue: any) {
    let template: JSX.Element;
    if (column.variant) {
      template = this.renderPredefinedVariant(column.variant, cellValue);
    } else if (column.customTemplate) {
      template = this.renderCustomTemplate(column.customTemplate, cellValue);
    } else {
      template = cellValue;
    }
    return template;
  }

  /**
   * private
   * @returns {JSX.Element} table header row
   */
  renderTableHeader() {
    return this.orderedColumns.length ? (
      <tr role='row'>
        {this.orderedColumns.length && this.isSelectable && (
          <th key='isSelectable' aria-colindex={1}>
            {this.isAllSelectable && (
              <fw-checkbox id='select-all' value={'select-all'}></fw-checkbox>
            )}
          </th>
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
    ) : null;
  }

  /**
   * private
   * @returns table body rows
   */
  renderTableBody() {
    return this.orderedColumns.length
      ? this.rows.map((row, rowIndex) => (
          <tr role='row' aria-rowindex={rowIndex + 1}>
            {this.orderedColumns.length && this.isSelectable && (
              <td
                class='data-table-checkbox'
                aria-colindex={1}
                data-has-component='true'
              >
                <fw-checkbox value={row.id ? row.id : ''}></fw-checkbox>
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
                {this.renderTableCell(orderedColumn, row[orderedColumn.key])}
              </td>
            ))}
          </tr>
        ))
      : null;
  }

  /**
   * render method
   */
  render() {
    return (
      <div class='fw-data-table-container'>
        <table
          class='fw-data-table'
          role='grid'
          aria-colcount={this.orderedColumns.length}
          aria-label={this.label}
        >
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </div>
    );
  }
}
