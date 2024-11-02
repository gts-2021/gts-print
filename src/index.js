
import BarSide from '@/components/barside/BarSide.vue';
import DataTable from '@/components/table/DataTable.vue';
import TextInput from '@/components/input/TextInput.vue';
import TextInputArea from '@/components/input/TextInputArea.vue';
import ListBox from '@/components/input/ListBox.vue';
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import BasicDialog from '@/components/dialog/BasicDialog.vue';
import ConfirmationDialog from '@/components/dialog/ConfirmationDialog.vue';
import RadioButton from '@/components/radio/RadioButton.vue';
import RadioGroup from '@/components/radio/RadioGroup.vue';


const GtsPrint = {
  install(app) {
    app.component('BarSide', BarSide);
    app.component('DataTable', DataTable);
    app.component('TextInput', TextInput);
    app.component('TextInputArea', TextInputArea);
    app.component('ButtonComponent', ButtonComponent);
    app.component('ListBox', ListBox);
    app.component('BasicDialog', BasicDialog);
    app.component('ConfirmationDialog', ConfirmationDialog)
    app.component('RadioButton', RadioButton)
    app.component('RadioGroup', RadioGroup)
  }
};

 
export default GtsPrint;
