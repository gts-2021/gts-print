<template>

	<h4> NotificationComponent </h4>
	<NotificationExemple />

	<NoContentExample />

	<h4> CalendarComponent </h4>
	<CalendarExample />

	<ToolTipExample />

	<StepperExample />

	<CardExample />
	<BarSide :menus="menus" />

	<BadgeExample />

	<AccordionExemple />
	<CheckBoxExemple />
	<RadioExemple />
	<DialogExample />
	<InputExemple />
	<BarSideExemple />

	<ButtonExample />

	<DataTableExemple />
	
</template>

<script>

import BarSideExemple from './components/barside/BarSideExemple.vue';
import InputExemple from './components/input/InputExemple.vue';
import ButtonExample from './components/button/ButtonExample.vue';

//import BarSide from '@/components/barside/BarSide.vue';
import DataTable from '@/components/table/DataTable.vue';
import DialogExample from './components/dialog/DialogExample.vue';
import RadioExemple from './components/radio/RadioExemple.vue';
import CheckBoxExemple from './components/checkbox/CheckBoxExemple.vue';
import AccordionExemple from './components/accordion/AccordionExemple.vue';

import BadgeExample from './components/badge/BadgeExample.vue';
import CardExample from './components/card/CardExample.vue';

import CalendarExample from './components/calendar/CalendarExample.vue';
import StepperExample from './components/stepper/StepperExample.vue';
import ToolTipExample from './components/tooltip/ToolTipExample.vue';
import NoContentExample from './components/nocontent/NoContentExample.vue';
import NotificationExemple from './components/notification/NotificationExemple.vue';
import DataTableExemple from './components/table/DataTableExemple.vue';



export default {
	name: "ExamplePage",
	components: {


		NotificationExemple,
		BarSideExemple,
		InputExemple,
		DataTable,
		//BarSide,
		ButtonExample,
		DialogExample,
		RadioExemple,
		CheckBoxExemple,
		AccordionExemple,
		BadgeExample,
		CardExample,
		CalendarExample,
		StepperExample,
		ToolTipExample,
		NoContentExample,
		DataTableExemple

	},

	data() {
		return {

			menus: [
				[
					{
						title: "Dashboard",
						icon: "mdi mdi-finance"
					},
					{
						title: "Companies",
						icon: "mdi mdi-bag-personal-outline"
					},
					{
						title: "Statistics",
						icon: "mdi mdi-finance"
					},

				],
				[
					{
						title: "Settings",
						icon: "mdi mdi-cog-outline"
					},
					{
						title: "LogOut",
						icon: "mdi mdi-logout"
					},

				]
			],

		
			
		};
	},

	methods: {

	

	},

}

</script>

<style lang="scss">
body {
	font-family: 'Poppins', sans-serif;
	background-color: $color-white;
	color: $primary-color-700;
	
	
}
</style>