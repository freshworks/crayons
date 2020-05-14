import { newE2EPage } from '@stencil/core/testing';
import moment from 'moment-mini';

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

    const updateEle = await page.find('fw-datepicker >>> fw-button.close-date-picker');
    await updateEle.click();

    const datePickerEle = await page.find('fw-datepicker >>> .datepicker');
    expect(datePickerEle).toBeNull();
  });

  it('should emit fwChange when it is updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-datepicker></fw-datepicker>');
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();

    const updateEle = await page.find('fw-datepicker >>> fw-button.update-date-value');

    element.setProperty('selectedDay', '27-04-2020');
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

    const updateEle = await page.find('fw-datepicker >>> fw-button.update-range-value');
    element.setProperty('minDate', '01-04-2020');
    element.setProperty('maxDate', '27-04-2020');
    await updateEle.click();
    expect(fwChange).toHaveReceivedEvent();
  });

  it('date should be as per format', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-datepicker date-format="YYYY-MM-DD"></fw-datepicker>');
    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();

    const dateEle = await page.find('fw-datepicker >>> .c-day-container.highlight span');
    await dateEle.click();

    const updateEle = await page.find('fw-datepicker >>> fw-button.update-date-value');
    await updateEle.click();

    const datePicketValue = await element.getProperty('value');
    const todayValue = moment().format('YYYY-MM-DD');

    expect(datePicketValue.toString()).toBe(todayValue.toString());
  });

  it('daterange picker calenders always should be sequential months ', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-datepicker mode="range"></fw-datepicker>');
    const element = await page.find('fw-datepicker >>> fw-input');
    await element.click();
    const fromMonth = await page.find('fw-datepicker >>> fw-select.from-month-selector >>> input');
    const fromMonthValue = await fromMonth.getProperty('value');
    const toMonth = await page.find('fw-datepicker >>> fw-select.to-month-selector >>> input');
    const toMonthValue = await toMonth.getProperty('value');

    expect(moment(fromMonthValue, 'MMMM').month() + 1).toBe(moment(toMonthValue, 'MMMM').month());

    const rightArrow = await page.findAll('fw-datepicker >>> .mdpchb-inner');
    await rightArrow[1].click();
    const updatedFromMonth = await page.find('fw-datepicker >>> fw-select.from-month-selector >>> input');
    const updatedFromMonthValue = await updatedFromMonth.getProperty('value');
    const updatedToMonth = await page.find('fw-datepicker >>> fw-select.to-month-selector >>> input');
    const updateToMonthValue = await updatedToMonth.getProperty('value');

    expect(moment(updatedFromMonthValue, 'MMMM').add(1, 'M').format('MMMM')).toBe(updateToMonthValue);
  });
});
