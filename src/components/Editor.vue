<template>
  <div>
    <div class="row">
      <div>
        <menuBar>
        </menuBar>
        <monaco-editor></monaco-editor>
      </div>
      <inoutbox></inoutbox>
    </div>
  </div>

</template>

<script>
  import inoutbox from './editor/InOutBox.vue'
  import menuBar from './editor/MenuBar.vue'
  import MonacoEditor from './editor/MonacoEditor.vue'

  export default {
    name: 'editor',
    components: {
      menuBar,
      MonacoEditor,
      inoutbox,
    },
    created () {
      this.$store.dispatch('loadDataFromServer')

    },
    mounted () {
      const ref = this.$route.query.ref || this.$attrs.ref
      if (ref) {
        this.$store.dispatch('firebase/startCodeSharing', {refKey: ref})
      }
      this.checkForFork()
    },
    methods: {
      changeTitle(e) {
        this.$store.commit('setCodeTitle', e.target.value)
      },
      checkForFork(){
        if(localStorage.getItem('forking')==="true") {
          localStorage.removeItem('forking')
          this.$store.commit('changeLanguage', localStorage.forkedLanguage)
          this.$store.commit('uploadCode', localStorage.forkedCode)
          this.$store.commit('fileNameChange', 'code')
          localStorage.removeItem('forkedLanguage')
          localStorage.removeItem('forkedCode')
        }
      }
    }
  }
</script>

<style>
  .btn-group .btn {
    margin: 0;
    padding: 0 12px;
    height: 40px;
  }

  .headPanel {
    height: 40px !important;
    padding: 0 15px !important;
  }

  .btn span {
    font-size: 11px;
    font-weight: 700 !important;
  }

  .btn-menu {
    color: #fff !important;
    background-color: transparent;
    margin: auto 0;
  }

  .btn-menu:hover, .btn-menu:active, .btn-menu:focus {
    color: #e31d3b !important;
    box-shadow: none !important;
  }

  .btn i {
    font-size: 12px;
  }

  .status-bar {
    padding: 0px 25px !important;
    font-family: sans-serif;
    font-weight: 600;
    font-size: 14px;
    border-top: 1px solid #1e1e1e;
    width: 100%;
    position: absolute;
    bottom: 0px;
    z-index: 10;
    background-color: #202020;
    height: 20px;
  }

  .status-bar #file-name-input {
    font-style: italic;
  }
</style>
