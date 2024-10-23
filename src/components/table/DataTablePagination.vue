<template>
 
	<div class="gts-print-pagination-container">

		<div class="gts-print-pagination-page-length-container"> 

			<div>
				<span> Rows per page:</span> 
				<span class="gts-print-pagination-page-selected"> {{selectedPageLength}}</span> 
				<span class="gts-print-pagination-icon" @click="togglePagination"><v-icon>{{ "mdi-chevron-down" }}</v-icon></span> 
			</div>
			
			<div v-if="pageLengthDisplayed" class="gts-print-pagination-page-length-menu">
				<span v-for="page in pageLength" :key="page" class="gts-print-pagination-page-length-menu-item" @click="handlePageChange(page)"> {{page}} </span>
			</div>
			
		</div>

		<!-- Total records -->
		<div class="gts-print-pagination-total-records">
			<span> {{ pageStart }} - {{ pageEnd }} of {{ totalRecords }} </span>
		</div>

		<!-- Pagination controls (left/right arrows) -->
		<div class="gts-print-pagination-steps">

      <span 
				class="gts-print-pagination-icon"
        @click="previousPage"
        :class="{ 'disabled': isFirstPage }"
      >
        <v-icon>{{ "mdi-chevron-left" }}</v-icon>
      </span>

      <span
        class="gts-print-pagination-icon"
        @click="nextPage"
        :class="{ 'disabled': isLastPage }"
      >
        <v-icon>{{ "mdi-chevron-right" }}</v-icon>
      </span>

    </div>

	</div>
  
</template>
  
<script>
  
export default {
  
	name: "DataTablePagiation",
  
	emits : ['change-page'],

	props: {
		
		pageLength: {
			type: Array,
			required: false,
			default(){
				return [10, 20, 25, 50, 100]
			}
		},

		totalRecords: {
			type: Number,
			required: true
		},

	},
  
	data () {
		return {
			selectedPageLength: this.pageLength[0],
      currentPage: 1,
      pageLengthDisplayed: false
		}
	},

	computed: {

		totalPages() {
      return Math.ceil(this.totalRecords / this.selectedPageLength);
    },

		pageStart() {
      return (this.currentPage - 1) * this.selectedPageLength + 1;
    },

    pageEnd() {
      let end = this.currentPage * this.selectedPageLength;
      return end > this.totalRecords ? this.totalRecords : end;
    },

    isFirstPage() {
      return this.currentPage === 1;
    },

    isLastPage() {
      return this.currentPage === this.totalPages;
    }
  },
  
	methods : {

		handlePageChange(page){
			this.selectedPageLength = page;
			this.pageLengthDisplayed = !this.pageLengthDisplayed;
			console.log("selected - page ", this.selectedPageLength);
		},

		togglePagination(){
			this.pageLengthDisplayed = !this.pageLengthDisplayed;
			console.log("pageLengthDisplayed", this.pageLengthDisplayed);
		},

		nextPage() {
      
			this.currentPage++;
			console.log("nextPage ", this.currentPage);
			this.$emit("change-page", this.currentPage);
     
    },

    previousPage() {
			this.currentPage--;
			console.log("previousPage ", this.currentPage);
			this.$emit("change-page", this.currentPage);
      
    }

	}
  
}
</script>
  
<style lang="scss">
  
.gts-print-pagination-container {
		display: flex;
		justify-content: end;
		align-items: center;
		width: 1100px;
		margin: 0px auto;

	.gts-print-pagination-icon{
		cursor: pointer;
		color: $primary-color700;
		&.disabled {
      pointer-events: none;
      color: grey;
    }
	}

	.gts-print-pagination-page-length-container{
		position: relative;
		margin: 0px 10px;
		font-weight: 500;
		font-size: 14px;
		color: $primary-color500;

		.gts-print-pagination-page-selected{
			margin: 0px 5px;
		}
		.gts-print-pagination-page-length-menu{
			color: $primary-color600;
			position: absolute;
			right: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 70px;
			border-radius: 8px;
			border: 1px solid $primary-color400;
			background-color: $color-white;
			margin-bottom: 10px;

			.gts-print-pagination-page-length-menu-item{
				padding: 5px;
				width: 100%;
				height: 30px;
				font-weight: 500;
				text-align: center;
				line-height: 24px;
				color: $primary-color500;
				border-radius: 4px;
				cursor: pointer;
			}

			.gts-print-pagination-page-length-menu-item:hover{
				background: $primary-color500;
				color: $color-white;
				transition: background-color 0.5s ease-out;
			}
		}
	}

	.gts-print-pagination-total-records{
		margin: 0px 10px;
		color: $primary-color500;
	}

	.gts-print-pagination-steps{
		margin: 0px 10px;
	}

}
  
</style>