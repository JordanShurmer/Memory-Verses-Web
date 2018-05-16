<template>
  <div class="wrapper">
      <div
        @click="toggle"
        class="picker"
        :class="activeTheme"
      ></div>
  </div>
</template>

<script>
  export default {
    computed: {
      activeTheme() {
        return this.$store.state.activeTheme;
      }
    },
    methods: {
      toggle() {
        this.$store.commit("toggleTheme");
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "themes.scss";

  .picker {
    border-radius: 100%;
    height: 100%;
    width: 100%;

    &.dark {
      background: map_get(map_get($themes, 'light'), 'backgroundColor');
    }
    &.light {
      background: map_get(map_get($themes, 'dark'), 'backgroundColor');
    }

  }
</style>
