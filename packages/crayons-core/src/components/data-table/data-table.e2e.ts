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
        orderIndex: 1,
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
          orderIndex: 2,
        },
        {
          key: 'job',
          text: 'Job',
          orderIndex: 1,
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
});
