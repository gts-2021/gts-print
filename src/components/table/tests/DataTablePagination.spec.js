import { shallowMount } from '@vue/test-utils';
import DataTablePagination from '@/components/table/DataTablePagination.vue';

describe('DataTablePagination test : ', () => {
  
  // test if pagination return config and icons
  it('DataTablePagination should render config and icons', () => {

    const paginationConfig = {
      pageLengthTitle: "Row per page",
      pageLength :[10, 20, 25, 50, 100]
    };
    const wrapper = shallowMount(DataTablePagination, {
      propsData: { paginationConfig},
      stubs: { 'v-icon': true },  
    });

    expect(wrapper.find('.gts-print-pagination-page-length-title').text()).toBe(paginationConfig.pageLengthTitle);
    expect(Number(wrapper.find('.gts-print-pagination-page-selected').text())).toBe(paginationConfig.pageLength[0]);
    expect(wrapper.find('.gts-print-pagination-icon').exists()).toBe(true);

    // icons
    const paginationIcons = wrapper.findAll('.gts-print-pagination-icon');
    expect(paginationIcons).toHaveLength(3);
    expect(paginationIcons.at(0).text()).toContain('mdi-chevron-down');
    expect(paginationIcons.at(1).text()).toContain('mdi-chevron-left');
    expect(paginationIcons.at(2).text()).toContain('mdi-chevron-right');

  });

  // test toggle pagination
  it('DataTablePagination toggle correctly page length menu item', async () => {

    const paginationConfig = {
      pageLength :[10, 20, 25, 50, 100]
    };
    const wrapper = shallowMount(DataTablePagination, {
      propsData: { paginationConfig },
      data() {
        return {
          pageLengthDisplayed: false
        };
      }
    });

    // icons
    const paginationIcons = wrapper.findAll('.gts-print-pagination-icon');
    const toggleButton = paginationIcons.at(0);

    // first click
    await toggleButton.trigger('click');
    expect(wrapper.vm.pageLengthDisplayed).toBe(true);

    // second click
    await toggleButton.trigger('click');
    expect(wrapper.vm.pageLengthDisplayed).toBe(false);

  });

  // test if page length menu items are displayed correctly.
  it('DataTablePagination should display correctly page length menu item', async () => {

    const paginationConfig = {
      pageLength :[10, 20, 25, 50, 100]
    };
    const wrapper = shallowMount(DataTablePagination, {
      propsData: { paginationConfig },
      data() {
        return {
          pageLengthDisplayed: true
        };
      }
    });

    const pageLengthMenuItems = wrapper.findAll('.gts-print-pagination-page-length-menu .gts-print-pagination-page-length-menu-item');
    expect(pageLengthMenuItems).toHaveLength(paginationConfig.pageLength.length);
  
    // toggle button
    const paginationIcons = wrapper.findAll('.gts-print-pagination-icon');
    const toggleButton = paginationIcons.at(0);
    await toggleButton.trigger('click');

    const updatedPageLengthMenuItems = wrapper.findAll('.gts-print-pagination-page-length-menu .gts-print-pagination-page-length-menu-item');
    expect(updatedPageLengthMenuItems).toHaveLength(0);

  });

  // test handlePageChange method
  it('DataTablePagination should handle page change correctly', async () => {

    const paginationConfig = {
      pageLength :[10, 20, 25, 50, 100]
    };
    const wrapper = shallowMount(DataTablePagination, {
      propsData: { paginationConfig },
      data() {
        return {
          selectedPageLength: paginationConfig.pageLength[0],
          pageLengthDisplayed: true
        };
      }
    });

    const pageLengthMenuItems = wrapper.findAll('.gts-print-pagination-page-length-menu .gts-print-pagination-page-length-menu-item');
    
    // get third item
    const thirdItem = pageLengthMenuItems.at(2);
    await thirdItem.trigger('click');
    expect(wrapper.vm.pageLengthDisplayed).toBe(false);
    expect(wrapper.vm.selectedPageLength).toBe(25);


    // toggle button
    const paginationIcons = wrapper.findAll('.gts-print-pagination-icon');
    const toggleButton = paginationIcons.at(0);
    await toggleButton.trigger('click');

    // get last item
    const lastItem = pageLengthMenuItems.at(pageLengthMenuItems.length - 1);
    await lastItem.trigger('click');
    expect(wrapper.vm.pageLengthDisplayed).toBe(false);
    expect(wrapper.vm.selectedPageLength).toBe(paginationConfig.pageLength[paginationConfig.pageLength.length - 1]);


  });

  // Test total Records
  it('DataTablePagination should display total records correctly', async () => {
    const paginationConfig = {
      totalRecordsTitle: "Of",
      totalRecords: 100,
      pageLength: [10, 20, 25, 50, 100]
    };
    
    const wrapper = shallowMount(DataTablePagination, {
      propsData: { paginationConfig },
      data() {
        return {
          selectedPageLength: paginationConfig.pageLength[0],
          currentPage: 1 
        };
      }
    });

    const totalRecordsText = wrapper.find('.gts-print-pagination-total-records span').text();
    expect(totalRecordsText).toContain(`1 - 10 ${paginationConfig.totalRecordsTitle} ${paginationConfig.totalRecords}`);

    const paginationIcons = wrapper.findAll('.gts-print-pagination-steps .gts-print-pagination-icon');
    const nextButton = paginationIcons.at(1);
    await nextButton.trigger('click');

    const totalRecordsNewText = wrapper.find('.gts-print-pagination-total-records span').text();
    expect(totalRecordsNewText).toContain(`11 - 20 ${paginationConfig.totalRecordsTitle} ${paginationConfig.totalRecords}`);

  
  });

  // test if next and previous boutons emit events
  it('DataTablePagination should emit event to parent when clicked with current page', async () => {

    const paginationConfig = {
      pageLengthTitle: "Row per page",
      pageLength :[10, 20, 25, 50, 100]
    };
    const wrapper = shallowMount(DataTablePagination, {
      propsData: { paginationConfig },
      data() {
        return {
          currentPage: 2
        };
      }
    });

    const paginationIcons = wrapper.findAll('.gts-print-pagination-steps .gts-print-pagination-icon');
    const previousButton = paginationIcons.at(0);
    const nextButton = paginationIcons.at(1);

    // previous
    await previousButton.trigger('click');
    expect(wrapper.emitted().changePage).toBeTruthy();
    expect(wrapper.emitted().changePage[0]).toEqual([1]);

    // next
    await nextButton.trigger('click');
    expect(wrapper.emitted().changePage).toBeTruthy();
    expect(wrapper.emitted().changePage[1]).toEqual([2]);
  });

  // test if next and previous boutons apply disabled class
  it('DataTablePagination should correctly apply disabled class to pagination buttons', async () => {
    const paginationConfig = {
      totalRecords: 100,
      pageLength: [10, 20, 25, 50, 100]
    };
    
    const wrapper = shallowMount(DataTablePagination, {
      propsData: { paginationConfig },
      data() {
        return {
          selectedPageLength: 10,
          currentPage: 1
        };
      }
    });
  
    const paginationIcons = wrapper.findAll('.gts-print-pagination-steps .gts-print-pagination-icon');
    
    // previous button
    const previousButton = paginationIcons.at(0);

    expect(previousButton.classes()).toContain('disabled');
  
    await previousButton.trigger('click');

    expect(previousButton.classes()).not.toContain('disabled');
  
    wrapper.setData({ currentPage: wrapper.vm.totalPages });
    await wrapper.vm.$nextTick(); 
  
    const nextButton = paginationIcons.at(1);
    expect(nextButton.classes()).toContain('disabled');
  });

  

});
