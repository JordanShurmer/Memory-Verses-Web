<template>
  <div id="app" :class="`theme-${activeTheme}`">
    <div class="app-container">

      <div class="header">
        <h1 class="title">📖 Memory Verses Admin</h1>
        <theme-picker class="themes"></theme-picker>
      </div>

      <h2>Add Verse</h2>

      <span class="label">Reference</span><el-input v-model="reference" label="Reference" placeholder="John 3:16" ></el-input>
      <span class="label">Pre-Text</span><el-input v-model="pre" type="textarea" autosize label="Pre-Text" placeholder="A verse or two for context" ></el-input>
      <span class="label">Text</span><el-input v-model="text" type="textarea" autosize label="Text" placeholder="For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."></el-input>
      <span class="label">Post-Text</span><el-input v-model="post" type="textarea" autosize label="Post-Text" placeholder="For some context" ></el-input>
      <span class="label">Date</span><el-date-picker v-model="startGuess"></el-date-picker>

      <el-button @click="submit" :disabled="!submittable">Submit</el-button>

    </div>
  </div>
</template>

<script>
  import ThemePicker from '../ThemePicker.vue';
  import {mapState} from 'vuex';

  export default {
    name: 'admin',
    components: {
      'theme-picker': ThemePicker,
    },
    data() {
      return {
        reference: '',
        pre: '',
        text: '',
        post: '',
        start: undefined,
      }
    },
    computed: {
      submittable() {
        return this.reference && this.text;
      },
      startGuess: {
        get() {
          if (this.start) return this.start;

          const prevDate = this.currentVerse ? this.currentVerse.start : undefined;
          if (prevDate) prevDate.setDate(prevDate.getDate() + 7);
          return prevDate ? prevDate : undefined;
        },
        set(val) {
          this.start = val
        }
      },
      ...mapState([
                 "activeTheme",
                 "currentVerse"
               ])
    },
    methods: {
      submit() {
        this.$store.dispatch("newVerse", {
          reference: this.reference,
          pre: this.pre,
          text: this.text,
          post: this.post,
          start: this.start
        })
      }
    },
    created() {
      this.$store.dispatch("fetchVerses");
    }
  }
</script>

<style lang="scss" scoped>
  @import "../themify.scss";

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
