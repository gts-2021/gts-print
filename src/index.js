
import BarSide from '@/components/barside/BarSide.vue';
import BarSideMenu from '@/components/barside/BarSideMenu.vue';
import BarSideItem from '@/components/barside/BarSideItem.vue';

const GtsPrint = {
  install(app) {
    app.component('BarSide', BarSide);
    app.component('BarSideMenu', BarSideMenu);
    app.component('BarSideItem', BarSideItem);
  }
};

 
export default GtsPrint;
