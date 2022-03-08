import { newE2EPage } from '@stencil/core/testing';
import { format, addMonths, getMonth, parse } from 'date-fns';

describe('fw-datepicker', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-datepicker></fw-datepicker>');
    const element = await page.find('fw-datepicker');
    expect(element).toHaveClass('hydrated');
  });

  it('should show and hide the datepicker popup when click', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-datepicker></fw-datepicker>');
    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();
    const popup = await page.find('fw-datepicker >>> .datepicker');
    expect(popup).toBeTruthy();

    const updateEle = await page.find(
      'fw-datepicker >>> fw-button.close-date-picker'
    );
    await updateEle.click();

    const datePickerEle = await page.find('fw-datepicker >>> .datepicker');
    expect(datePickerEle).toBeFalsy();
  });

  it('should emit fwChange when it is updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-datepicker></fw-datepicker>');
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();
    const popup = await page.find(
      'fw-datepicker >>> .datepicker .mdp-container'
    );
    expect(popup).toBeTruthy();

    const dateEle = await page.findAll('fw-datepicker >>> .c-day-container');
    await (await dateEle[14].find('span')).click();

    const updateEle = await page.find(
      'fw-datepicker >>> fw-button.update-date-value'
    );
    expect(updateEle).toBeTruthy();
    await updateEle.click();
    expect(fwChange).toHaveReceivedEvent();
  });

  it('range picker should render and emit fwChange', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-datepicker mode="range"></fw-datepicker>');
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();
    const popup = await page.find('fw-datepicker >>> .daterangepicker');
    expect(popup).toBeTruthy();

    const dateEle = await page.findAll('fw-datepicker >>> .c-day-container');
    await (await dateEle[14].find('span')).click();
    await (await dateEle[16].find('span')).click();

    const updateEle = await page.find(
      'fw-datepicker >>> fw-button.update-range-value'
    );
    expect(updateEle).toBeTruthy();
    await updateEle.click();
    expect(fwChange).toHaveReceivedEvent();
  });

  it('date should be as per format', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-datepicker display-format="yyyy-MM-dd"></fw-datepicker>'
    );
    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();

    const dateEle = await page.find(
      'fw-datepicker >>> .c-day-container.highlight:not(.disabled) span'
    );
    await dateEle.click();

    const updateEle = await page.find(
      'fw-datepicker >>> fw-button.update-date-value'
    );
    await updateEle.click();

    const datePickerValue = await element.getProperty('value');
    const todayValue = format(new Date(), 'yyyy-MM-dd');

    expect(datePickerValue.toString()).toBe(todayValue.toString());
  });

  it('daterange picker calenders should be sequential months ', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-datepicker mode="range"></fw-datepicker>');

    const component = await page.find('fw-datepicker');
    expect(component).toHaveClass('hydrated');

    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();

    const fromMonth = await page.find(
      'fw-datepicker >>> fw-select.from-month-selector >>> input'
    );
    const fromMonthValue = await fromMonth.getProperty('value');
    const toMonth = await page.find(
      'fw-datepicker >>> fw-select.to-month-selector >>> input'
    );
    const toMonthValue = await toMonth.getProperty('value');

    expect(
      getMonth(addMonths(parse(fromMonthValue, 'MMM', new Date()), 1))
    ).toBe(getMonth(parse(toMonthValue, 'MMM', new Date())));
  });

  it('both calenders of daterange picker should update', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-datepicker mode="range"></fw-datepicker>');

    const component = await page.find('fw-datepicker');
    expect(component).toHaveClass('hydrated');

    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();

    const rightArrow = await page.findAll('fw-datepicker >>> .mdpchb-inner');
    await rightArrow[1].click();

    const updatedFromMonth = await page.find(
      'fw-datepicker >>> fw-select.from-month-selector >>> input'
    );
    const updatedFromMonthValue = await updatedFromMonth.getProperty('value');
    const updatedToMonth = await page.find(
      'fw-datepicker >>> fw-select.to-month-selector >>> input'
    );
    const updateToMonthValue = await updatedToMonth.getProperty('value');

    expect(
      getMonth(addMonths(parse(updatedFromMonthValue, 'MMM', new Date()), 1))
    ).toBe(getMonth(parse(updateToMonthValue, 'MMM', new Date())));
  });
});
