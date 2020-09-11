<template>
  <div id="left">
    <h2>メモ一覧</h2>
    <div class="memo_field">
      <p v-if="listFlg">
        <font color="red">ノート一覧には最低1つは残して置いてください。</font>
      </p>
      <div class="con" v-for="item in this.list" v-bind:key="item.id">
        <p>
          <a href="javascript:void[0]" class="deleteMemo" @click="deleteMemo(item.id)">×</a>
          <nuxt-link
            v-bind:to="{name:'mypage-detail-id',params:{id:item.id}}"
          >{{split(item.title, 8)}}</nuxt-link>
        </p>
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
      list: [], // 最新状態はここにコピーされる
      listFlg: false
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.getFirebase();
      }
    });
  },
  methods: {
    getFirebase() {
      //Firebase取得
      const database = firebase.database();
      const markdown_notes = "markdown_notes_" + this.uid;
      database
        .ref(markdown_notes)
        .orderByChild("deleted_flg")
        .startAt(false)
        .endAt(false) //「where deleted_flg = false」と同じ
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
    },
    deleteMemo(id) {
      if (this.list.length <= 1) {
        this.listFlg = true;
      } else {
        if (window.confirm("このメモを削除しますか？")) {
          var database = firebase.database();
          let markdown_notes = "markdown_notes_" + this.uid;
          database
            .ref(markdown_notes)
            .child(id)
            .update({
              deleted_flg: true
            });
        }
        this.listFlg = false;
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
    width: 55%;
    float: left;
    padding-top: 10vh;
    margin-left: 5.5%;
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
  }

  .con a {
    font-size: calc(2vh + 13px);
    display: block;
    color: #00afec;
    text-align: center;
  }

  .deleteMemo {
    width: 6vh;
    height: 6vh;
    box-shadow: 1px 1px 8px 0px #000;
    border-radius: 50%;
    display: block;
    padding-bottom: 2vh;
  }
}

@media screen and (min-width: 482px) and (max-width: 1025px) {
  #left {
    overflow: auto;
    width: 100%;
    float: none;
    margin-top: 25px;
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
  }

  .con a {
    display: block;
    color: #00afec;
    text-align: center;
  }

  .deleteMemo {
    width: 50px;
    height: 50px;
    box-shadow: 1px 1px 8px 0px #000;
    border-radius: 50%;
    display: block;
  }
}
@media screen and (max-width: 481px) {
  #left {
    overflow: auto;
    width: 100%;
    float: none;
    margin-top: 5px;
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
  }

  .con a {
    font-size: 3.5vh;
    display: block;
    color: #00afec;
    text-align: center;
  }

  .deleteMemo {
    width: calc(5vh + 3px);
    height: calc(5vh + 3px);
    font-size: 3vh;
    box-shadow: 1px 1px 8px 0px #000;
    border-radius: 50%;
    display: block;
    padding-bottom: 1vh;
  }
}
</style>