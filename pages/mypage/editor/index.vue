<template>
<div id="create">
    <Header />
    <div id="markdown">
        <input type="text" class="md-heading-editor" name="md-heading-editor" placeholder="ノート一覧に表示される名前を入力(必須)" v-model="title">
        <!--Markdown出力-->
        <div class="loading"><pulse-loader :loading="loadingFlg"></pulse-loader></div>
        <textarea id="edit" name="edit" placeholder="マークダウンで記入してください(必須)"  v-model="body"></textarea>
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
        <button class="submit-button" @click="save">保存</button>
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
            } else {
                this.$router.push('/');
            }
        })
        //1時間後ログアウト
        setTimeout(()=>{
            firebase.auth().signOut()
            .then(() => {
                this.$router.push('/');
            })
        },3600000); 
    },
    methods: {
        markdown() {
            return marked(this.body);
        },
        save() {
            //Firebase保存
            let errFlg = false;
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
                const datetime = new Date();
                //日付取得
                const year = datetime.getFullYear();
                const month = datetime.getMonth() + 1;
                const day = datetime.getDate();
                //時間取得
                const hour = datetime.getHours();
                const minutes = datetime.getMinutes();
                const second = datetime.getSeconds();

                const today = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;

                this.loadingFlg = true;
                const database = firebase.database();
                const markdown_notes = "markdown_notes_" + this.uid;
                database.ref(markdown_notes).push({
                    title: this.title,
                    body: this.body,
                    created_at: today,
                    updated_at: today,
                    deleted_flg: false
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

/* アニメーション設定 */
.right-enter-active, .right-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.right-enter, .right-leave-to {
  transform: translateX(100vw) translateX(0px);
}

/* Main */
.md-heading-editor {
    width: 100%;
    font-size: 3.5vh;
}

#markdown{
    position: relative;
    top: 10vh;
    overflow: hidden;
    height: 100vh;
}

textarea#edit {
    float: left;
    overflow: auto;
    width: 50%;
    height: 100%;
    margin: 0;
    font-size: 1.8vh;
    padding: 10px;
    resize: none;
}

div#preview {
    float: right;
    overflow: auto;
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 10px;
    padding-bottom: 15vh;
}

div#preview blockquote{
    margin-left: 0px;
    padding-left: 20px;
    border-left: 2px solid #CCC;
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

</style>