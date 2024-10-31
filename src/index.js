
import BarSide from '@/components/barside/BarSide.vue';
import DataTable from '@/components/table/DataTable.vue';
import TextInput from '@/components/input/TextInput.vue';
import TextInputArea from '@/components/input/TextInputArea.vue';
import ListBox from '@/components/input/ListBox.vue';
import ButtonComponent from '@/components/button/ButtonComponent.vue';


const GtsPrint = {
  install(app) {
    app.component('BarSide', BarSide);
    app.component('DataTable', DataTable);
    app.component('TextInput', TextInput);
    app.component('TextInputArea', TextInputArea);
    app.component('ListBox', ListBox)
    app.component('ButtonComponent', ButtonComponent);
  }
};

 
export default GtsPrint;
