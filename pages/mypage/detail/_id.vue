<template>
    <div class="detil">
        <Header></Header>
        <div class="note">
            <div class="body" v-html="markdown()"></div>
            <div class="footer">
                <nuxt-link v-bind:to="{name:'mypage-editor-id',params:{id:this.id}}">
                    <button id="submit_button">編集</button>
                </nuxt-link>
            </div>
        </div>    
    </div>
</template>

<script>
import firebase from '@/plugins/firebase'

import Header from '@/components/header.vue'

import marked from "marked";

import hljs from "highlightjs";


export default {
    components: {Header},
    data() {
        return {
            id: this.$route.params.id,           //送られてきたノートの番号
            uid: "" ,                            //ユーザーID
            title: "",
            body: "",
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                this.uid = user.uid;
                this.getFirebase();
            } else {
                this.$router.push("/");
            }
        });
         //1時間後ログアウト
        setTimeout(()=>{
            firebase.auth().signOut()
            .then(() => {
                this.$router.push('/');
            })
        },3600000); 
    },
    methods: {
        getFirebase() {
            //Firebase取得
            const database = firebase.database();
            const markdown_notes = "markdown_notes_" + this.uid;
            database.ref(markdown_notes).child(this.id).on("value", (data)=> {
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
}
</script>

<style>
.detil {
    width: 100%;
}
@media screen and (min-width:1026px){
    .note {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding-top: calc(5vh + 2vw);
        padding-left: calc(1vh + 2vw);
        padding-right: calc(1vh + 2vw);
        padding-bottom: calc(5vh + 2vw);
        height: 100vh;
        overflow: scroll;
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
        justify-content:space-between ;
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
}
@media screen and (min-width:482px) and (max-width:1025px){
    .note {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding-top: calc(5vh + 2vw);
        padding-bottom: calc(5vh + 2vw);
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
        justify-content:space-between ;
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
    
}
@media screen and (max-width:481px) {
    .note {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        padding-top: calc(6vh + 8vw);
        padding-bottom: calc(6vh + 8vw);
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
        justify-content:space-between ;
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
      background-color: #fff;   /* 奇数行の背景色 */
      padding: 8px;
  }

  tr:nth-child(even) td {
      background-color: #eee;   /* 偶数行の背景色 */
      padding: 8px;
  }
  .body td {
    border: solid 1px black; 
  }

  .body h1,h2,h3,h4,h5 {
    margin-top: 10px;
    border-bottom:  solid 1px #eee;
    margin-bottom: 30px;
  }

  .body p {
    letter-spacing: 1px;
    margin-bottom: 20px;
  }

  .body pre{
    background-color: #364549;
    color: #e3e3e3;
    font-size: inherit;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    line-height: 1.8;
    padding: 1em;
    overflow: scroll;
  }
</style>