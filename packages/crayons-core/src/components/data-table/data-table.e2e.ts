import { newE2EPage } from '@stencil/core/testing';

describe('fw-data-table', () => {
  let page: any;
  const data: any = {
    rows: [
      {
        id: '1234',
        name: 'Alexander Goodman',
      },
    ],
    columns: [
      {
        key: 'name',
        text: 'Name',
        position: 1,
      },
    ],
  };
  const manyColumnData: any = {
    rows: [
      {
        id: '1234',
        name: 'Alexander Goodman',
        job: 'Lead designer',
      },
    ],
    columns: [
      {
        key: 'name',
        text: 'Name',
      },
      {
        key: 'job',
        text: 'Job',
      },
    ],
  };

  const loadDataIntoGrid = async (gridData: any) => {
    await page.$eval(
      'fw-data-table',
      (elm: any, data: any) => {
        Object.assign(elm, data);
      },
      gridData
    );
  };

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<fw-data-table></fw-data-table>');
    await page.waitForChanges();
  });

  it('renders', async () => {
    const element = await page.find('fw-data-table');
    expect(element).toHaveClass('hydrated');
  });

  it('should render rows when table has data', async () => {
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const row = await page.find('fw-data-table >>> tbody > tr');
    expect(row).toBeTruthy();
  });

  it('should show checkbox when passing isSelectable option', async () => {
    const currentData = { ...data, isSelectable: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const checkbox = await page.find(
      'fw-data-table >>> tbody > tr:first-child > td:first-child > fw-checkbox'
    );
    expect(checkbox).toBeTruthy();
  });

  it('should trigger fwSelectionChange event when checkbox is checked in a row', async () => {
    const currentData = { ...data, isSelectable: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const checkbox = await page.find(
      'fw-data-table >>> tbody > tr:first-child > td:first-child > fw-checkbox'
    );
    const changedEvent = await page.spyOnEvent('fwSelectionChange');
    checkbox.click();
    await page.waitForChanges();
    const selectedRow = await page.find(
      'fw-data-table >>> tbody > tr:first-child.active'
    );
    expect(changedEvent).toHaveReceivedEventTimes(1);
    expect(selectedRow).toBeTruthy();
  });

  it('should show select all option when isAllSelectable prop is set to true', async () => {
    const currentData = { ...data, isSelectable: true, isAllSelectable: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const checkbox = await page.find(
      'fw-data-table >>> thead > tr:first-child > th:first-child > fw-checkbox'
    );
    expect(checkbox).toBeTruthy();
  });

  it('should trigger fwSelectAllChange when select-all checkbox is checked/unchecked', async () => {
    const currentData = { ...data, isSelectable: true, isAllSelectable: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const checkbox = await page.find(
      'fw-data-table >>> thead > tr:first-child > th:first-child > fw-checkbox'
    );
    const changedEvent = await page.spyOnEvent('fwSelectAllChange');
    checkbox.click();
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(1);
  });

  it('should trigger fwSelectAllChange when selectAllRows method is called', async () => {
    const currentData = { ...data, isSelectable: true };
    await loadDataIntoGrid(currentData);
    const changedEvent = await page.spyOnEvent('fwSelectAllChange');
    const dataTable = await page.find('fw-data-table');
    await dataTable.callMethod('selectAllRows');
    await page.waitForChanges();
    expect(changedEvent).toHaveReceivedEventTimes(1);
  });

  it('should render in the right column order', async () => {
    const data = {
      rows: [
        {
          id: '1234',
          name: 'Alexander Goodman',
          job: 'Lead designer',
        },
      ],
      columns: [
        {
          key: 'name',
          text: 'Name',
          position: 2,
        },
        {
          key: 'job',
          text: 'Job',
          position: 1,
        },
      ],
    };
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const firstColumn = await page.find(
      'fw-data-table >>> thead > tr > th:nth-child(1)'
    );
    const secondColumn = await page.find(
      'fw-data-table >>> thead > tr > th:nth-child(2)'
    );
    expect(firstColumn.innerText).toEqual('Job');
    expect(secondColumn.innerText).toEqual('Name');
  });

  it('should render columns in right order even position value is not specified', async () => {
    const data = {
      rows: [
        {
          id: '1234',
          name: 'Alexander Goodman',
          job: 'Lead designer',
        },
      ],
      columns: [
        {
          key: 'name',
          text: 'Name',
        },
        {
          key: 'job',
          text: 'Job',
        },
      ],
    };
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const firstColumn = await page.find(
      'fw-data-table >>> thead > tr > th:nth-child(1)'
    );
    const secondColumn = await page.find(
      'fw-data-table >>> thead > tr > th:nth-child(2)'
    );
    expect(firstColumn.innerText).toEqual('Name');
    expect(secondColumn.innerText).toEqual('Job');
  });

  it('should render predefined components when column has variant name', async () => {
    const data = {
      columns: [
        {
          key: 'search',
          text: 'Search',
          position: 1,
          variant: 'anchor',
        },
        {
          key: 'usedby',
          text: 'Used by',
          position: 2,
          variant: 'user',
        },
        {
          key: 'icon',
          text: 'Icon',
          position: 3,
          variant: 'icon',
        },
        {
          key: 'paragraph',
          text: 'Paragraph',
          position: 4,
          variant: 'paragraph',
        },
      ],
      rows: [
        {
          id: '01',
          search: { text: 'Google', href: 'www.google.com' },
          usedby: {
            name: 'Alexander Goodman',
            email: 'alexander.goodman@freshworks.com',
          },
          icon: { name: 'agent' },
          paragraph: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend mattis mattis. Curabitur accumsan in augue vel mollis. Fusce sagittis tincidunt augue, ut tempus erat condimentum finibus. Aliquam egestas lectus vel ligula egestas, sit amet lacinia nisl dapibus. Curabitur vestibulum nibh vel turpis posuere, a pellentesque magna gravida. Vestibulum imperdiet varius dui a fringilla. Nullam placerat tortor a nulla porta, eget vulputate justo facilisis. Curabitur cursus luctus mauris, ac mollis arcu posuere sit amet. Proin pulvinar blandit lorem, ac tempor purus suscipit id.',
          },
        },
      ],
    };
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const anchorComponent = await page.find(
      'fw-data-table >>> tbody > tr:first-child > td:first-child > fw-custom-cell-anchor'
    );
    const userComponent = await page.find(
      'fw-data-table >>> tbody > tr:first-child > td:nth-child(2) > fw-custom-cell-user'
    );
    const iconComponent = await page.find(
      'fw-data-table >>> tbody > tr:first-child > td:nth-child(3) > fw-custom-cell-icon'
    );
    const paraComponent = await page.find(
      'fw-data-table >>> tbody > tr:first-child > td:nth-child(4) > fw-custom-cell-paragraph'
    );
    expect(anchorComponent).toBeTruthy();
    expect(userComponent).toBeTruthy();
    expect(iconComponent).toBeTruthy();
    expect(paraComponent).toBeTruthy();
  });

  it('should align text in a column when textAlign is passed as a column configuration', async () => {
    const data = {
      columns: [
        {
          key: 'icon',
          text: 'Icon',
          variant: 'icon',
          textAlign: 'center',
        },
      ],
      rows: [
        {
          id: '01',
          icon: { name: 'agent' },
        },
      ],
    };
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const textAlign = await page.evaluate(
      (component, selector) => {
        const cmpEl = document.querySelector(component);
        const headerCell = cmpEl.shadowRoot.querySelector(selector);
        return headerCell.style.textAlign;
      },
      'fw-data-table',
      'td'
    );
    expect(textAlign).toEqual('center');
  });

  it('should display action column when rowActions is passed to datatable', async () => {
    const data = {
      rows: [
        {
          id: '1234',
          name: 'Alexander Goodman',
        },
      ],
      columns: [
        {
          key: 'name',
          text: 'Name',
        },
      ],
      rowActions: [
        {
          name: 'Edit',
          handler: (rowData) => {
            console.log(rowData.name);
          },
        },
      ],
    };
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const actionColumn = await page.find(
      'fw-data-table >>> thead > tr > th:last-child'
    );
    const actionButton = await page.find(
      'fw-data-table >>> tbody > tr > td.row-actions fw-button'
    );
    expect(actionColumn.innerText).toEqual('Actions');
    expect(actionButton).toBeTruthy();
  });

  it('should call the handler when action button is clicked', async () => {
    const myMock = jest.fn();
    const data = {
      rows: [
        {
          id: '1234',
          name: 'Alexander Goodman',
        },
      ],
      columns: [
        {
          key: 'name',
          text: 'Name',
        },
      ],
      rowActions: [
        {
          name: 'Edit',
          handler: (rowData) => {
            console.log(rowData.name);
          },
        },
      ],
    };
    await page.exposeFunction('actionHandler', () => {
      myMock();
    });
    await page.$eval(
      'fw-data-table',
      (elm: any, data: any) => {
        data.rowActions[0].handler = (window as any).actionHandler;
        Object.assign(elm, data);
      },
      data
    );
    await page.waitForChanges();
    const actionButton = await page.find(
      'fw-data-table >>> tbody > tr > td.row-actions fw-button'
    );
    actionButton.click();
    await page.waitForChanges();
    expect(myMock).toHaveBeenCalled();
  });

  it('should hide a column when hide is passed in column configuration', async () => {
    const data = {
      rows: [
        {
          id: '1234',
          name: 'Alexander Goodman',
          job: 'Lead designer',
        },
      ],
      columns: [
        {
          key: 'name',
          text: 'Name',
          hide: true,
        },
        {
          key: 'job',
          text: 'Job',
        },
      ],
    };
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const firstColumn = await page.find(
      'fw-data-table >>> thead > tr > th:first-child'
    );
    expect(firstColumn).toHaveClass('hidden');
  });

  it('should set column width if widthProperties is passed in column configuration', async () => {
    const testColumnWidth = '200px';
    const data = {
      rows: [
        {
          id: '1234',
          name: 'Alexander Goodman',
        },
      ],
      columns: [
        {
          key: 'name',
          text: 'Name',
          widthProperties: {
            width: testColumnWidth,
          },
        },
      ],
    };
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const columnWidth = await page.evaluate(
      (component, selector) => {
        const cmpEl = document.querySelector(component);
        const headerCell = cmpEl.shadowRoot.querySelector(selector);
        return headerCell.style.width;
      },
      'fw-data-table',
      'th:first-child'
    );
    expect(columnWidth).toEqual(testColumnWidth);
  });

  it('should call formatData function when it is passed in column configuration', async () => {
    const data = {
      rows: [
        {
          id: '1234',
          name: 'Alexander Goodman',
          knowledge: ['HTML', 'CSS', 'JS'],
        },
      ],
      columns: [
        {
          key: 'name',
          text: 'Name',
        },
        {
          key: 'knowledge',
          text: 'Knowledge',
        },
      ],
    };
    const formatData = (cellData) => cellData.join(', ');
    const formatDataResult = formatData(data.rows[0].knowledge);
    const myMockFn = jest.fn(formatData);
    await page.exposeFunction('myMockFn', myMockFn);
    await page.$eval(
      'fw-data-table',
      (elm: any, data: any, formatDataResult: string) => {
        data.columns[1].formatData = (cellData) => {
          (window as any).myMockFn(cellData);
          /**
           * Hardcoded result because myMockFn turns async on page.exposeFunction
           * https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pageexposefunctionname-puppeteerfunction
           * but render in JSX expects sync call.
           */
          return formatDataResult;
        };
        Object.assign(elm, data);
      },
      data,
      formatDataResult
    );
    await page.waitForChanges();
    const formattedCell = await page.find(
      'fw-data-table >>> tbody > tr > td:nth-child(2)'
    );
    expect(myMockFn).toHaveBeenCalled();
    expect(myMockFn.mock.results[0].value).toBe(formatDataResult);
    expect(formattedCell.innerText).toEqual(formatDataResult);
  });

  it('should show settings button when showSettings prop is passed', async () => {
    const currentData = { ...data, showSettings: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const settingsButton = await page.find(
      'fw-data-table >>> .table-settings-button'
    );
    expect(settingsButton).toBeTruthy();
  });

  it('should show settings dropdown when settings button is clicked', async () => {
    const currentData = { ...data, showSettings: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const settingsButton = await page.find(
      'fw-data-table >>> .table-settings-button'
    );
    settingsButton.click();
    await page.waitForChanges();
    const settingsContainer = await page.find(
      'fw-data-table >>> .table-settings-options'
    );
    expect(settingsContainer).toHaveClass('show');
  });

  it('should hide column on unselecting a column from table settings', async () => {
    const currentData = { ...manyColumnData, showSettings: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const settingsButton = await page.find(
      'fw-data-table >>> .table-settings-button'
    );
    settingsButton.click();
    await page.waitForChanges();
    const firstCheckbox = await page.find('fw-data-table >>> fw-checkbox');
    const applySettings = await page.find('fw-data-table >>> #apply-settings');
    firstCheckbox.click();
    await page.waitForChanges();
    applySettings.click();
    await page.waitForChanges();
    const columns = await page.findAll('fw-data-table >>> th:not(.hidden)');
    expect(columns.length).toBe(1);
  });

  it('should not be able to hide locked columns', async () => {
    const currentData = { ...manyColumnData, showSettings: true };
    currentData.columns[0].lock = true;
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const settingsButton = await page.find(
      'fw-data-table >>> .table-settings-button'
    );
    settingsButton.click();
    await page.waitForChanges();
    const firstCheckbox = await page.find('fw-data-table >>> fw-checkbox');
    const applySettings = await page.find('fw-data-table >>> #apply-settings');
    firstCheckbox.click();
    await page.waitForChanges();
    applySettings.click();
    await page.waitForChanges();
    const columns = await page.findAll('fw-data-table >>> th:not(.hidden)');
    expect(columns.length).toBe(2);
  });

  it('should display only columns that include text from search box in column list in settings container', async () => {
    const currentData = { ...manyColumnData, showSettings: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const settingsButton = await page.find(
      'fw-data-table >>> .table-settings-button'
    );
    settingsButton.click();
    await page.waitForChanges();
    const settingsInputShadowRoot = await page.find(
      'fw-data-table >>> .table-settings-content-search fw-input >>> :first-child'
    );
    const input = await settingsInputShadowRoot.find('input');
    await input.press('KeyJ');
    await page.waitForChanges();
    const checkboxes = await page.findAll(
      'fw-data-table >>> .table-settings-content-checkboxes fw-checkbox'
    );
    expect(checkboxes.length).toBe(1);
  });

  it('should remove column from choose columns section in settings when drag item is removed in settings', async () => {
    const currentData = { ...manyColumnData, showSettings: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const settingsButton = await page.find(
      'fw-data-table >>> .table-settings-button'
    );
    settingsButton.click();
    await page.waitForChanges();
    const dragClose = await page.find(
      'fw-data-table >>> .table-settings-content-draggable .table-settings-drag-item:first-child .table-settings-drag-item-close'
    );
    dragClose.click();
    await page.waitForChanges();
    const checkboxes = await page.findAll(
      'fw-data-table >>> .table-settings-content-checkboxes fw-checkbox[checked]'
    );
    expect(checkboxes.length).toBe(1);
  });

  it('should disable table on calling loadTable', async () => {
    const currentData = { ...manyColumnData, isSelectable: true };
    await loadDataIntoGrid(currentData);
    await page.waitForChanges();
    const dataTable = await page.find('fw-data-table');
    await dataTable.callMethod('loadTable');
    await page.waitForChanges();
    const checkbox = await page.find(
      'fw-data-table >>> tbody > tr:first-child > td:first-child'
    );
    checkbox.click();
    await page.waitForChanges();
    const selectedRow = await page.find(
      'fw-data-table >>> tbody > tr:first-child.active'
    );
    expect(selectedRow).toBeFalsy();
  });

  it('should show shimmer on initial table load', async () => {
    const data = {
      columns: [
        {
          key: 'name',
          text: 'Name',
        },
      ],
    };
    await loadDataIntoGrid(data);
    await page.waitForChanges();
    const shimmer = await page.find(
      'fw-data-table >>> tbody > tr:first-child > td:first-child > fw-skeleton'
    );
    expect(shimmer).toBeTruthy();
  });
});
