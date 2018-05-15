<template>
  <div id="app" :class="`theme-${activeTheme}`">
    <div class="app-container">

      <div class="header">
        <h1 class="title">📖 Memory Verses</h1>
        <theme-picker class="themes" v-model="activeTheme"></theme-picker>
      </div>

      <h2>Current Verse</h2>
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
  import VerseCard from './VerseCard.vue';
  import ThemePicker from './ThemePicker.vue';

  export default {
    name: 'app',
    components: {
      'verse-card': VerseCard,
      'theme-picker': ThemePicker,
    },
    data() {
      return {
        activeTheme: localStorage.getItem("activeTheme") || "light",
        verses: [{
          start: new Date(2017, 10, 5),
          reference: '2 Timothy 3:16-17',
          pre: "",
          text: 'All scripture is breathed out by God and is profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.',
          post: ""
        }, {
          start: new Date(2017, 10, 12),
          reference: 'Galatians 2:20',
          pre: 'For through the law I died to the law, so that I might live to God.',
          text: 'I have been crucified with Christ, it is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me.',
          post: 'I do not nullify the grace of God, for if righteousness were through the law, then Christ died for no purpose.'
        }, {
          start: new Date(2017, 10, 19),
          reference: 'John 5:39-40',
          pre: '[Jesus talking to the pharisees] And the Father who sent me has himself borne witness about me. His voice you have never heard, his form you have never seen, and you do not have his word abiding in you, for you do not believe the one whom he has sent.',
          text: 'You search the Scriptures because you think that in them you have eternal life; and it is they that bear witness about me, yet you refuse to come to me that you may have life.',
          post: ''
        }, {
          start: new Date(2017, 10, 26),
          reference: 'Colossians 3:16-17',
          pre: 'Put on then, as God\'s chosen ones, holy and beloved, compassionate hearts, kindness, humility, meekness, and patience, bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive. And above all these put on love, which binds everything together in perfect harmony. And let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful.',
          text: 'Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in your hearts to God. And whatever you do, in word or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him.',
          post: 'Wives, submit to your husbands, as is fitting in the Lord. Husbands, love your wives, and do not be harsh with them.'
        }, {
          start: new Date(2017, 11, 3),
          reference: 'Isaiah 55:8-9',
          pre: 'Seek the Lord while he may be found; call upon him while he is near; let the wicked forsake his way, and the unrighteous man his thoughts; let him return to the Lord, that he may have compassion on him, and to our God, for he will abundantly pardon.',
          text: 'For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord. For as the heavens are higher than the earth, so are my ways higher than your ways and my thoughts than your thoughts.',
          post: ""
        }, {
          start: new Date(2017, 11, 10),
          reference: 'Hebrews 1:3-4',
          pre: 'Long ago, at many times and in many ways, God spoke to our fathers by the prophets, but in these last days he has spoken to us by his Son, whom he appointed the heir of all things, through whom also he created the world.',
          text: 'He is the radiance of the glory of God and the exact imprint of his nature, and he upholds the universe by the word of his power. After making purification for sins, he sat down at the right hand of the Majesty on high, having become as much superior to angels as the name he has inherited is more excellent than theirs.',
          post: 'For to which of the angels did God ever say, “You are my Son, today I have begotten you”?'
        }, {
          start: new Date(2017, 11, 17),
          reference: 'Psalm 127:2',
          pre: 'Unless the Lord builds the house, those who build it labor in vain. Unless the Lord watches over the city, the watchman stays awake in vain.',
          text: 'It is in vain that you rise up early and go late to rest, eating the bread of anxious toil; for he gives to his beloved sleep.',
          post: '',
        }, {
          start: new Date(2017, 11, 24),
          reference: 'Isaiah 9:6',
          pre: '',
          text: 'For to us a child is born, to us a son is given; and the government shall be upon his shoulder, and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.',
          post: 'Of the increase of his government and of peace there will be no end, on the throne of David and over his kingdom, to establish it and to uphold it with justice and with righteousness from this time forth and forevermore. The zeal of the Lord of hosts will do this.',
        }, {
          start: new Date(2017, 11, 31),
          reference: '2 Corinthians 5:21',
          pre: '',
          text: 'For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God.',
          post: '',
        }, {
          start: new Date(2018, 0, 14),
          reference: 'Proverbs 15:16',
          pre: '',
          text: 'Better is a little with the fear of the Lord than great treasure and trouble with it.',
          post: 'Better is a dinner of herbs where love is than a fattened ox and hatred with it.',
        }, {
          start: new Date(2018, 0, 21),
          reference: 'Psalm 84:11-12',
          pre: 'For a day in your courts is better than a thousand elsewhere. I would rather be a doorkeeper in the house of my God than dwell in the tents of wickedness.',
          text: 'For the Lord God is a sun and shield; the Lord bestows favor and honor. No good thing does he withhold from those who walk uprightly. O Lord of hosts, blessed is the one who trusts in you!',
          post: '',
        }, {
          start: new Date(2018, 1, 4),
          reference: 'Isaiah 41:10',
          pre: 'But you, Israel, my servant, Jacob, whom I have chosen, the offspring of Abraham, my friend; you whom I took from the ends of the earth, and called from its farthest corners, saying to you, “You are my servant, I have chosen you and not cast you off”;',
          text: 'Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.',
          post: 'Behold, all who are incensed against you shall be put to shame and confounded; those who strive against you shall be as nothing and shall perish.',
        }, {
          start: new Date(2018, 1, 18),
          reference: 'Proverbs 18:10',
          pre: '',
          text: 'The name of the Lord is a strong tower; the righteous man runs into it and is safe.',
          post: ''
        }, {
          start: new Date(2018, 1, 25),
          reference: 'Philippians 3:9',
          pre: 'whatever gain I had, I counted as loss for the sake of Christ. Indeed, I count everything as loss because of the surpassing worth of knowing Christ Jesus my Lord. For his sake I have suffered the loss of all things and count them as rubbish, in order',
          text: 'that I may gain Christ and be found in him, not having a righteousness of my own that comes from the law, but that which comes through faith in Christ, the righteousness from God that depends on faith',
          post: '— that I may know him and the power of his resurrection, and may share his sufferings, becoming like him in his death, that by any means possible I may attain the resurrection from the dead.'
        }, {
          start: new Date(2018, 2, 4),
          reference: 'Jeremiah 10:6',
          pre: '',
          text: 'There is none like you, O Lord; you are great, and your name is great in might.',
          post: 'Who would not fear you, O King of the nations? For this is your due; for among all the wise ones of the nations and in all their kingdoms there is none like you.'
        }, {
          start: new Date(2018, 2, 11),
          reference: 'Romans 5:8',
          pre: 'For while we were still weak, at the right time Christ died for the ungodly. For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—',
          text: 'but God shows his love for us in that while we were still sinners, Christ died for us.',
          post: ''
        }, {
          start: new Date(2018, 2, 25),
          reference: 'Ephesians 2:13-15',
          pre: '',
          text: 'But now in Christ Jesus you who once were far off have been brought near by the blood of Christ. For he himself is our peace, who has made us both one and has broken down in his flesh the dividing wall of hostility by abolishing the law of commandments expressed in ordinances, that he might create in himself one new man in place of the two, so making peace',
          post: 'and might reconcile us both to God in one body through the cross, thereby killing the hostility'
        }, {
          start: new Date(2018, 3, 15),
          reference: 'Romans 15:13',
          pre: '',
          text: 'May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope.',
          post: ''
        }, {
          start: new Date(2018, 3, 22),
          reference: 'Psalm 86:11',
          pre: '',
          text: 'Teach me your way, O Lord, that I may walk in your truth; unite my heart to fear your name.',
          post: ''
        }
        ]
        ,
        orderedVerses: []
      }
    },
    watch: {
      activeTheme(val) {
        localStorage.setItem("activeTheme", val);
      }
    },
    computed: {
      currentVerse() {
        return this.orderedVerses[0];
      },
    },
    async created() {
        let querySnapshot = await this.$verses.orderBy("start", "desc").get();
        this.orderedVerses = querySnapshot.docs.map(docSnapshot => {
          let data = docSnapshot.data();
          data.start = new Date(data.start.seconds*1000);
          return data
        });

    }
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
