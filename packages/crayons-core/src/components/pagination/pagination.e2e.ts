import { newE2EPage } from '@stencil/core/testing';

describe('fw-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-pagination></fw-pagination>');
    const element = await page.find('fw-pagination');
    expect(element).toHaveClass('hydrated');
  });

  describe('if variant is mini', () => {
    it('should set start to 1 if page is not passed in', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="10" total="50"></fw-pagination>'
      );
      const element = await page.findAll('fw-pagination >>> .record');
      console.log(element);
      expect(element[0].textContent).toEqual('1');
    });
    it('should set start based on the passed in value for page', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination page="2" per-page="10" total="50"></fw-pagination>'
      );
      const element = await page.findAll('fw-pagination >>> .record');
      console.log(element);
      expect(element[0].textContent).toEqual('11');
    });
    it('should set end to 10 when per-page is passed in and total records is greater', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="10" total="50"></fw-pagination>'
      );
      const element = await page.findAll('fw-pagination >>> .record');
      expect(element[1].textContent).toEqual('10');
    });
    it('should set end to 10 when per-page is not passed in', async () => {
      const page = await newE2EPage();

      await page.setContent('<fw-pagination total="50"></fw-pagination>');
      const element = await page.findAll('fw-pagination >>> .record');
      expect(element[1].textContent).toEqual('10');
    });
    it('Clicking on previous button should set start and end to next set', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="10" total="50"></fw-pagination>'
      );
      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );
      const element = await page.findAll('fw-pagination >>> .record');
      await nextButton.click();
      await previousButton.click();
      expect(element[0].textContent).toEqual('1');
      expect(element[1].textContent).toEqual('10');
    });
    it('Clicking on next button should set start and end to next set', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="10" total="50"></fw-pagination>'
      );
      const button = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      await button.click();
      await page.waitForChanges();
      const element = await page.findAll('fw-pagination >>> .record');
      expect(element[0].textContent).toEqual('11');
      expect(element[1].textContent).toEqual('20');
    });
    it('next and previous buttons are disabled when limit is reached', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="50" total="50"></fw-pagination>'
      );
      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );

      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toHaveAttribute('disabled');
    });

    it('renders mini pagination by default if variant is not provided', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="50" total="50"></fw-pagination>'
      );
      const miniPagination = await page.find(
        'fw-pagination >>> .mini-pagination'
      );
      expect(miniPagination).toBeTruthy();
    });
  });

  describe('if variant is standard', () => {
    it('renders standard pagination', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="50" total="50" variant="standard"></fw-pagination>'
      );
      const standardPagination = await page.find(
        'fw-pagination >>> .standard-pagination'
      );
      expect(standardPagination).toBeTruthy();
    });

    it('renders previous, next, page pills and per page dropdown', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="10" total="1000" variant="standard"></fw-pagination>'
      );
      const standardPagination = await page.find(
        'fw-pagination >>> .standard-pagination'
      );
      expect(standardPagination).toBeTruthy();
      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );

      expect(nextButton).toBeTruthy();
      expect(previousButton).toBeTruthy();
      expect(previousButton).toHaveAttribute('disabled');
      const activePage = await page.find('fw-pagination >>> .active');
      expect(activePage.innerText).toBe('1');
      const pagePills = await page.findAll('fw-pagination >>> .page-pill');
      expect(pagePills.length).toBe(5);
      const expectedPages = ['1', '2', '3', '4', '100'];
      await pagePills.forEach((page, index) => {
        expect(page.innerText).toBe(expectedPages[index]);
      });
      const ellipsis = await page.findAll('fw-pagination >>> .ellipsis');
      expect(ellipsis.length).toBe(1);
      expect(ellipsis[0].innerText).toBe('...');
      const perPageDropdown = await page.find(
        'fw-pagination >>> .per-page-dropdown'
      );
      expect(perPageDropdown).toBeTruthy();
      expect(perPageDropdown.innerText).toBe('Showing 10 / page');
    });

    it('renders per page dropdown with the default options', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="20" total="1000" variant="standard"></fw-pagination>'
      );
      const standardPagination = await page.find(
        'fw-pagination >>> .standard-pagination'
      );
      expect(standardPagination).toBeTruthy();
      const perPageDropdown = await page.find(
        'fw-pagination >>> .per-page-list'
      );
      expect(perPageDropdown).toBeTruthy();
      const options = await perPageDropdown.getProperty('options');
      expect(options.length).toBe(5);
      const expectedOptions = [
        {
          text: '10 / page',
          value: 10,
        },
        {
          text: '20 / page',
          value: 20,
        },
        {
          text: '30 / page',
          value: 30,
        },
        {
          text: '40 / page',
          value: 40,
        },
        {
          text: '50 / page',
          value: 50,
        },
      ];
      expect(options).toEqual(expectedOptions);
      const perPageSelected = await page.find(
        'fw-pagination >>> .per-page-dropdown'
      );
      expect(perPageSelected).toBeTruthy();
      expect(perPageSelected.innerText).toBe('Showing 20 / page');
    });

    it('renders per page dropdown with the new options provided', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination per-page="60" total="1000" variant="standard"></fw-pagination>'
      );
      const standardPagination = await page.find(
        'fw-pagination >>> .standard-pagination'
      );
      expect(standardPagination).toBeTruthy();
      const perPageDropdown = await page.find(
        'fw-pagination >>> .per-page-list'
      );
      expect(perPageDropdown).toBeTruthy();

      await page.$eval('fw-pagination', (elm: any) => {
        elm.perPageOptions = [20, 40, 60, 80, 100];
      });
      await page.waitForChanges();
      const expectedOptions = [
        {
          text: '20 / page',
          value: 20,
        },
        {
          text: '40 / page',
          value: 40,
        },
        {
          text: '60 / page',
          value: 60,
        },
        {
          text: '80 / page',
          value: 80,
        },
        {
          text: '100 / page',
          value: 100,
        },
      ];
      const options = await perPageDropdown.getProperty('options');
      expect(options.length).toBe(5);
      expect(options).toEqual(expectedOptions);
      const perPageSelected = await page.find(
        'fw-pagination >>> .per-page-dropdown'
      );
      expect(perPageSelected).toBeTruthy();
      expect(perPageSelected.innerText).toBe('Showing 60 / page');
    });

    it('should be able to select per page option from the dropdown provided', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination total="1000" variant="standard"></fw-pagination>'
      );
      const fwPerPageChange = await page.spyOnEvent('fwPerPageChange');

      const standardPagination = await page.find(
        'fw-pagination >>> .standard-pagination'
      );
      expect(standardPagination).toBeTruthy();
      const perPageDropdownBtn = await page.find(
        'fw-pagination >>> .per-page-dropdown fw-button'
      );
      expect(perPageDropdownBtn).toBeTruthy();
      await perPageDropdownBtn.click();
      await page.waitForChanges();
      const dropdown = await page.find('fw-pagination >>> .per-page-dropdown');
      const options = await dropdown.findAll(
        '.per-page-list >>> fw-select-option'
      );
      expect(options.length).toBe(5);
      await options[2].click();
      await page.waitForChanges();
      expect(fwPerPageChange).toHaveReceivedEventDetail({
        perPage: 30,
      });
      const perPageSelected = await page.find(
        'fw-pagination >>> .per-page-dropdown '
      );
      expect(perPageSelected).toBeTruthy();
      expect(perPageSelected.innerText).toBe('Showing 30 / page');
    });

    it('should change the page to the last page if the current page exceeds the last page when per page is changed', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination page="50" total="1000" variant="standard"></fw-pagination>'
      );
      const fwPerPageChange = await page.spyOnEvent('fwPerPageChange');

      const standardPagination = await page.find(
        'fw-pagination >>> .standard-pagination'
      );
      expect(standardPagination).toBeTruthy();
      let activePage = await page.find('fw-pagination >>> .active');
      expect(activePage.innerText).toBe('50');
      const perPageDropdownBtn = await page.find(
        'fw-pagination >>> .per-page-dropdown fw-button'
      );
      expect(perPageDropdownBtn).toBeTruthy();
      await perPageDropdownBtn.click();
      await page.waitForChanges();
      const dropdown = await page.find('fw-pagination >>> .per-page-dropdown');
      const options = await dropdown.findAll(
        '.per-page-list >>> fw-select-option'
      );
      expect(options.length).toBe(5);
      await options[4].click();
      await page.waitForChanges();
      await page.waitForChanges();
      expect(fwPerPageChange).toHaveReceivedEventDetail({
        perPage: 50,
      });
      const perPageSelected = await page.find(
        'fw-pagination >>> .per-page-dropdown '
      );
      expect(perPageSelected).toBeTruthy();
      expect(perPageSelected.innerText).toBe('Showing 50 / page');
      activePage = await page.find('fw-pagination >>> .active');
      expect(activePage.innerText).toBe('20');
    });

    it('render only active page item', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination total="1000" variant="standard" page-range-displayed="0" margin-pages-displayed="0"></fw-pagination>'
      );
      const activePage = await page.find('fw-pagination >>> .active');
      expect(activePage.innerText).toBe('1');
      const pagePills = await page.findAll('fw-pagination >>> .page-pill');
      expect(pagePills.length).toBe(1);
      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );

      expect(nextButton).toBeTruthy();
      expect(previousButton).toBeTruthy();
      expect(previousButton).toHaveAttribute('disabled');
    });

    it('disabled previous button when page is 1', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination total="1000" variant="standard"></fw-pagination>'
      );
      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );

      expect(nextButton).toBeTruthy();
      expect(nextButton).not.toHaveAttribute('disabled');
      expect(previousButton).toBeTruthy();
      expect(previousButton).toHaveAttribute('disabled');
    });

    it('disabled next button when current page is the last page', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination page="100" total="1000" variant="standard"></fw-pagination>'
      );
      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );

      expect(nextButton).toBeTruthy();
      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toBeTruthy();
      expect(previousButton).not.toHaveAttribute('disabled');
    });

    it('should render only Previous / Next if total is zero (default)', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination variant="standard"></fw-pagination>'
      );
      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );

      expect(nextButton).toBeTruthy();
      expect(nextButton).not.toHaveAttribute('disabled');
      expect(previousButton).toBeTruthy();
      expect(previousButton).not.toHaveAttribute('disabled');
      const pagePills = await page.findAll('fw-pagination >>> .page-pill');
      expect(pagePills.length).toBe(0);
    });

    it('should render only previous, next and single divider and should not render page pills when hidePageNumbers is true', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination variant="standard" total="1000" hide-page-numbers></fw-pagination>'
      );
      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );

      expect(nextButton).toBeTruthy();
      expect(nextButton).not.toHaveAttribute('disabled');
      expect(previousButton).toBeTruthy();
      expect(previousButton).toHaveAttribute('disabled');
      const pagePills = await page.findAll('fw-pagination >>> .page-pill');
      expect(pagePills.length).toBe(0);
      const dividers = await page.findAll('fw-pagination >>> .divider');
      expect(dividers.length).toBe(1);
    });

    describe('Test clicks', () => {
      it('test clicks on previous and next buttons', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="1000" variant="standard"></fw-pagination>'
        );
        const fwChange = await page.spyOnEvent('fwChange');
        const element = await page.find('fw-pagination');
        const nextButton = await page.find(
          'fw-pagination >>> fw-button[aria-label="Next"]'
        );
        const previousButton = await page.find(
          'fw-pagination >>> fw-button[aria-label="Previous"]'
        );
        let activePage = await page.find('fw-pagination >>> .active');
        expect(activePage.innerText).toBe('1');
        await nextButton.click();
        await page.waitForChanges();
        element.waitForEvent('fwChange');
        expect(fwChange).toHaveReceivedEventDetail({
          page: 2,
        });
        activePage = await page.find('fw-pagination >>> .active');
        expect(activePage.innerText).toBe('2');
        await previousButton.click();
        expect(fwChange).toHaveReceivedEventDetail({
          page: 1,
        });
        activePage = await page.find('fw-pagination >>> .active');
        expect(activePage.innerText).toBe('1');
      });

      it('test click on a page button', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="1000" variant="standard"></fw-pagination>'
        );
        const fwChange = await page.spyOnEvent('fwChange');
        let activePage = await page.find('fw-pagination >>> .active');
        expect(activePage.innerText).toBe('1');
        const pagePills = await page.findAll('fw-pagination >>> .page-pill');
        await pagePills[3].click();
        await page.waitForChanges();
        await page.waitForChanges();
        expect(fwChange).toHaveReceivedEventDetail({
          page: 4,
        });
        activePage = await page.find('fw-pagination >>> .active');
        expect(activePage.innerText).toBe('4');
      });

      it('test multiple clicks on previous and next buttons', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="1000" variant="standard"></fw-pagination>'
        );
        const fwChange = await page.spyOnEvent('fwChange');
        const element = await page.find('fw-pagination');
        const nextButton = await page.find(
          'fw-pagination >>> fw-button[aria-label="Next"]'
        );
        const previousButton = await page.find(
          'fw-pagination >>> fw-button[aria-label="Previous"]'
        );
        let activePage = await page.find('fw-pagination >>> .active');
        expect(activePage.innerText).toBe('1');
        for (let i = 1; i <= 3; i++) {
          await nextButton.click();
          await page.waitForChanges();
          element.waitForEvent('fwChange');
          expect(fwChange).toHaveReceivedEventDetail({
            page: i + 1,
          });
          activePage = await page.find('fw-pagination >>> .active');
          expect(activePage.innerText).toBe((i + 1).toString());
        }
        await page.waitForChanges();
        await previousButton.click();
        await page.waitForChanges();
        expect(fwChange).toHaveReceivedEventDetail({
          page: 3,
        });
        activePage = await page.find('fw-pagination >>> .active');
        expect(activePage.innerText).toBe('3');
      });
    });

    describe('test pagination behaviour', () => {
      it('should display 2 elements to the left, 1 ellipsis and 2 elements to the right', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="1000" variant="standard" page-range-displayed="2" margin-pages-displayed="1"></fw-pagination>'
        );

        const items = await page.findAll('fw-pagination >>> li');
        // previous + 2 left elements + ellipsis + 1 right element + next
        const actualResult = [];
        const expectedResult = ['Previous', '1', '2', '...', '100', 'Next'];
        await items.forEach((item) => {
          actualResult.push(item.innerText);
        });
        expect(actualResult).toEqual(expectedResult);
      });

      it('should display 5 elements to the left, 1 ellipsis and 2 elements to the right', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="200" variant="standard" page-range-displayed="5" margin-pages-displayed="2"></fw-pagination>'
        );

        const items = await page.findAll('fw-pagination >>> li');
        // previous + 5 left elements + ellipsis + 2 right elements + next
        const actualResult = [];
        const expectedResult = [
          'Previous',
          '1',
          '2',
          '3',
          '4',
          '5',
          '...',
          '19',
          '20',
          'Next',
        ];
        await items.forEach((item) => {
          actualResult.push(item.innerText);
        });
        expect(actualResult).toEqual(expectedResult);
      });

      it('should display 7 elements to the left, 1 ellipsis and 2 elements to the right', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="200" page="5" variant="standard" page-range-displayed="5" margin-pages-displayed="2"></fw-pagination>'
        );

        const items = await page.findAll('fw-pagination >>> li');
        // previous + 7 left elements + ellipsis + 2 right elements + next
        const actualResult = [];
        const expectedResult = [
          'Previous',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '...',
          '19',
          '20',
          'Next',
        ];
        await items.forEach((item) => {
          actualResult.push(item.innerText);
        });
        expect(actualResult).toEqual(expectedResult);
      });

      it('should display 2 elements to the left, 5 elements in the middle, 2 elements to the right and 2 ellipsis', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="200" variant="standard" page="8" page-range-displayed="5" margin-pages-displayed="2"></fw-pagination>'
        );

        const items = await page.findAll('fw-pagination >>> li');
        // previous + 2 left elements + ellipsis + 5 middle elements + ellipsis + 2 right elements + next
        const actualResult = [];
        const expectedResult = [
          'Previous',
          '1',
          '2',
          '...',
          '6',
          '7',
          '8',
          '9',
          '10',
          '...',
          '19',
          '20',
          'Next',
        ];
        await items.forEach((item) => {
          actualResult.push(item.innerText);
        });
        expect(actualResult).toEqual(expectedResult);
      });

      it('should display 2 elements to the left, 1 ellipsis and 7 elements to the right', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="200" variant="standard" page="16" page-range-displayed="5" margin-pages-displayed="2"></fw-pagination>'
        );

        const items = await page.findAll('fw-pagination >>> li');
        // previous + 2 left elements + ellipsis + 7 right elements + next
        const actualResult = [];
        const expectedResult = [
          'Previous',
          '1',
          '2',
          '...',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          'Next',
        ];
        await items.forEach((item) => {
          actualResult.push(item.innerText);
        });
        expect(actualResult).toEqual(expectedResult);
      });

      it('should display 2 elements to the left, 1 ellipsis and 6 elements to the right', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="200" variant="standard" page="17" page-range-displayed="5" margin-pages-displayed="2"></fw-pagination>'
        );

        const items = await page.findAll('fw-pagination >>> li');
        // previous + 2 left elements + ellipsis + 6 right elements + next
        const actualResult = [];
        const expectedResult = [
          'Previous',
          '1',
          '2',
          '...',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          'Next',
        ];
        await items.forEach((item) => {
          actualResult.push(item.innerText);
        });
        expect(actualResult).toEqual(expectedResult);
      });

      it('should not display a ellipsis containing only one page', async () => {
        const page = await newE2EPage();

        await page.setContent(
          '<fw-pagination total="100" variant="standard" page="6" page-range-displayed="6" margin-pages-displayed="2"></fw-pagination>'
        );

        const items = await page.findAll('fw-pagination >>> li');
        // previous + 10 elements + next
        const actualResult = [];
        const expectedResult = [
          'Previous',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          'Next',
        ];
        await items.forEach((item) => {
          actualResult.push(item.innerText);
        });
        expect(actualResult).toEqual(expectedResult);
      });
    });

    it('render active page based on page prop', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination total="100" variant="standard" page="6"></fw-pagination>'
      );

      const activePage = await page.find('fw-pagination >>> .active');
      expect(activePage.innerText).toBe('6');
    });

    it('should disable all elements when isLoading is true', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination is-loading total="100" variant="standard" page="6"></fw-pagination>'
      );

      const nextButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Next"]'
      );
      const previousButton = await page.find(
        'fw-pagination >>> fw-button[aria-label="Previous"]'
      );

      expect(nextButton).toBeTruthy();
      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toBeTruthy();
      expect(previousButton).toHaveAttribute('disabled');
      const pagePills = await page.findAll('fw-pagination >>> .page-pill');
      await pagePills.forEach((page) => {
        expect(page).toHaveClass('disabled');
      });
      const perPageDropdownBtn = await page.find(
        'fw-pagination >>> .per-page-dropdown fw-button'
      );
      expect(perPageDropdownBtn).toHaveAttribute('disabled');
    });

    it('does not display ellipsis', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination total="100" variant="standard" page-range-displayed="0" margin-pages-displayed="0"></fw-pagination>'
      );

      const pagePills = await page.findAll('fw-pagination >>> .page-pill');
      expect(pagePills.length).toBe(1);
      expect(pagePills[0].innerText).toBe('1');
      const activePage = await page.find('fw-pagination >>> .active');
      expect(activePage.innerText).toBe('1');
      const ellipsis = await page.findAll('fw-pagination >>> .ellipsis');
      expect(ellipsis.length).toBe(0);
    });

    it('hides page numbers when hidePageNumbers is true', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<fw-pagination hide-page-numbers total="100" variant="standard" page-range-displayed="0" margin-pages-displayed="0"></fw-pagination>'
      );

      const pagePills = await page.findAll('fw-pagination >>> .page-pill');
      expect(pagePills.length).toBe(0);
    });
  });
});
