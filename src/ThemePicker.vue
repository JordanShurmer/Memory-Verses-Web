<template>
  <div class="wrapper">
      <div
        @click="choose('dark')"
        class="picker dark"
      ></div>

      <div
        @click="choose('light')"
        class="picker light"
      ></div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      choose(theme) {
        this.$emit('input', theme);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "themes.scss";

  .theme-light .light {
    display: none;
  }

  .theme-dark .dark {
    display: none;
  }

  .picker {
    border-radius: 100%;
    height: 100%;
    width: 100%;

    &.dark {
      background: map_get(map_get($themes, 'dark'), 'backgroundColor');
    }
    &.light {
      background: map_get(map_get($themes, 'light'), 'backgroundColor');
    }

  }
</style>
