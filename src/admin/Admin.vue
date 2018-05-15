<template>
  <div id="app" :class="`theme-${activeTheme}`">
    <div class="app-container">

      <div class="header">
        <h1 class="title">📖 Memory Verses Admin</h1>
        <theme-picker class="themes" v-model="activeTheme"></theme-picker>
      </div>

      <h2>Add Verse</h2>
      <verse-card
        v-if="currentVerse"
        class="current-verse"
        :verse="currentVerse"
        :showText="true"
        :hideControls="true"
      ></verse-card>

      <h2>All Verses</h2>
      <div class="grid">
        <verse-card class="grid-item"
                    v-for="(verse, index) in orderedVerses"
                    :key="index"
                    :verse="verse"
                    :showText="false"
                    :monthOnly="true"
        ></verse-card>
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'admin',
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "themify.scss";

  .app-container {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    padding-bottom: 14px;

    @include themify($themes) {
      background-color: themed('backgroundColor');
      color: themed('textColor');
    }

    .header {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 2em;
        line-height: 2em;
      }

      .themes {
        width: 1.5em;
        height: 1.5em;
        margin-right: 25px;
        align-self: center;
      }
    }

    .current-verse {
      width: 95%;
      margin: auto auto 10vh;
    }

    .verse-card {
    }

    .grid {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
      justify-content: flex-start;
      width: 95%;
      margin: auto;

      .grid-item {
        position: relative;
        margin-top: 15px;
        flex: 0 1 100%;
      }

      @media (min-width: 780px) {
        .grid-item {
          flex-basis: 48%;
          margin-left: 1%;
          margin-right: 1%;
        }
      }

      @media (min-width: 1239px) {
        .grid-item {
          flex-basis: 31%;
        }
      }

      @media (min-width: 1365px) {
        .grid-item {
          flex-basis: 23%;
        }
      }
    }

  }
</style>
