
import BarSide from '@/components/barside/BarSide.vue';
import BarSideMenu from '@/components/barside/BarSideMenu.vue';
import BarSideItem from '@/components/barside/BarSideItem.vue';

const GtsPrint = {
  install(Vue) {
    Vue.component('BarSide', BarSide);
    Vue.component('BarSideMenu', BarSideMenu);
    Vue.component('BarSideItem', BarSideItem);
  }
};

 
export default GtsPrint;
