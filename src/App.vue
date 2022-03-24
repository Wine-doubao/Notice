<template>
  <div id="nav">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  font-size: calc(0.75vw + 8px);
}
  /* font-size: 23px;
  margin-right: 10px; */
</style>
