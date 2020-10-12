<template>
  <div class="detil">
    <Header />
    <div class="note">
      <h1 class="note_title">{{ this.title }}</h1>
      <span class="note_time" v-if="this.updated_at == this.created_at"
        >{{ this.created_at }} 作成</span
      >
      <span class="note_time" v-else>{{ this.updated_at }} 更新</span>
      <div class="detail-preview" v-html="markdown()"></div>
      <div class="footer">
        <nuxt-link
          v-bind:to="{ name: 'mypage-editor-id', params: { id: this.id } }"
        >
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
      title: "",
      body: "",
      created_at: "",
      updated_at: ""
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const database = firebase.database();
        const markdown_notes = "markdown_notes_" + user.uid;
        database
          .ref(markdown_notes)
          .child(this.id)
          .on("value", data => {
            if (data) {
              const noteData = data.val();
              this.title = noteData.title;
              this.body = noteData.body;
              this.created_at = noteData.created_at;
              this.updated_at = noteData.updated_at;
            }
          });
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

@media screen and (min-width: 1026px) {
  .note {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 7vh;
    padding-left: calc(1vh + 2vw);
    padding-right: calc(1vh + 2vw);
    padding-bottom: 7vh;
    height: 100vh;
    overflow: scroll;
  }

  .note_title {
    margin-top: 5px;
    padding-bottom: 5px;
    padding-left: 40px;
    letter-spacing: 2px;
    font-size: 2.5vw;
    border-bottom: solid 5px #aaa;
  }

  .note_time {
    text-align: right;
    display: block;
    padding-right: 18px;
    padding-top: 15px;
    color: #aaa;
    font-size: 2vh;
  }
}

@media screen and (min-width: 482px) and (max-width: 1025px) {
  .note {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .note_title {
    margin-top: 5px;
    padding-bottom: 8px;
    text-align: center;
    letter-spacing: 2px;
    font-size: 5.5vw;
    border-bottom: solid 5px #aaa;
  }

  .note_time {
    text-align: right;
    display: block;
    padding-right: 18px;
    padding-top: 15px;
    color: #aaa;
    font-size: 2vh;
  }
}

@media screen and (max-width: 481px) {
  .note {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
  }

  .note_title {
    margin-top: 5px;
    padding-bottom: 5px;
    letter-spacing: 3px;
    font-size: 8.5vw;
    border-bottom: solid 5px #aaa;
  }

  .note_time {
    text-align: right;
    display: block;
    padding-right: 18px;
    padding-top: 15px;
    color: #aaa;
    font-size: 1vh;
    margin-bottom: 5px;
  }
}
</style>
