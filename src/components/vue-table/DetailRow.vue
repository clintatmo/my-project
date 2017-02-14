<template>
    <div @click="onClick">
      <div class="inline field">
        <label>Name: </label>
        <span>{{rowData.name}}</span>
      </div>
      <div class="inline field">
        <label>Description: </label>
        <span>{{rowData.description}}</span>
      </div>
      <div class="inline field">
        <label>Id: </label>
        <span>{{rowData.id}}</span>
      </div>
      <div class="inline field">
        <label>Deleted: </label>
        <span>{{rowData.deleted}}</span>
      </div>
    </div>
  </template>

  <script>
  export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    methods: {
      onClick (event) {
        console.log('my-detail-row: on-click', event.target)
      }
    },
  }
  </script>
