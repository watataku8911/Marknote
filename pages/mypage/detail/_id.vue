<template>
  <div class="detil">
    <Header />
    <div class="note">
      <div class="body" v-html="markdown()"></div>
      <div class="footer">
        <nuxt-link v-bind:to="{name:'mypage-editor-id',params:{id:this.id}}">
          <button class="submit-button">編集</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
import Header from "@/components/header.vue";
import marked from "marked";
import hljs from "highlightjs";

export default {
  components: { Header },
  data() {
    return {
      id: this.$route.params.id, //送られてきたノートの番号
      uid: "", //ユーザーID
      title: "",
      body: ""
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.getFirebase();
      } else {
        this.$router.push("/");
      }
    });
    //1時間後ログアウト
    setTimeout(() => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }, 3600000);
  },
  methods: {
    getFirebase() {
      //Firebase取得
      const database = firebase.database();
      const markdown_notes = "markdown_notes_" + this.uid;
      database
        .ref(markdown_notes)
        .child(this.id)
        .on("value", data => {
          if (data) {
            const noteData = data.val();
            this.title = noteData.title;
            this.body = noteData.body;
          }
        });
    },
    markdown() {
      return marked(this.body);
    }
  }
};
</script>

<style>
.detil {
  width: 100%;
}

/* マークダウンプレビュースタイル */
.body table {
  border: solid 1px black;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.body th {
  padding: 8px;
  border: solid 1px black;
  background-color: #eee;
}
tr:nth-child(odd) td {
  background-color: #fff; /* 奇数行の背景色 */
  padding: 8px;
}

tr:nth-child(even) td {
  background-color: #eee; /* 偶数行の背景色 */
  padding: 8px;
}
.body td {
  border: solid 1px black;
}

.body h1,
h2,
h3,
h4,
h5 {
  margin-top: 10px;
  border-bottom: solid 1px #eee;
  margin-bottom: 30px;
}
.body h1 {
  font-size: 2.25em;
}
.body h2 {
  font-size: 2.15em;
}
.body h3 {
  font-size: 2em;
}
.body h4 {
  font-size: 1.75em;
}
.body h5 {
  font-size: 1.25em;
}
.body li {
  line-height: 3vh;
  font-size: 1.25em;
}

.body p {
  font-size: 1.2em;
  line-height: 3.25vh;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.body pre {
  background-color: #364549;
  color: #e3e3e3;
  font-size: inherit;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  line-height: 1.8;
  padding: 1em;
  overflow: scroll;
}
@media screen and (min-width: 1026px) {
  .note {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10vh;
    padding-left: calc(1vh + 2vw);
    padding-right: calc(1vh + 2vw);
    padding-bottom: 10vh;
    height: 100vh;
    overflow: scroll;
  }
}
@media screen and (min-width: 482px) and (max-width: 1025px) {
  .note {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
}
@media screen and (max-width: 481px) {
  .note {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>