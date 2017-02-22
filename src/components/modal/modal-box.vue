<template id="modal-box-template">
  <div @click="closeModal" v-show="isModalOpen" transition="fade" class="Modal u-overlay animated">
    <div @click.stop="" v-show="isModalOpen" transition="fadeWithMove" class="Modal__container animated">
      <header class="Modal__header">
        <h1>
          @{{ title }}
        </h1>
      </header>

      <div class="Modal__content">
        <slot></slot>
      </div>

      <footer class="Modal__footer"></footer>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'

  export default {
    name: 'modal-box',
    template: '#modal-box-template',
    props:['id', 'title'],
    created:
      function () {
        this.closeModal();
    },
    computed: {
      isModalOpen: function () {
        return this.$root[this.id + 'IsOpen'];
      }
    },
    methods: {
      closeModal: function () {
        this.$root.$set(this.id + 'IsOpen', false);
      }
    }
  }

</script>

<style>


  .Modal__container {
    max-width: 700px;
    width: 90%;
    background: white;
    border-radius: 2px;
    animation-duration: 0.3s;
    animation-delay: 0s;
  }

  .Modal__header {
    border-bottom: 1px solid white;
    padding: 15px 10px;
    background-color: silver;
    color: white;
    border-radius: 2px;
  }

  .Modal__header > h1 {
    font-size: 27px;
    font-weight: normal;
    margin: 0;
  }

  .Modal__content {
    padding: 10px;
  }

  .Modal__footer {
    padding: 5px;
  }

  .u-overlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .naked-link {
    color: inherit;
    text-decoration: inherit;
  }

  /** Control the animation speed **/
  .animated {
    animation-duration: 0.4s;
    -webkit-animation-duration: 0.4s;
    -moz-animation-duration: 0.4s;
  }

</style>
