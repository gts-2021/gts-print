import { mount } from '@vue/test-utils';
import DataTable from '../DataTable.vue';
import ToggleComponent from '@/components/toggle/ToggleComponent.vue';

// Mock jspdf and autoTable to prevent issues in Jest environment
jest.mock('jspdf', () => {
    return jest.fn().mockImplementation(() => ({
        save: jest.fn(),
        text: jest.fn(),
    }));
});
jest.mock('jspdf-autotable', () => jest.fn());

// Mock icons
jest.mock('@/assets/icons/ColumnsIcon.vue', () => ({ template: '<div>Icon</div>' }));
jest.mock('@/assets/icons/ExportIcon.vue', () => ({ template: '<div>Icon</div>' }));


describe('DataTable.vue', () => {
    const headers = [
        { title: 'Name', name: 'name', sortable: true },
        { title: 'Age', name: 'age', sortable: true },
        { title: 'Role', name: 'role', sortable: false }
    ];
    const items = [
        { name: 'Alice', age: 30, role: 'Admin' },
        { name: 'Bob', age: 25, role: 'User' }
    ];

    it('renders all columns by default', () => {
        const wrapper = mount(DataTable, {
            props: { headers, items }
        });
        const ths = wrapper.findAll('.gts-print-table-header-title');
        expect(ths.length).toBe(3);
        expect(ths[0].text()).toBe('Name');
    });

    it('hides column when added to hiddenColumns', async () => {
        const wrapper = mount(DataTable, {
            props: { headers, items },
            data() {
                return {
                    hiddenColumns: ['age']
                }
            }
        });

        const ths = wrapper.findAll('.gts-print-table-header-title');
        expect(ths.length).toBe(2);
        const texts = ths.map(th => th.text());
        expect(texts).not.toContain('Age');
        expect(texts).toContain('Name');
        expect(texts).toContain('Role');
    });

    it('toggles column visibility via hiddenColumns logic', async () => {
        const wrapper = mount(DataTable, {
            props: { headers, items }
        });

        // Simulate "Hide" action from sort menu
        // We can directly invoke the method or manipulate data
        await wrapper.setData({ hiddenColumns: ['name'] });

        let ths = wrapper.findAll('.gts-print-table-header-title');
        expect(ths.length).toBe(2);
        expect(ths.map(t => t.text())).not.toContain('Name');

        // Simulate showing it back (e.g. via Columns menu toggle logic)
        // The toggle logic does: hiddenColumns = hiddenColumns.filter(c => c !== 'name')
        await wrapper.setData({ hiddenColumns: [] });

        ths = wrapper.findAll('.gts-print-table-header-title');
        expect(ths.length).toBe(3);
        expect(ths.map(t => t.text())).toContain('Name');
    });

    describe('Filter system', () => {
        const filterHeaders = [
            { title: 'Code', name: 'companyCode' },
            { title: 'Activation Date', name: 'activationDate' }
        ];
        const filterItems = [
            { companyCode: '12345', activationDate: '23/05/2024' },
            { companyCode: '67890', activationDate: '10/10/2024' }
        ];

        it('does not render filter button when showFilter is false', () => {
            const wrapper = mount(DataTable, {
                props: { headers: filterHeaders, items: filterItems, showFilter: false }
            });
            expect(wrapper.find('.gts-data-table-action-filter').exists()).toBe(false);
        });

        it('renders filter button when showFilter is true', () => {
            const wrapper = mount(DataTable, {
                props: { headers: filterHeaders, items: filterItems, showFilter: true }
            });
            expect(wrapper.find('.gts-data-table-action-filter').exists()).toBe(true);
        });

        it('opens filter dialog when filter button is clicked', async () => {
            const wrapper = mount(DataTable, {
                props: { headers: filterHeaders, items: filterItems, showFilter: true }
            });
            expect(wrapper.vm.isFilterDialogOpen).toBe(false);
            await wrapper.find('.gts-data-table-action-filter').trigger('click');
            expect(wrapper.vm.isFilterDialogOpen).toBe(true);
        });

        it('applies default case-insensitive text filtering', async () => {
            const wrapper = mount(DataTable, {
                props: { headers: filterHeaders, items: filterItems, showFilter: true }
            });
            wrapper.vm.onApplyFilters({ companyCode: '23' });
            expect(wrapper.vm.dataToDisplay.length).toBe(1);
            expect(wrapper.vm.dataToDisplay[0].companyCode).toBe('12345');
        });

        it('applies custom filter configuration and ignores default search', () => {
            const customConfig = [
                {
                    field: 'companyCode',
                    filter: (item) => item.companyCode === '67890'
                }
            ];
            const wrapper = mount(DataTable, {
                props: {
                    headers: filterHeaders,
                    items: filterItems,
                    showFilter: true,
                    filterConfiguration: customConfig
                }
            });
            wrapper.vm.onApplyFilters({ companyCode: 'dummy value' });
            expect(wrapper.vm.dataToDisplay.length).toBe(1);
            expect(wrapper.vm.dataToDisplay[0].companyCode).toBe('67890');
        });

        it('supports date formatting filter comparison (YYYY-MM-DD vs DD/MM/YYYY)', () => {
            const dateConfig = [
                {
                    field: 'activationDate',
                    isDate: true
                }
            ];
            const wrapper = mount(DataTable, {
                props: {
                    headers: filterHeaders,
                    items: filterItems,
                    showFilter: true,
                    filterConfiguration: dateConfig
                }
            });
            // User selects date in YYYY-MM-DD format (like 2024-10-10)
            // It should match activationDate "10/10/2024"
            wrapper.vm.onApplyFilters({ activationDate: '2024-10-10' });
            expect(wrapper.vm.dataToDisplay.length).toBe(1);
            expect(wrapper.vm.dataToDisplay[0].companyCode).toBe('67890');
        });

        it('displays active filter count badge', async () => {
            const wrapper = mount(DataTable, {
                props: { headers: filterHeaders, items: filterItems, showFilter: true }
            });
            expect(wrapper.find('.gts-filter-badge').exists()).toBe(false);
            
            await wrapper.vm.onApplyFilters({ companyCode: '123' });
            expect(wrapper.find('.gts-filter-badge').exists()).toBe(true);
            expect(wrapper.find('.gts-filter-badge').text()).toBe('1');
        });

        it('resets filters when onResetFilters is called', async () => {
            const wrapper = mount(DataTable, {
                props: { headers: filterHeaders, items: filterItems, showFilter: true }
            });
            await wrapper.vm.onApplyFilters({ companyCode: '123' });
            expect(wrapper.vm.dataToDisplay.length).toBe(1);

            await wrapper.vm.onResetFilters();
            expect(wrapper.vm.dataToDisplay.length).toBe(2);
            expect(wrapper.vm.activeFilterCount).toBe(0);
        });
    });
});
