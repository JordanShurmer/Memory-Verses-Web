<template>
  <div class="verse-card">
    <div class="header">
      <a class="ref" :href="'http://esv.to/' + verse.reference">{{ verse.reference }}</a>
      <small v-if="!monthOnly" class="date">{{ verse.start.toDateString() }}</small>
      <small v-if="monthOnly" class="date">{{ monthNames[verse.start.getMonth()] }} {{ verse.start.getFullYear() }}</small>
    </div>
    <el-collapse-transition>
      <div v-if="showText" class="body">

        <transition name="fade">
          <span v-if="showContext"
                class="pre-text"
          >
            {{ verse.pre }}
          </span>
        </transition>

        <span class="verse">{{ verse.text }}</span>

        <transition name="fade">
        <span v-if="showContext"
              class="post-text"
        >
          {{ verse.post }}
        </span>
        </transition>
      </div>
    </el-collapse-transition>

    <div v-if="!hideControls" class="controls">
      <div
        v-show="showText && (verse.pre || verse.post)"
        @click="showContext = !showContext"
        class="context"
      >
        <span v-if="!showContext">show context</span>
        <span v-if="showContext">hide context</span>
      </div>
      <div
        v-show="!showContext"
        @click="showText = !showText"
        class="text-control">
        <i v-if="!showText" class="el-icon-caret-bottom"></i>
        <i v-if="showText" class="el-icon-caret-top"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['verse', 'startWithText', "monthOnly", "hideControls"],
    data() {
      return {
        monthNames: ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
        showContext: false,
        showText: this.startWithText
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "themify.scss";

  .verse-card {
    display: flex;
    flex-flow: column nowrap;
    @include themify($themes) {
      color: themed('textColor');
      background-color: themed('backgroundColor');
      border: themed('cardBorders');
      box-shadow: themed('boxShadow');
    }

    .header {
      font-family: 'Spectral', serif;
      padding: 18px 20px;

      .ref {
        font-weight: bold;
        text-decoration: none;
        @include themify($themes) {
          color: themed('textColor');
        }
      }

      .date {
        float: right;
        @include themify($themes) {
          color: themed('altTextColor');
        }
      }
    }

    .body {
      padding: 20px;
      font-size: 1.2rem;
      text-rendering: optimizeLegibility;
      font-family: 'Spectral', serif;
      font-kerning: normal;
      @include themify($themes) {
        border-top: themed('cardBorders');
      }

      .pre-text, .verse, .post-text {
        display: inline;
      }

      .pre-text, .post-text {
        @include themify($themes) {
          color: themed('altTextColor');
        }
      }
    }

    .controls {
      height: 25px;
      line-height: 25px;
      width: 100%;
      text-align: center;
      cursor: pointer;
      display: flex;
      flex-flow: row wrap;
      @include themify($themes) {
        color: themed('altTextColor');
        border-top: themed('cardBorders');
      }

      .context {
        flex: 1 1 50%;
        font-size: 12px;
        &:hover {
          color: cornflowerblue;
        }
      }

      .text-control {
        flex: 1 1 50%;
        &:hover {
          color: cornflowerblue;
        }
      }
    }
  }

  /*Transitions for pre,post text showing*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s
  }

  .fade-enter, .fade-leave-to {
    opacity: .05
  }
</style>
