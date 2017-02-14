<template>
  <div>
    <filter-bar></filter-bar>
    <vuetable ref="vuetable"
      api-url="http://localhost:4500/api/module"
      :fields="fields"
      :css="css"
      :data-path="dataPath"
      pagination-path=""
      :per-page="20"
      :multi-sort="true"
      multi-sort-key="ctrl"
      :sort-order="sortOrder"
      detail-row-component="my-detail-row"
      :append-params="moreParams"
      :query-params="queryParams"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData">
    </vuetable>
    <div>
      <vuetable-pagination-info ref="paginationInfo"
        info-class="pull-left">
      </vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
        :css="cssPagination"
        :icons="icons"
        @vuetable-pagination:change-page="onChangePage">
      </vuetable-pagination>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import Vuetable from '../../vue-table/Vuetable'
import VuetablePagination from '../../vue-table/VuetablePagination'
import VuetablePaginationInfo from '../../vue-table/VuetablePaginationInfo'
import CustomActions from '../../vue-table/CustomActions'
import DetailRow from '../../vue-table/DetailRow'
import FilterBar from '../../vue-table/FilterBar'
import VueEvents from 'vue-events'

Vue.use(VueEvents)

Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)

export default {
  components: {
    Vuetable: Vuetable,
    VuetablePagination: VuetablePagination,
    VuetablePaginationInfo: VuetablePaginationInfo,
    FilterBar: FilterBar
  },
  data () {
  	return {
      css: {
        tableClass: 'table table-striped table-bordered',
        loadingClass: 'loading',
        ascendingIcon: 'glyphicon glyphicon-chevron-up',
        descendingIcon: 'glyphicon glyphicon-chevron-down',
        sortHandleIcon: 'glyphicon glyphicon-menu-hamburger',
      },
      cssPagination: {
        wrapperClass: 'pagination pull-right',
        activeClass: 'btn-primary',
        disabledClass: 'disabled',
        pageClass: 'btn btn-border',
        linkClass: 'btn btn-border',
      },
      icons: {
        first: '',
        prev: '',
        next: '',
        last: '',
      },
      fields: [
        {
          name: '__checkbox',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'id',
          sortField: 'id'
        },
        {
          name: 'name',
          sortField: 'name'
        },
        {
          name: 'description',
          sortField: 'description'
        },
        {
          name: 'deleted',
          sortField: 'deleted',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: '__component:custom-actions',
          title: 'Actions',
          titleClass: 'text-center',
          dataClass: 'text-center'
        }
      ],
      sortOrder: [
        {
          field: 'name',
          sortField: 'name',
          direction: ''
        }
      ],
      moreParams: {},
      queryParams: {
        sort: 'sort',
        page: 'page',
        perPage: 'size'
      },
      dataPath: 'content'
  	}
  },
  methods: {
    allcap (value) {
      return value.toUpperCase()
    },
    genderLabel (value) {
      return value === 'M'
        ? '<span class="label label-warning"><span class="glyphicon glyphicon-star"></span> Male</span>'
        : '<span class="label label-info"><span class="glyphicon glyphicon-heart"></span> Female</span>'
    },
    formatNumber (value) {
      return accounting.formatNumber(value, 2)
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (data, field, event) {
      console.log('cellClicked: ', field.name)
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
  },
  events: {
    'filter-set' (filterText) {
      this.moreParams = {
        'filter': filterText
      }
      Vue.nextTick( () => this.$refs.vuetable.refresh())
    },
    'filter-reset' () {
      this.moreParams = {}
      this.$refs.vuetable.refresh()
      Vue.nextTick( () => this.$refs.vuetable.refresh())
    }
  }
}
</script>
<style>
.pagination {
  margin-top: 0;
}
.btn.btn-border {
  border: 1px solid;
  margin-right: 2px;
}
.vuetable-pagination-info {
  margin-top: 8px !important;
}
</style>
