<template>
    <div class="header">
    <h1 class="h-logo">Mark&nbsp;Note</h1>
        <div class="pc_nav">
            <div class="btn">
                <nuxt-link to="/mypage">
                    <img src="@/assets/icon_158070.svg" width="30" height="30" alt="">
                </nuxt-link>
            </div>
            <div class="btn">
                <nuxt-link to="/mypage/editor">
                    <img src="@/assets/icon_110920.svg" width="30" height="30" alt="">
                </nuxt-link>
            </div>
            <div class="btn">
                <a tabindex="-1" @click="logout">
                    <img src="@/assets/logout-rounded.png" width="30" height="30" alt="">
                </a>
            </div>
        </div>
        <div class="mobile_nav">
            <div class="navToggle" @click="naviOpen" :class="{'is-active': active}">
                <span></span><span></span><span></span>
            </div>
        </div>

        <transition name="top">
            <nav class="navi" v-show="navi">
                <div class="top">
                    <a tabindex="-1" @click="showUpdateModal = true">
                        <img v-bind:src="this.user.photoURL" />
                    </a>
                    <updateModal v-if="showUpdateModal" @close="showUpdateModal = false"></updateModal>
                    <p v-if="this.user.displayName == null" class="msg">
                        <font color="red">※アカウント編集にてアカウント名等登録してください。</font>
                    </p>
                    <p class="name" v-else>{{ truncate(this.user.displayName, 7) }}</p>
                    <p class="uid">@{{ this.user.uid }}</p>
                </div>
                <div class="btn_area">
                    <div class="btn">
                        <nuxt-link to="/mypage">
                            <img src="@/assets/icon_158070.svg" alt="">
                        </nuxt-link>
                    </div>
                    <div class="btn">
                        <a tabindex="-1" @click="logout">
                            <img src="@/assets/logout-rounded.png" alt="">
                        </a>
                    </div>
                    <div class="btn">
                        <a tabindex="-1">
                            <img src="@/assets/icon_119110.svg" width="20" height="20" alt="">
                        </a>
                    </div>
                    <!-- ユーザー削除ボタンは押せないようになっています -->
                    <!-- <div class="btn">
                        <a tabindex="-1" @click="deleteUser" disabled="false">
                            <img src="@/assets/icon_119110.svg" width="20" height="20" alt="">
                        </a>
                    </div> -->
                </div>
            </nav>
        </transition>

    </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import updateModal from "@/components/mypage/updateModal.vue";


export default {
    data() {
        return {
            user: [],
            showUpdateModal: false,
            active: false,
            navi: false
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
        naviOpen() {
            this.active = !this.active;
            this.navi = !this.navi;
        },
        naviClose() {
            this.active = false;
            this.navi = false;
        },
        logout() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.push('/');
            })
        },
        deleteUser() {
            if(window.confirm('アカウントを削除しますか？')) {
                const user = firebase.auth().currentUser;

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

<style scoped>
@media screen and (min-width:1026px){
    .header{
        z-index: 999;
        position: fixed;
        top:0;
        overflow: hidden;
        width: 100%;
        background-color: #55c500;
        height: 10vh;
        border-bottom: solid 1px black;
    }

   .h-logo {
        position: absolute;
        top: 50%;
        transform: translateY(-50%) translateX(50%);
        -webkit-transform: translateY(-50%) translateX(50%);
        width: 15%;
        font-size: 35px;
        font-family: 'Anton', sans-serif;
        font-family: 'Lobster', cursive;
        color: white;
        float: left;
        font-size: 2.5em;
    }

    .pc_nav {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%) translateX(10%);
        -webkit-transform: translateY(-50%) translateX(10%);
        margin-right: 5%;
        text-align: center;
        display: flex;
        width:  15%;
        justify-content: space-around;
    }

    .pc_nav .btn{
        position: relative;
        width: 10%;
        padding: 3%;
        width: 50px;
        height:50px;
        background-color: white;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
    }

    .pc_nav .btn img {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translateY(-50%) translateX(50%);
        -webkit-transform: translateY(-50%) translateX(50%);
    }

    .header .pc_nav .btn a {
        display: block;
    }
}

@media screen and (min-width:482px) and (max-width:1025px){
    .header{
        overflow: hidden;
        width: 100%;
        background-color: #55c500;
        height: 70px;
        border-bottom: solid 1px black;
    }

    .header h1{
        padding-top: 12px;
        margin-left: 5%;
        width: 15%;
        font-family: 'Anton', sans-serif;
        font-family: 'Lobster', cursive;
        color: white;
        float: left;
        font-size: 2.5em;
    }

    .header .pc_nav {
        display: none;
    }

    .header .navi {
        width: 75%;
        background-color: #eee;
        position: fixed;
        top: 0%;
        right: 0%;
        height: 100vh;
       
    }

    .header .navi .top {
        margin-top: 20%;
        padding-left: 5%;
    }

    .header .navi .top img{
        background-color: #f4f4f4;
        border-radius: 50%;
        box-shadow:1px 1px 8px 0px #000;
        width: 10vh;
        height: 10vh;
        margin-bottom: 1vh;
    }

    .header .navi .top .msg {
        letter-spacing: 1px;
        width: 60%;
    }

    .header .navi .top .name{
        letter-spacing: 3px;
        font-size: 3em;
        font-weight: bold;
        margin-bottom: 1vh;
    }

    .header .navi .top .uid{
        font-size: 1em;
        font-weight: bold;
        color: #666;
        word-break: break-all;
    }

    .header .navi .btn_area {
        position: absolute;
        bottom:0%;
        right: 0%;
        padding-bottom: 20%;
        padding-right: 20%;
    }

    .header .navi .btn{
        padding: 15%;
        width: 11vh;
        height: 11vh;
        background-color: white;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
        margin-top: 30%;
        position: relative;
    }

    .header .navi .btn img {
        width: 6vh;
        height: 6vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .header .navi .btn a {
        display: block;
    }

    .navToggle {
        display: block;
        position: fixed;    /* bodyに対しての絶対位置指定 */
        right: 13px;
        top: 12px;
        width: 42px;
        height: 51px;
        cursor: pointer;
        z-index: 999;
        text-align: center;
    }
    
    .navToggle span {
        display: block;
        position: absolute;    /* .navToggleに対して */
        width: 30px;
        border-bottom: solid 3px #000;
        -webkit-transition: .35s ease-in-out;
        -moz-transition: .35s ease-in-out;
        transition: .35s ease-in-out;
        left: 6px;
    }
    
    .navToggle span:nth-child(1) {
        top: 9px;
    }
    
    .navToggle span:nth-child(2) {
        top: 18px;
    }
    
    .navToggle span:nth-child(3) {
        top: 27px;
    }
    
    .navToggle span:nth-child(4) {
        border: none;
        color: #eee;
        font-size: 9px;
        font-weight: bold;
        top: 34px;
    }

    /* 最初のspanをマイナス45度に */
    .navToggle.is-active span {
        top: 18px;
        left: 6px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    
    .navToggle.is-active span:nth-child(2),
    .navToggle.is-active span:nth-child(3) {
        top: 18px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
    }
}

@media screen and (max-width:481px){
    .header{
        overflow: hidden;
        width: 100%;
        background-color: #55c500;
        height: 70px;
        border-bottom: solid 1px black;
    }

    .header h1{
        padding-top: 10px;
        margin-left: 5%;
        width: 15%;
        font-family: 'Anton', sans-serif;
        font-family: 'Lobster', cursive;
        color: white;
        float: left;
        font-size: 2.5em;
    }

    .header .pc_nav {
        display: none;
    }

    .header .navi {
        width: 75%;
        background-color: #eee;
        position: fixed;
        top: 0%;
        right: 0%;
        height: 100vh;
       
    }

    .header .navi .top {
        margin-top: 20%;
        padding-left: 5%;
    }

    .header .navi .top img{
        background-color: #f4f4f4;
        border-radius: 50%;
        box-shadow:1px 1px 8px 0px #000;
        width: 10vh;
        height: 10vh;
        margin-bottom: 1vh;
    }

    .header .navi .top .msg {
        letter-spacing: 1px;
        width: 60%;
    }

    .header .navi .top .name{
        letter-spacing: 3px;
        font-size: 3em;
        font-weight: bold;
        margin-bottom: 2vh;
    }

    .header .navi .top .uid{
        font-size: 1em;
        font-weight: bold;
        color: #666;
        word-break: break-all;
    }

    .header .navi .btn_area {
        position: absolute;
        bottom:0%;
        right: 0%;
        padding-bottom: 20%;
        padding-right: 20%;
    }

    .header .navi .btn{
        padding: 15%;
        width: 11vh;
        height: 11vh;
        background-color: white;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
        margin-top: 30%;
        position: relative;
    }

    .header .navi .btn img {
        width: 6vh;
        height: 6vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .header .navi .btn a {
        display: block;
    }

    .navToggle {
        display: block;
        position: fixed;    /* bodyに対しての絶対位置指定 */
        right: 13px;
        top: 12px;
        width: 42px;
        height: 51px;
        cursor: pointer;
        z-index: 999;
        text-align: center;
    }
    
    .navToggle span {
        display: block;
        position: absolute;    /* .navToggleに対して */
        width: 30px;
        border-bottom: solid 3px #000;
        -webkit-transition: .35s ease-in-out;
        -moz-transition: .35s ease-in-out;
        transition: .35s ease-in-out;
        left: 6px;
    }
    
    .navToggle span:nth-child(1) {
        top: 9px;
    }
    
    .navToggle span:nth-child(2) {
        top: 18px;
    }
    
    .navToggle span:nth-child(3) {
        top: 27px;
    }
    
    .navToggle span:nth-child(4) {
        border: none;
        color: #eee;
        font-size: 9px;
        font-weight: bold;
        top: 34px;
    }

    /* 最初のspanをマイナス45度に */
    .navToggle.is-active span {
        top: 18px;
        left: 6px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    
    .navToggle.is-active span:nth-child(2),
    .navToggle.is-active span:nth-child(3) {
        top: 18px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
    }
}


</style>