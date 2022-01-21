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

  // it('should trigger fwSelectAllChange when select-all checkbox is checked/unchecked', async () => {
  //   const currentData = { ...data, isSelectable: true, isAllSelectable: true };
  //   await loadDataIntoGrid(currentData);
  //   await page.waitForChanges();
  //   const checkbox = await page.find(
  //     'fw-data-table >>> thead > tr:first-child > th:first-child > fw-checkbox'
  //   );
  //   const changedEvent = await page.spyOnEvent('fwSelectAllChange');
  //   checkbox.click();
  //   await page.waitForChanges();
  //   expect(changedEvent).toHaveReceivedEventTimes(1);
  // });

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

  it('should render columns in right order even if only some of the columns have position values', async () => {
    const changedEvent = await page.spyOnEvent('fwColumnsPositionChange');
    const data = {
      rows: [
        {
          id: '1234',
          name: 'Alexander Goodman',
          job: 'Lead designer',
          place: 'London',
        },
      ],
      columns: [
        {
          key: 'place',
          text: 'Place',
          position: 2,
        },
        {
          key: 'name',
          text: 'Name',
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
    const thirdColumn = await page.find(
      'fw-data-table >>> thead > tr > th:nth-child(3)'
    );
    expect(firstColumn.innerText).toEqual('Job');
    expect(secondColumn.innerText).toEqual('Place');
    expect(thirdColumn.innerText).toEqual('Name');
    expect(changedEvent).toHaveReceivedEventTimes(1);
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
      ],
      rows: [
        {
          id: '01',
          search: { text: 'Google', href: 'www.google.com' },
          usedby: {
            name: 'Alexander Goodman',
            email: 'alexander.goodman@freshworks.com',
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
    expect(anchorComponent).toBeTruthy();
    expect(userComponent).toBeTruthy();
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
      'fw-data-table >>> tbody > tr > td.row-actions > fw-button'
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
      'fw-data-table >>> tbody > tr > td.row-actions > fw-button'
    );
    actionButton.click();
    await page.waitForChanges();
    expect(myMock).toHaveBeenCalled();
  });
});
