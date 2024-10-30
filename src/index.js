
import BarSide from '@/components/barside/BarSide.vue';
import DataTable from '@/components/table/DataTable.vue';
import TextInput from '@/components/input/TextInput.vue';
import TextInputArea from '@/components/input/TextInputArea.vue';
import ListBox from '@/components/input/ListBox.vue';


const GtsPrint = {
  install(app) {
    app.component('BarSide', BarSide);
    app.component('DataTable', DataTable);
    app.component('TextInput', TextInput);
    app.component('TextInputArea', TextInputArea);
    app.component('ListBox', ListBox)
  }
};

 
export default GtsPrint;
