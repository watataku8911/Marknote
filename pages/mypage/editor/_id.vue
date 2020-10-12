<template>
  <div id="create">
    <Header />
    <div id="markdown">
      <input
        type="text"
        class="md-heading-editor"
        name="md-heading-editor"
        placeholder="ノート一覧に表示される名前を入力(必須)"
        v-model="title"
      />
      <!--Markdown出力-->
      <div class="loading">
        <pulse-loader :loading="loadingFlg"></pulse-loader>
      </div>
      <textarea
        id="edit"
        name="edit"
        placeholder="マークダウンで記入してください(必須)"
        v-model="body"
      ></textarea>
      <div class="edit-preview" v-html="markdown()"></div>
      <!--***************-->
    </div>
    <transition name="right">
      <div class="errMsg" v-show="isErrMsgFlg">
        <p v-show="isTitleFlg">
          <font color="red">タイトルは必須です。</font>
        </p>
        <p v-show="isBodyFlg">
          <font color="red">記事が入力されていません。</font>
        </p>
        <p v-show="isMaxCountFlg">
          <font color="red">750文字以下でお願いします。</font>
        </p>
      </div>
    </transition>
    <div class="footer">
      <button class="submit-button" @click="edit" v-show="!buttonFlg">
        編集
      </button>
      <button class="submit-button" @click="save" v-show="buttonFlg">
        保存
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Header from "@/components/header.vue";
import marked from "marked";
import hljs from "highlightjs";
import { getDate } from "../../../functions/function";

export default {
  components: {
    Header,
    PulseLoader
  },
  data() {
    return {
      id: this.$route.params.id, //送られてきたノートの番号
      title: "", //タイトル
      body: "", //内容
      uid: "", //ログインユーザーID

      buttonFlg: false, //編集ボタンか新規作成のボタンか？
      loadingFlg: false, //スピナーフラグ
      isTitleFlg: false, //タイトルフラグ
      isBodyFlg: false, //記事フラグ
      isMaxCountFlg: false,
      isErrMsgFlg: false
    };
  },
  mounted() {
    let id = window.location.pathname.split("/mypage/editor/")[1];

    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.uid = user.uid;
        if (id === "new") {
          //create
          this.buttonFlg = true; //新規作成ボタンに
        } else {
          //update
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
              }
            });

          this.buttonFlg = false; //編集ボタンに
        }
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
    },
    edit() {
      let errFlg = false;
      errFlg = this.validations();

      if (!errFlg) {
        const today = getDate(); // 日時を取得する関数
        this.loadingFlg = true;
        const database = firebase.database();
        const markdown_notes = "markdown_notes_" + this.uid;

        database
          .ref(markdown_notes)
          .child(this.id)
          .update({
            title: this.title,
            body: this.body,
            updated_at: today
          });

        setTimeout(() => {
          this.$router.push("/mypage");
        }, 2500);
      }
    },
    save() {
      let errFlg = false;
      errFlg = this.validations();

      if (!errFlg) {
        const today = getDate(); // 日時を取得する関数
        this.loadingFlg = true;
        const database = firebase.database();
        const markdown_notes = "markdown_notes_" + this.uid;
        database.ref(markdown_notes).push({
          title: this.title,
          body: this.body,
          created_at: today,
          updated_at: today
        });
        setTimeout(() => {
          this.$router.push("/mypage");
        }, 2500);
      }
    },
    validations() {
      let errFlg;
      if (this.title.length == 0) {
        this.isTitleFlg = true;
        this.isErrMsgFlg = true;
        errFlg = true;
      } else {
        this.isTitleFlg = false;
        this.isErrMsgFlg = false;
        errFlg = false;
      }
      if (this.body.length == 0) {
        this.isBodyFlg = true;
        this.isErrMsgFlg = true;
        this.isMaxCountFlg = false;
        errFlg = true;
      } else if (this.body.length == 750) {
        this.isBodyFlg = false;
        this.isErrMsgFlg = true;
        this.isMaxCountFlg = true;
        errFlg = true;
      } else {
        this.isBodyFlg = false;
        this.isErrMsgFlg = false;
        this.isMaxCountFlg = false;
        errFlg = false;
      }
      return errFlg;
    }
  }
};
</script>

<style>
.md-heading-editor {
  width: 100%;
  font-size: 3.5vh;
}

#markdown {
  position: relative;
  top: 7vh;
  overflow: hidden;
  height: 100vh;
  padding-bottom: 15vh;
}

textarea#edit {
  float: left;
  overflow: auto;
  width: 50%;
  height: 100%;
  margin: 0;
  font-size: 1.8vh;
  resize: none;
  padding-bottom: 15vh;
}

.edit-preview {
  position: absolute;
  right: 0;
  float: right;
  overflow: auto;
  width: 49%;
  height: 100%;
  margin: 0;
  padding-bottom: 15vh;
}

.errMsg {
  border-radius: 20px;
  background-color: aqua;
  width: 30%;
  height: 70px;
  padding: 1%;
  position: fixed;
  bottom: 550px;
  left: 70%;
}
</style>
