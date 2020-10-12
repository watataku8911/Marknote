<template>
  <div id="left">
    <h2>メモ一覧</h2>
    <div class="memo_field">
      <div class="con" v-for="item in this.list" v-bind:key="item.id">
        <span class="memo_field_time" v-if="item.updated_at == item.created_at"
          >{{ item.created_at }} 作成</span
        >
        <span class="memo_field_time" v-else>{{ item.updated_at }} 更新</span>
        <div class="deleteMemo">
          <a href="javascript:void[0]" @click="deleteMemo(item.id)">×</a>
        </div>
        <nuxt-link
          class="link"
          v-bind:to="{ name: 'mypage-detail-id', params: { id: item.id } }"
          >{{ split(item.title, 8) }}</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  data() {
    return {
      uid: "", //ユーザーID
      list: [] // 最新状態はここにコピーされる
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;

        const database = firebase.database();
        const markdown_notes = "markdown_notes_" + this.uid;
        database
          .ref(markdown_notes)
          .orderByChild("updated_at")
          .on("value", data => {
            if (data) {
              const rootList = data.val();
              const key = data.key;
              let list = [];
              // データオブジェクトを配列に変更する
              if (rootList != null) {
                Object.keys(rootList).forEach((val, key) => {
                  rootList[val].id = val;
                  list.push(rootList[val]);
                  this.list = list.reverse();
                });
              }
            }
          });
      }
    });
  },
  methods: {
    deleteMemo(id) {
      console.log(id);
      if (window.confirm("このメモを削除しますか？")) {
        const database = firebase.database();
        const markdown_notes = "markdown_notes_" + this.uid;
        database
          .ref(markdown_notes)
          .child(id)
          .remove();
      }
    },

    //文字を丸めるメソッド
    split(string, max_length) {
      if (string.length > max_length) {
        var modStr = "";
        modStr = string.substr(0, max_length) + "...";
        return modStr;
      }
      return string;
    }
  }
};
</script>

<style scoped>
/*PC*/
@media screen and (min-width: 1026px) {
  #left {
    z-index: 99;
    overflow: auto;
    width: 58%;
    float: left;
    padding-top: 10vh;
    margin-left: 5.5%;
    padding-bottom: 15vh;
  }

  #left h2 {
    font-size: 2em;
    border-bottom: solid 5px black;
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
  }

  .con {
    margin: 0 auto;
    margin-right: 10%;
    background-color: #fff;
    clear: left;
    border: solid 1px black;
    border-radius: 25px;
    margin-top: 25px;
    width: 80%;
    font-size: 30px;
    padding-bottom: 1.5%;
    height: 110px;
  }

  .con .link {
    font-size: calc(2vh + 13px);
    display: block;
    color: #00afec;
    text-align: center;
    clear: right;
    height: 110px;
    padding-top: 4vh;
  }

  .memo_field_time {
    display: block;
    padding-right: 18px;
    padding-top: 5px;
    color: #aaa;
    font-size: 1.5vh;
    float: right;
  }

  .deleteMemo {
    width: 5vh;
    height: 5vh;
    box-shadow: 1px 1px 8px 0px #000;
    border-radius: 50%;
  }

  .deleteMemo a {
    position: relative;
    top: 45%;
    left: 50%;
    -webkit-transform: translate(-26%, -50%);
    transform: translate(-26%, -50%);
    display: block;
    color: #00afec;
  }
}

@media screen and (min-width: 482px) and (max-width: 1025px) {
  #left {
    overflow: auto;
    width: 100%;
    float: none;
    margin-top: 25px;
    padding-bottom: 16vh;
  }

  #left h2 {
    font-size: 2em;
    border-bottom: solid 5px black;
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
  }

  .con {
    margin: 0 auto;
    margin-right: 10%;
    background-color: #fff;
    clear: left;
    border: solid 1px black;
    border-radius: 25px;
    margin-top: 25px;
    width: 80%;
    font-size: 30px;
    padding-bottom: 1.5%;
    height: calc(15vw - 20px);
  }

  .con .link {
    font-size: calc(2vh + 13px);
    display: block;
    color: #00afec;
    text-align: center;
    clear: right;
    height: 10vh;
    padding-top: 1vh;
  }

  .memo_field_time {
    display: block;
    padding-right: 18px;
    padding-top: 5px;
    color: #aaa;
    font-size: 1.5vh;
    float: right;
  }

  .deleteMemo {
    width: 6vw;
    height: 6vw;
    box-shadow: 1px 1px 8px 0px #000;
    border-radius: 50%;
  }

  .deleteMemo a {
    position: relative;
    top: 45%;
    left: 50%;
    -webkit-transform: translate(-22%, -50%);
    transform: translate(-22%, -50%);
    display: block;
    color: #00afec;
  }
}
@media screen and (max-width: 481px) {
  #left {
    overflow: auto;
    width: 100%;
    float: none;
    margin-top: 5px;
    padding-bottom: 18vh;
  }

  #left h2 {
    font-size: 2em;
    border-bottom: solid 5px black;
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
  }

  .con {
    margin: 0 auto;
    margin-right: 10%;
    background-color: #fff;
    clear: left;
    font-size: 20px;
    border: solid 1px black;
    border-radius: 25px;
    margin-top: 25px;
    width: 80%;
    font-size: 30px;
    padding-bottom: 1.5%;
    height: 15vh;
  }

  .con .link {
    font-size: calc(2vh + 13px);
    display: block;
    color: #00afec;
    text-align: center;
    clear: right;
    height: 15vh;
    padding-top: 4vh;
  }

  .memo_field_time {
    display: block;
    padding-right: 18px;
    padding-top: 5px;
    color: #aaa;
    font-size: 1.5vh;
    float: right;
  }

  .deleteMemo {
    width: 5vh;
    height: 5vh;
    box-shadow: 1px 1px 8px 0px #000;
    border-radius: 50%;
  }

  .deleteMemo a {
    position: relative;
    top: 45%;
    left: 50%;
    -webkit-transform: translate(-26%, -50%);
    transform: translate(-26%, -50%);
    display: block;
    color: #00afec;
  }
}
</style>
