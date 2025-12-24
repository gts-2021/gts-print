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
});
