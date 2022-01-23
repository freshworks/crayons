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

import {
  DataTableColumn,
  DataTableRow,
  DataTableAction,
} from '../../utils/types';

const PREDEFINED_VARIANTS_META = {
  anchor: {
    componentName: 'fw-custom-cell-anchor',
    isFocusable: true,
  },
  user: {
    componentName: 'fw-custom-cell-user',
    isFocusable: false,
    skipTextAlign: true,
  },
  icon: {
    componentName: 'fw-custom-cell-icon',
    isFocusable: false,
  },
};

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
   * To enable bulk actions on the table.
   */
  @Prop({ mutable: false }) rowActions: DataTableAction[] = [];

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
   * To disable table during async operations
   */
  @State() isLoading = false;

  /**
   * Collection of rows loading
   */
  @State() rowsLoading = {};

  /**
   * fwSelectionChange Emits this event when row is selected/unselected.
   */
  @Event() fwSelectionChange: EventEmitter;

  /**
   * fwSelectAllChange Emits this event when select all is checked.
   */
  @Event() fwSelectAllChange: EventEmitter;

  /**
   * fwColumnsPositionChange Emits this event when columns position changes.
   */
  @Event() fwColumnsPositionChange: EventEmitter;

  /**
   * Private
   * To perform actions after a render
   * WorkAround for stencil wait for next render
   * https://github.com/ionic-team/stencil/issues/2744
   */
  renderPromiseResolve = null;

  /**
   * componentWillLoad lifecycle event
   */
  componentWillLoad() {
    this.columnOrdering(this.columns);
  }

  /**
   * componentDidRender lifecycle event
   */
  componentDidRender() {
    if (this.renderPromiseResolve) {
      this.renderPromiseResolve();
    }
  }

  /**
   * fwChangeHandler
   */
  @Listen('fwChange')
  fwChangeHandler(event) {
    if (event.detail) {
      if (
        event.detail.value === 'select-all' &&
        this.getEventPath(event)[0].id === 'select-all'
      ) {
        this.selectAllRows(event.detail.checked);
      } else {
        this.selectRow(event.detail.value, event.detail.checked);
      }
    }
  }

  /**
   * keyDownHandler
   * @param event
   */
  @Listen('keydown')
  keyDownHandler(event) {
    const currentElement: HTMLElement = this.getEventPath(event)[0];
    const currentCell: HTMLElement = this.closestTableCell(
      this.getEventPath(event)
    );
    let cellFocusChange = false;

    // Switch focus between components inside a cell
    if (currentElement !== currentCell) {
      let nextFocusElement = null;
      switch (event.code) {
        case 'ArrowRight':
          if (currentElement.nextElementSibling) {
            nextFocusElement = currentElement.nextElementSibling as any;
          } else {
            cellFocusChange = true;
          }
          break;
        case 'ArrowLeft':
          if (currentElement.previousElementSibling) {
            nextFocusElement = currentElement.previousElementSibling as any;
          } else {
            cellFocusChange = true;
          }
          break;
        default:
          cellFocusChange = true;
          break;
      }
      if (nextFocusElement) {
        nextFocusElement.setAttribute('tabIndex', '0');
        nextFocusElement.focus();
      }
    } else {
      cellFocusChange = true;
    }

    // Switch focus between cells
    if (cellFocusChange && currentCell) {
      let currentRowIndex: number =
        +currentCell.parentElement.getAttribute('aria-rowIndex');
      let currentColIndex: number = +currentCell.getAttribute('aria-colIndex');
      let nextRowIndex: number;
      let nextColIndex: number;
      let columnLength: number = this.orderedColumns.length;
      columnLength = this.isSelectable ? columnLength + 1 : columnLength;
      columnLength = this.rowActions.length ? columnLength + 1 : columnLength;
      switch (event.code) {
        case 'ArrowDown':
          nextRowIndex = currentRowIndex + 1;
          nextColIndex = currentColIndex;
          break;
        case 'ArrowUp':
          nextRowIndex = currentRowIndex - 1;
          nextColIndex = currentColIndex;
          break;
        case 'ArrowRight':
          {
            const getNextCellIndex = (currentRowIndex, currentColIndex) => {
              if (currentColIndex !== columnLength) {
                nextRowIndex = currentRowIndex;
                nextColIndex = currentColIndex + 1;
              } else {
                nextRowIndex = currentRowIndex + 1;
                nextColIndex = 1;
              }
              return { nextRowIndex, nextColIndex };
            };
            let currentColumnHidden = false;
            do {
              const nextCellIndex = getNextCellIndex(
                currentRowIndex,
                currentColIndex
              );
              const currentColumn =
                event.currentTarget.shadowRoot.querySelector(
                  `th[aria-colIndex="${nextColIndex}"]`
                );
              currentColumnHidden = currentColumn.classList.contains('hidden');
              if (currentColumnHidden) {
                currentRowIndex = nextCellIndex.nextRowIndex;
                currentColIndex = nextCellIndex.nextColIndex;
              } else {
                nextRowIndex = nextCellIndex.nextRowIndex;
                nextColIndex = nextCellIndex.nextColIndex;
              }
            } while (currentColumnHidden); // Loop till next visible column
          }
          break;
        case 'ArrowLeft':
          {
            const getPreviousCellIndex = (currentRowIndex, currentColIndex) => {
              if (currentColIndex !== 1) {
                nextRowIndex = currentRowIndex;
                nextColIndex = currentColIndex - 1;
              } else {
                nextRowIndex = currentRowIndex - 1;
                nextColIndex = columnLength;
              }
              return { nextRowIndex, nextColIndex };
            };
            let currentColumnHidden = false;
            do {
              const previousCellIndex = getPreviousCellIndex(
                currentRowIndex,
                currentColIndex
              );
              const currentColumn =
                event.currentTarget.shadowRoot.querySelector(
                  `th[aria-colIndex="${nextColIndex}"]`
                );
              currentColumnHidden = currentColumn.classList.contains('hidden');
              if (currentColumnHidden) {
                currentRowIndex = previousCellIndex.nextRowIndex;
                currentColIndex = previousCellIndex.nextColIndex;
              } else {
                nextRowIndex = previousCellIndex.nextRowIndex;
                nextColIndex = previousCellIndex.nextColIndex;
              }
            } while (currentColumnHidden); // Loop till next visible column
          }
          break;
        default:
          break;
      }
      const nextCell = event.currentTarget.shadowRoot.querySelector(
        `[aria-rowIndex="${nextRowIndex}"] > [aria-colIndex="${nextColIndex}"]`
      );
      if (nextCell) {
        this.removeFocusCell(currentCell);
        this.focusCell(nextCell, event.code);
      }
    }
  }

  /**
   * columnsChangeHandler
   * @param newColumns recent datatable columns value
   */
  @Watch('columns')
  columnsChangeHandler(newColumns: DataTableColumn[]) {
    this.columnOrdering(newColumns);
  }

  /**
   * Private
   * selectRow
   * @param rowId Id of row to select/unselect in the table
   * @param checked option to select/unselct
   * @returns currently selected rows
   */
  selectRow(rowId: string, checked = true) {
    if (checked) {
      if (this.selected.indexOf(rowId) < 0) {
        this.selected = [...this.selected, rowId];
      }
    } else {
      const selected = this.selected.filter((selected) => selected !== rowId);
      this.selected = [...selected];
    }
    this.fwSelectionChange.emit({
      rowId: rowId,
      checked: checked,
      selected: this.selected,
    });
    return this.selected;
  }

  /**
   * selectAllRows method we can use to select/unselect rows in the table
   * @param checked denotes if we want to check or uncheck the rows
   */
  @Method()
  async selectAllRows(checked = true) {
    if (checked === true) {
      let selectedRowCount = 0;
      const newlySelected = this.rows
        .filter((row: DataTableRow) => !this.selected.includes(row.id))
        .map((filteredRow) => {
          selectedRowCount = selectedRowCount + 1;
          return filteredRow.id;
        });
      this.selected = [...this.selected, ...newlySelected];
    } else {
      this.selected = [];
    }
    this.fwSelectAllChange.emit({
      checked: checked,
      selected: this.selected,
    });
    return this.selected;
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
   * getColumnConfig
   * @returns columnConfig object
   */
  @Method()
  async getColumnConfig() {
    const columnConfig = {};
    this.orderedColumns.map((column) => {
      columnConfig[column.key] = { position: column.position };
    });
    return columnConfig;
  }

  /**
   * loadTable - Method to call when we want to change table loading state
   * @param state to load table or not
   * @returns isLoading current state
   */
  @Method()
  async loadTable(state: boolean) {
    this.isLoading = state;
    return this.isLoading;
  }

  /**
   * get event's path which is an array of the objects
   * event.path unsupported in safari
   */
  getEventPath(event) {
    return event.path ? event.path : event.composedPath();
  }

  /**
   * WorkAround for wait until next render in stenciljs
   * https://github.com/ionic-team/stencil/issues/2744
   */
  waitForNextRender() {
    return new Promise((resolve) => (this.renderPromiseResolve = resolve));
  }

  /**
   * Function to call when removing the focus of a table cell
   * @param cell table cell
   */
  removeFocusCell(cell: HTMLElement) {
    cell.setAttribute('tabIndex', '-1');
  }

  /**
   * Function to call when focusing a table cell
   * @param cell table cell
   * @param direction key direction when focus comes into cell
   */
  focusCell(cell: HTMLElement, direction = 'ArrowRight') {
    if (
      cell.dataset.hasFocusableChild &&
      cell.dataset.hasFocusableChild === 'true'
    ) {
      cell.removeAttribute('tabIndex');
      let childElement = null;
      switch (direction) {
        case 'ArrowLeft':
          childElement = cell.children[cell.children.length - 1];
          break;
        default:
          childElement = cell.children[0];
          break;
      }
      childElement.setAttribute('tabIndex', '0');
      childElement.focus();
    } else {
      cell.setAttribute('tabIndex', '0');
      cell.focus();
    }
  }

  /**
   * hasFocusableComponent - determines if a cell has focusable component
   * @param column column information
   * @returns {boolean} hasFocusableComponent
   */
  hasFocusableComponent(column: DataTableColumn) {
    let hasFocusableComponent = false;
    if (column.hasFocusableComponent) {
      hasFocusableComponent = true;
    } else if (
      column.variant &&
      PREDEFINED_VARIANTS_META[column.variant].isFocusable
    ) {
      hasFocusableComponent = true;
    }
    return hasFocusableComponent;
  }

  /**
   * private
   * closestTableCell Find the closest table cell from the path of the event
   * @param eventPath Event path from the emitted event
   * @returns closest table cell
   */
  closestTableCell(eventPath: any) {
    let closestCell: any;
    for (let i = 0; i < eventPath.length; i++) {
      const element = eventPath[i];
      if (element.nodeName === 'TD') {
        closestCell = element;
        break;
      }
    }
    return closestCell;
  }

  /**
   * columnOrdering Sorting columns based on position to show columns in the right order visually.
   * @param columns
   */
  columnOrdering(columns: DataTableColumn[]) {
    this.orderedColumns = columns.sort((column1, column2) => {
      let result = 0;
      if (column1.position && column2.position) {
        result = column1.position - column2.position;
      } else if (column1.position && !column2.position) {
        result = -1;
      } else if (!column1.position && column1.position) {
        result = 1;
      }
      return result;
    });
    const positionChangedColumns = [];
    // To add correct position to ordered columns array
    this.orderedColumns.map((column, index) => {
      if (column.position !== index + 1) {
        positionChangedColumns.push({
          key: column.key,
          oldPosition: column.position,
          newPosition: index + 1,
        });
      }
      column.position = index + 1;
    });
    // Emit column change event
    if (positionChangedColumns.length) {
      this.fwColumnsPositionChange.emit(positionChangedColumns);
    }
  }

  /**
   * getShimmerHeight from one of the table's cell
   * @param tableCell one of the table cell
   * @returns {string} shimmer height
   */
  getShimmerHeight(tableCell) {
    const tableRow = tableCell.parentNode;
    const tableHeight = parseFloat(window.getComputedStyle(tableRow).height);
    const tablCellTopPadding = parseFloat(
      window.getComputedStyle(tableCell).paddingTop
    );
    const tableCellBottomPadding = parseFloat(
      window.getComputedStyle(tableCell).paddingBottom
    );
    return tableHeight - tablCellTopPadding - tableCellBottomPadding + 'px';
  }

  /**
   * performRowAction
   * @param event UI event
   * @param action action object - has information related to the action to be performed
   * @param rowData rowData - complete data of the current row
   */
  async performRowAction(
    event: any,
    action: DataTableAction,
    rowData: DataTableRow
  ) {
    const tableRow = this.closestTableCell(this.getEventPath(event)).parentNode;
    const tableRowHeight = window.getComputedStyle(tableRow).height;
    tableRow.style.height = tableRowHeight;
    const skeletonHeight = this.getShimmerHeight(
      this.closestTableCell(this.getEventPath(event))
    );
    const selectAll: any = this.el.shadowRoot.querySelector(
      'fw-checkbox#select-all'
    );
    if (selectAll) {
      selectAll.disabled = true;
    }
    this.rowsLoading = { ...this.rowsLoading, [rowData.id]: skeletonHeight };
    try {
      await action.handler(rowData);
    } catch (error) {
      console.log(error.message);
    }
    delete this.rowsLoading[rowData.id];
    this.rowsLoading = { ...this.rowsLoading };
    if (selectAll && Object.keys(this.rowsLoading).length === 0) {
      selectAll.disabled = false;
    }
    await this.waitForNextRender(); // To avoid UI jitter when shimmer disappears.
    tableRow.style.height = 'auto';
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
    if (PREDEFINED_VARIANTS_META[columnVariant]) {
      template = this.renderWebComponent(
        PREDEFINED_VARIANTS_META[columnVariant].componentName,
        cellValue
      );
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
      template = column.formatData ? column.formatData(cellValue) : cellValue;
    }
    return template;
  }

  /**
   * private
   * @returns {JSX.Element} table header row
   */
  renderTableHeader() {
    const selectAllChecked = this.rows
      .map((row) => row.id)
      .every((rowId) => this.selected.includes(rowId));
    return this.orderedColumns.length ? (
      <tr role='row'>
        {this.orderedColumns.length && this.isSelectable && (
          <th key='isSelectable' aria-colindex={1} style={{ width: '42px' }}>
            {this.isAllSelectable && (
              <fw-checkbox
                id='select-all'
                value={'select-all'}
                checked={selectAllChecked}
              ></fw-checkbox>
            )}
          </th>
        )}
        {this.orderedColumns.map((column, columnIndex) => {
          let textAlign = null;
          if (
            column.textAlign &&
            !(
              column.variant &&
              PREDEFINED_VARIANTS_META[column.variant].skipTextAlign
            )
          ) {
            textAlign = column.textAlign;
          }
          const headerStyles = Object.assign(
            {},
            column.widthProperties ? column.widthProperties : {},
            textAlign ? { textAlign } : {}
          );
          return (
            <th
              role='columnheader'
              key={column.key}
              aria-colindex={
                this.isSelectable ? columnIndex + 2 : columnIndex + 1
              }
              class={{ hidden: column.hide }}
              style={headerStyles}
            >
              {column.text}
            </th>
          );
        })}
        {this.rowActions.length !== 0 && (
          <th
            class='row-actions'
            role='columnheader'
            aria-colindex={
              this.isSelectable
                ? this.orderedColumns.length + 2
                : this.orderedColumns.length + 1
            }
          >
            Actions
          </th>
        )}
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
          <tr
            role='row'
            class={{ active: this.selected.includes(row.id) }}
            aria-rowindex={rowIndex + 1}
          >
            {this.orderedColumns.length && this.isSelectable && (
              <td
                class='data-table-checkbox'
                aria-colindex={1}
                data-has-focusable-child='true'
              >
                {!this.rowsLoading[row.id] ? (
                  <fw-checkbox
                    value={row.id ? row.id : ''}
                    checked={this.selected.includes(row.id)}
                  ></fw-checkbox>
                ) : (
                  <fw-skeleton
                    style={{ '--skeleton-margin-bottom': '0px' }}
                    height={this.rowsLoading[row.id]}
                    variant='rect'
                  ></fw-skeleton>
                )}
              </td>
            )}
            {this.orderedColumns.map((orderedColumn, columnIndex) => {
              const attrs: any = {};
              const isFocusable = this.hasFocusableComponent(orderedColumn)
                ? true
                : false;
              if (!isFocusable) {
                attrs.tabindex =
                  !this.isSelectable && rowIndex === 0 && columnIndex === 0
                    ? '0'
                    : '-2';
              }
              attrs['aria-colindex'] = this.isSelectable
                ? columnIndex + 2
                : columnIndex + 1;
              attrs['data-has-focusable-child'] = isFocusable
                ? 'true'
                : 'false';
              let textAlign = null;
              if (
                orderedColumn.textAlign &&
                !(
                  orderedColumn.variant &&
                  PREDEFINED_VARIANTS_META[orderedColumn.variant].skipTextAlign
                )
              ) {
                textAlign = orderedColumn.textAlign;
              }
              const cellStyle: any = Object.assign(
                {},
                textAlign ? { textAlign } : {}
              );
              return (
                <td
                  role='gridcell'
                  class={{ hidden: orderedColumn.hide }}
                  style={cellStyle}
                  {...attrs}
                >
                  {!this.rowsLoading[row.id] ? (
                    this.renderTableCell(orderedColumn, row[orderedColumn.key])
                  ) : (
                    <fw-skeleton
                      style={{ '--skeleton-margin-bottom': '0px' }}
                      height={this.rowsLoading[row.id]}
                      variant='rect'
                    ></fw-skeleton>
                  )}
                </td>
              );
            })}
            {this.rowActions.length !== 0 && (
              <td
                class='row-actions'
                data-has-focusable-child='true'
                aria-colindex={
                  this.isSelectable
                    ? this.orderedColumns.length + 2
                    : this.orderedColumns.length + 1
                }
              >
                {!this.rowsLoading[row.id] ? (
                  this.rowActions.map((action: DataTableAction) => {
                    let actionTemplate = null;
                    if (
                      !action.hideForRowIds ||
                      (action.hideForRowIds &&
                        !action.hideForRowIds.includes(row.id))
                    ) {
                      const buttonSize: 'icon-small' | 'small' = action.iconName
                        ? 'icon-small'
                        : 'small';
                      actionTemplate = (
                        <fw-button
                          size={buttonSize}
                          color='secondary'
                          onKeyUp={(event) =>
                            (event.code === 'Space' ||
                              event.code === 'Enter') &&
                            this.performRowAction(event, action, row)
                          }
                          onClick={(event) =>
                            this.performRowAction(event, action, row)
                          }
                          title={action.name}
                          aria-label={action.name}
                        >
                          {action.iconName ? (
                            <fw-icon
                              name={action.iconName}
                              library={
                                action.iconLibrary
                                  ? action.iconLibrary
                                  : 'crayons'
                              }
                              size={10}
                            ></fw-icon>
                          ) : (
                            action.name
                          )}
                        </fw-button>
                      );
                    }
                    return actionTemplate;
                  })
                ) : (
                  <fw-skeleton
                    style={{ '--skeleton-margin-bottom': '0px' }}
                    height={this.rowsLoading[row.id]}
                    variant='rect'
                  ></fw-skeleton>
                )}
              </td>
            )}
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
          class={{ 'fw-data-table': true, 'is-selectable': this.isSelectable }}
          role='grid'
          aria-colcount={this.orderedColumns.length}
          aria-label={this.label}
        >
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
        {this.isLoading && <div class='fw-data-table--loading'></div>}
      </div>
    );
  }
}
