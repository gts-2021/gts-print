import { mount } from '@vue/test-utils';
import DataTable from '../DataTable.vue';
import ToggleComponent from '@/components/toggle/ToggleComponent.vue';

// Mock maska
jest.mock('maska/vue', () => ({ vMaska: {} }), { virtual: true });

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
jest.mock('@/assets/icons/FilterIcon.vue', () => ({ template: '<div>Icon</div>' }));


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

    describe('Filter refactoring & Server-Side Filtering', () => {
        afterEach(() => {
            document.body.innerHTML = '';
        });

        it('emits onFilter and filter event with JSON payload when applyFilters is called', async () => {
            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items,
                    showFilter: true
                }
            });

            wrapper.vm.setFilter('name', 'Alice');
            wrapper.vm.setFilter('age', '30');
            wrapper.vm.applyFilters();

            expect(wrapper.emitted('onFilter')).toBeTruthy();
            expect(wrapper.emitted('filter')).toBeTruthy();

            const emittedPayload = wrapper.emitted('onFilter')[0][0];
            expect(emittedPayload).toEqual(expect.objectContaining({
                name: 'Alice',
                age: '30'
            }));

            // Local filtering is active by default
            expect(wrapper.vm.dataToDisplay.length).toBe(1);
            expect(wrapper.vm.dataToDisplay[0].name).toBe('Alice');
        });

        it('emits onFilter with cleared payload when resetFilters is called', async () => {
            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items,
                    showFilter: true
                }
            });

            wrapper.vm.setFilter('name', 'Alice');
            wrapper.vm.applyFilters();

            expect(wrapper.vm.dataToDisplay.length).toBe(1);

            wrapper.vm.resetFilters();

            expect(wrapper.emitted('onFilter').length).toBe(2);
            const resetPayload = wrapper.emitted('onFilter')[1][0];
            expect(resetPayload).toEqual(expect.objectContaining({
                name: '',
                age: '',
                role: ''
            }));

            expect(wrapper.vm.dataToDisplay.length).toBe(2);
        });

        it('prevents local filtering when preventLocalFilter is true', async () => {
            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items,
                    showFilter: true,
                    preventLocalFilter: true
                }
            });

            wrapper.vm.setFilter('name', 'NonExistentPerson');
            wrapper.vm.applyFilters();

            const emittedPayload = wrapper.emitted('onFilter')[0][0];
            expect(emittedPayload.name).toBe('NonExistentPerson');

            // dataToDisplay should NOT be filtered in-memory
            expect(wrapper.vm.dataToDisplay.length).toBe(2);
        });

        it('prevents local filtering when disableLocalFilter alias is true', async () => {
            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items,
                    showFilter: true,
                    disableLocalFilter: true
                }
            });

            wrapper.vm.setFilter('name', 'NonExistentPerson');
            wrapper.vm.applyFilters();

            expect(wrapper.vm.dataToDisplay.length).toBe(2);
        });

        it('supports additionalFilters not defined in table columns', async () => {
            const additionalFilters = [
                {
                    name: 'status',
                    title: 'Status',
                    filterLabel: 'Status Label',
                    filterPlaceholder: 'Search status...'
                },
                {
                    name: 'country',
                    title: 'Country'
                }
            ];

            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items,
                    showFilter: true,
                    additionalFilters
                }
            });

            expect(wrapper.vm.filterFields.length).toBe(5); // 3 headers + 2 additional
            expect(wrapper.vm.filterFields.map(f => f.name)).toContain('status');
            expect(wrapper.vm.filterFields.map(f => f.name)).toContain('country');

            wrapper.vm.setFilter('status', 'active');
            wrapper.vm.setFilter('country', 'France');
            wrapper.vm.applyFilters();

            const payload = wrapper.emitted('onFilter')[0][0];
            expect(payload.status).toBe('active');
            expect(payload.country).toBe('France');
        });

        it('exposes getFilterInputRef and filterInputRefs for TextInput components', async () => {
            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items,
                    showFilter: true
                },
                attachTo: document.body
            });

            wrapper.vm.openFilterDialog();
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.getFilterInputRef('name')).toBeDefined();
            expect(wrapper.vm.getFilterInputRef('age')).toBeDefined();
            expect(wrapper.vm.filterInputRefs['name']).toBeDefined();

            wrapper.unmount();
        });

        it('allows custom filter dialog rendering via filter-dialog scoped slot', async () => {
            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items,
                    showFilter: true
                },
                slots: {
                    'filter-dialog': `
                        <template #filter-dialog="{ isOpen, filterValues, setFilter, applyFilters }">
                            <div class="custom-dialog-slot" v-if="isOpen">
                                <input class="custom-name-input" :value="filterValues.name" @input="setFilter('name', $event.target.value)" />
                                <button class="custom-apply-btn" @click="applyFilters">Apply Custom</button>
                            </div>
                        </template>
                    `
                }
            });

            wrapper.vm.openFilterDialog();
            await wrapper.vm.$nextTick();

            const customDialog = wrapper.find('.custom-dialog-slot');
            expect(customDialog.exists()).toBe(true);

            const input = wrapper.find('.custom-name-input');
            await input.setValue('Alice');

            const applyBtn = wrapper.find('.custom-apply-btn');
            await applyBtn.trigger('click');

            expect(wrapper.emitted('onFilter')).toBeTruthy();
            expect(wrapper.emitted('onFilter')[0][0].name).toBe('Alice');
        });

        it('allows custom input positioning inside default dialog using filter-content slot and FilterField', async () => {
            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items,
                    showFilter: true
                },
                slots: {
                    'filter-content': `
                        <template #filter-content="{ FilterField }">
                            <div class="custom-grid-positioning">
                                <div class="left-col">
                                    <component :is="FilterField" name="name" />
                                </div>
                                <div class="right-col">
                                    <component :is="FilterField" name="role" />
                                </div>
                            </div>
                        </template>
                    `
                },
                attachTo: document.body
            });

            wrapper.vm.openFilterDialog();
            await wrapper.vm.$nextTick();

            const customGrid = document.querySelector('.custom-grid-positioning');
            expect(customGrid).not.toBeNull();
            expect(document.querySelector('.left-col')).not.toBeNull();
            expect(document.querySelector('.right-col')).not.toBeNull();

            // Test input typing in the positioned component
            const nameInput = document.querySelector('.left-col input');
            expect(nameInput).not.toBeNull();
            nameInput.value = 'Alice';
            nameInput.dispatchEvent(new Event('input'));

            expect(wrapper.vm.filterValues.name).toBe('Alice');

            wrapper.vm.applyFilters();
            expect(wrapper.emitted('onFilter')[0][0].name).toBe('Alice');

            wrapper.unmount();
        });
    });

    describe('Server-Side Pagination', () => {
        const page1Items = [
            { name: 'Company 1', age: 10, role: 'Tech' },
            { name: 'Company 2', age: 20, role: 'Finance' },
            { name: 'Company 3', age: 30, role: 'Health' },
        ];

        it('does not slice items on client when preventPginationAutoSlice is true', () => {
            const paginationConfig = {
                pageLengths: [3, 5, 10],
                totalRecords: 12,
                pageLengthTitle: 'Showing per page'
            };

            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items: page1Items,
                    isPaginable: true,
                    preventPginationAutoSlice: true,
                    paginationConfig
                }
            });

            // With preventPginationAutoSlice=true, all items passed to the table are displayed directly without slicing.
            const rows = wrapper.findAll('.gts-print-table-content');
            expect(rows.length).toBe(3);
            expect(wrapper.vm.pagination.totalRecords).toBe(12);
        });

        it('emits changePage and lengthPageChanged when page or length changes', async () => {
            const paginationConfig = {
                pageLength: 3,
                pageNumber: 1,
                totalPages: 4,
                totalRecords: 12,
                pageLengths: [3, 5, 10],
            };

            const wrapper = mount(DataTable, {
                props: {
                    headers,
                    items: page1Items,
                    isPaginable: true,
                    paginationConfig
                }
            });

            wrapper.vm.onPaginationChange(2);
            expect(wrapper.emitted().changePage).toBeTruthy();
            expect(wrapper.emitted().changePage[0]).toEqual([2]);

            wrapper.vm.onNumberRowsPerPageChaned(5);
            expect(wrapper.emitted().lengthPageChanged).toBeTruthy();
            expect(wrapper.emitted().lengthPageChanged[0]).toEqual([5]);
        });
    });
});
