<template>
    <div id="right">
        <h2>アカウント情報</h2>
        <div id="table">
            <div class="top">
                <img v-bind:src="this.user.photoURL" width="200" height="200">
                <span v-if="this.user.displayName == null" class="msg"><font color="red">※アカウント編集にてアカウント名等登録してください。</font></span>
                <span class="name" v-else>{{ truncate(this.user.displayName, 7) }}</span>
            </div>
            <div class="sub">
                <p class="uid">@{{ this.user.uid }}</p>
                <p class="email">{{this.user.email}}</p>
            </div>
        </div>
        <div class="buttons">
            <div class="item">
                <a tabindex="-1" @click="showUpdateModal = true">
                    <img src="@/assets/icon_101830.svg" width="30" height="30" alt="">
                </a>
            </div>
            <updateModal v-if="showUpdateModal" @close="showUpdateModal = false"></updateModal>
            <div class="item">
                <a tabindex="-1" @click="deleteUser">
                    <img src="@/assets/icon_119110.svg" width="30" height="30" alt="">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/plugins/firebase'

import updateModal from "@/components/mypage/updateModal.vue";

export default {
    data() {
        return {
            user: [],
            showUpdateModal: false
        }
    },
    components: {
        updateModal
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user != null) {
                this.user = user;
            } else {
                this.$router.push('/');
            }
        })
    },
    methods: {
        deleteUser() {
            if(window.confirm('アカウントを削除しますか？')) {
                var user = firebase.auth().currentUser;

                user.delete().catch(function(error) {
                    alert("予期せぬエラーが発生しました");
                });
            }
        },
        truncate(str, len){
            return str.length <= len ? str: (str.substr(0, len)+"...");
        }
    }
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}
/*PC*/
@media screen and (min-width:1026px){
    #right{
        position: fixed;
        right: 0;
        padding-top: 8px;
        width: 38%;
        padding-right: 2%;
        padding-left: 2%;
        float: right;
        height: 100vh;
        border-left: solid 1px black;
        background-color: #eee;
    }
    #right h2{
        border-bottom: solid 5px black;
        margin-bottom: 25px;
        margin-top: 90px;
        text-align: center;
    }

    #table{
        margin-top: 20px;
        margin-bottom: 50px;
        padding: 1%;
        width: 100%;
        background-color: #fff;
        border-radius: 20px;
        box-shadow:0px 0px 6px 3px #777;
        -moz-box-shadow:0px 0px 6px 3px #777;
        -webkit-box-shadow:0px 0px 6px 3px #777;
    }
    #table .top {
        display: flex;
        width: 95%;
        margin: 0% auto;
    }
    #table img{
        background-color: #f4f4f4;
        border-radius: 50%;
    }
    #table .msg {
        letter-spacing: 1px;
        padding-top:15%; 
        padding-left: 4%;
        width: 60%;
    }
    #table .name{
        letter-spacing: 3px;
        font-size: 4vh;
        font-weight: bold;
        padding-top:calc(-3vh + 120px);
        padding-left: 3vh;
    }
    #table .sub {
        padding: 3%;
        text-align: right;
    }
    #table .uid, 
    #table .email {
        position: relative;
        bottom: 0%;
        right:0%;
        margin-right: 1vh;
        margin-bottom: 1vh;
        line-height: 3vh;
        letter-spacing: 1px;
        font-size: 2vh;
        color: #888;
    }

    .buttons {
        padding-top: 2vh;
        padding-bottom: 2vh;
        width: 20%;
        text-align: center;
        background-color: #55c500;
        border-radius: 20px;
        position: absolute;
        right: 0%;
        bottom: 0%;
        margin-bottom: 5vh;
        margin-right: 5vh;
    }

    .item {
        margin: 0% auto;
        margin-bottom: 20px;
        width: 60px;
        height:60px;
        background-color: white;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
    }

    .item img {
        margin-top: 15px;
    }

    .item a {
        display: block;
    }
}
/*PC*/
@media screen and (min-width:482px) and (max-width:1025px){
    #right {
        display:none;
    }
}

@media screen and (max-width:481px){
    #right {
        display:none;
    }
}

</style>