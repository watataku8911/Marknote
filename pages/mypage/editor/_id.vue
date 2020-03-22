<template>
<div id="create">
    <Header></Header>
    <div id="markdown">
        <input type="text" class="md-heading-editor" name="md-heading-editor" placeholder="ノート一覧に表示される名前を入力(必須)" v-model="title">
        <!--Markdown出力-->
        <div class="loading"><pulse-loader :loading="loadingFlg"></pulse-loader></div>
        <textarea id="edit" name="edit" placeholder="マークダウンで記入してください(必須)" v-model="body"></textarea>
        <div id="preview" v-html="markdown()"></div>
        <!--***************-->
    </div>
    <transition name="right">
        <div class="errMsg" v-show="isErrMsgFlg">
            <p v-if="isTitleFlg"><font color="red">タイトルは必須です。</font></p>
            <p v-if="isBodyFlg"><font color="red">記事が入力されていません。</font></p>
            <p v-if="isMaxCountFlg"><font color="red">750文字以下でお願いします。</font></p>
        </div>
    </transition>
    <div class="footer">
        <button id="submit_button" @click="edit">編集</button>
    </div>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import Header from '@/components/header.vue'

import marked from "marked";

import hljs from "highlightjs";


export default {
    components: { 
        Header,
        PulseLoader
    },
    data() {
        return {
            id: this.$route.params.id,           //送られてきたノートの番号
            title: "",//タイトル
            body: "",//内容
            uid: "",//ログインユーザーID
            loadingFlg: false,//スピナーフラグ
            isTitleFlg: false,//タイトルフラグ
            isBodyFlg: false,//記事フラグ
            isMaxCountFlg: false,
            isErrMsgFlg: false
        }
    },
    mounted() {
         firebase.auth().onAuthStateChanged((user)=> {
            if (user != null) {
                this.uid = user.uid;
                this.getFirebase();
            } else {
                this.$router.push('/');
            }
        })
    },
    methods: {
        markdown() {
            return marked(this.body);
        },
        getFirebase() {
            //Firebase取得
            var database = firebase.database();
            let markdown_notes = "markdown_notes_" + this.uid;
            database.ref(markdown_notes).child(this.id).on("value", (data)=> {
                if (data) {
                    var noteData = data.val();
                    this.title = noteData.title;
                    this.body = noteData.body;
                }
            });
        },
        edit() {
            //Firebase保存
            var errFlg = false;
            if(this.title.length == 0) {
                this.isTitleFlg = true;
                this.isErrMsgFlg = true;
                errFlg = true;
            } else {
                this.isTitleFlg = false;
                this.isErrMsgFlg = false;
                errFlg = false;
            }
            if(this.body.length == 0) {
                this.isBodyFlg = true;
                this.isErrMsgFlg = true;
                this.isMaxCountFlg = false;
                errFlg = true;
            } else if(this.body.length == 750) {
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

            if(!errFlg) {
                //Dateオブジェクト生成
                var datetime = new Date();
                //日付取得
                var year = datetime.getFullYear();
                var month = datetime.getMonth() + 1;
                var day = datetime.getDate();
                //時間取得
                var hour = datetime.getHours();
                var minutes = datetime.getMinutes();
                var second = datetime.getSeconds();

                var today = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;

                this.loadingFlg = true;
                var database = firebase.database();
                let markdown_notes = "markdown_notes_" + this.uid;

                database.ref(markdown_notes).child(this.id).update({
                    title: this.title,
                    body: this.body,
                    updated_at: today
                });
                
                setTimeout(() => {
                    this.$router.push("/mypage");
                }, 2500);
                
            }
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    text-decoration: none;
	font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic";
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
         -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
            box-sizing: border-box;
}

html, body {
    width: 100%;
}

/* アニメーション設定 */
.right-enter-active, .right-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.right-enter, .right-leave-to {
  transform: translateX(100vw) translateX(0px);
}

.md-heading-editor {
    width: 100%;
    font-size: 3vh;
}

#markdown{
    padding-top: calc(5vh + 2.5vw);
    padding-bottom: calc(6vh + 2.5vw);
    overflow: hidden;
    height: 100vh;
}

textarea#edit {
	float: left;
	overflow: auto;
	width: 50%;
	height: 100%;
	margin: 0;
	font-size: 1.5vh;
	padding: 10px;
	border-top: 1px solid black;
	resize: none;
}

div#preview {
	float: right;
	overflow: auto;
	width: 50%;
	height: 100%;
	margin: 0;
	padding: 10px;
    border-top: 1px solid black;
}

div#preview blockquote{
   margin-left: 0px;
   padding-left: 20px;
   border-left: 2px solid #CCC;
}

.footer{
	width: 100%;
	overflow: hidden;
	background-color: #ccc;
	height: 60px;
    padding: 4px 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

#submit_button {
    padding: 10px 30px;
    font-size: 1em;
    background-color: #71ff71;
    color: #fff;
    border-style: none;
    float: right;
    margin-top: 5px;
    box-shadow:0px 0px 6px 3px #777;
    -moz-box-shadow:0px 0px 6px 3px #777;
    -webkit-box-shadow:0px 0px 6px 3px #777;
}

.loading{
    position: absolute;
    top: 50%;
    left: 46%;
}

.errMsg {
    border-radius: 20px;
    background-color: aqua;
    width: 30%;
    height:70px;
    padding: 1%;
    position: fixed;
    bottom: 550px;
    left:70%;
}

.subject_no {
	float: right;
    margin-right: 150px;
}
</style>