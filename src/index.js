
import BarSide from '@/components/barside/BarSide.vue';
import BarSideMenu from '@/components/barside/BarSideMenu.vue';
import BarSideItem from '@/components/barside/BarSideItem.vue';
import DataTable from './components/table/DataTable.vue';
import DataTablePagination from './components/table/DataTablePagination.vue'

const GtsPrint = {
  install(app) {
    app.component('BarSide', BarSide);
    app.component('BarSideMenu', BarSideMenu);
    app.component('BarSideItem', BarSideItem);
    app.component('DataTable', DataTable);
    app.component('DataTablePagination', DataTablePagination);
  }
};

 
export default GtsPrint;
