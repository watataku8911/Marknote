<template>
    <transition name="createModal">
        <div class="createOverlay" @click="$emit('close')">
            <div class="createPanel" @click.stop>
                <a href="javascript:void[0]" @click="$emit('close')" class="close">×</a>
                <h2>アカウント登録</h2>
                <p v-if="isEmailFlg"><font color="red">メールアドレスを入力して下さい。</font></p>
                <p v-if="isMachEmailFlg"><font color="red">メールアドレスを正しく入力して下さい。</font></p>
                <input type="text" v-model="email" placeholder="メールアドレス" class="hoge">
                <p v-if="isPasswdFlg"><font color="red">パスワードを入力して下さい。</font></p>
                <p v-if="isOkPasswdFlg"><font color="red">8文字以上の半角英数字で入力して下さい</font></p>
                <p style="text-align:left;">※8文字以上で半角英数字</p>
                <input type="password" v-model="password" placeholder="パスワード" class="hoge">
                <input type="button" value="登録" @click="createAccount" v-show="!isLoadingFlg">
                <div class="loading"><pulse-loader :loading="isLoadingFlg"></pulse-loader></div>
            </div>
        </div>
    </transition>
</template>

<script>
import firebase from '@/plugins/firebase'

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    components: { 
        PulseLoader
    },
    data() {
        return {
            email: '',
            password: '',
            isEmailFlg: false,      //メアド未入力フラグ
            isMachEmailFlg: false,  //メアドチェックフラグ
            isPasswdFlg: false,     //パスワード未入力エラーフラグ
            isOkPasswdFlg: false,   //半角英数字チェックフラグ
            isLoadingFlg: false     //ローディングフラグ
        }
    },
    methods: {
        createAccount() {
            var errFrg = false;
            var regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
            var halfWidth = /^([a-zA-Z0-9]{8,})$/;
            var errFrg = false;
            if(this.email.length == 0) {
                this.isEmailFlg = true;
                this.isMachEmailFlg = false;
                errFrg = true; 
            } else if (!regexp.test(this.email)) {
                this.isEmailFlg = false;
                this.isMachEmailFlg = true;
                errFrg = true;
            } else {
                this.isEmailFlg = false;
                this.isMachEmailFlg = false;
                errFrg = true;
            }
            if(this.password.length == 0) {
                this.isPasswdFlg = true;
                this.isOkPasswdFlg = false;
                errFrg = true;
            } else if(!halfWidth.test(this.password)) {
                this.isPasswdFlg = false;
                this.isOkPasswdFlg = true;
                errFrg = true;
            } else {
                this.isPasswdFlg = false;
                this.isOkPasswdFlg = false;
                errFrg = false;
            }    
            if(!errFrg) {
                this.isLoadingFlg = true;
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    // ログインしたら飛ぶページを指定
                    this.$router.push('/mypage');
                });
            }
        }
    }
}
</script>

<style>
@media screen and (min-width:1026px){
    .createOverlay {
        background: rgba(0, 0, 0, .8);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 900;
        transition: all .5s ease;
    }
    
    .createPanel {
        text-align: center;
        line-height: 35px;
        width: 35%;
        background: #fff;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .close {
        width: 50px;
        height:50px;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
        display: block;
        font-size: 30px;
        color: #00AFEC;
        text-align: center;
    }

    .createPanel h2{
        font-size: 4vh;
        margin-bottom:10px;
    }

    .createModal-enter,
    .createModal-leave-active {
        opacity: 0;
    }
    
    .createModal-enter .panel,
    .createModal-leave-active .panel{
        top: -200px;
    }

    .hoge{
        width: 100%;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        font-size:3vh;
        margin-bottom: 15px;
    }
}

@media screen and (min-width:482px) and (max-width:1025px){
    .createOverlay {
        background: rgba(0, 0, 0, .8);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 900;
        transition: all .5s ease;
    }
    
    .createPanel {
        text-align: center;
        line-height: 35px;
        width: 80%;
        background: #fff;
        padding: 2vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .close {
        width: 50px;
        height:50px;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
        display: block;
        font-size: 30px;
        color: #00AFEC;
        text-align: center;
    }

    .createPanel h2{
        margin-bottom:10px;
    }

    .createModal-enter,
    .createModal-leave-active {
        opacity: 0;
    }
    
    .createModal-enter .panel,
    .createModal-leave-active .panel{
        top: -200px;
    }

    .hoge{
        width: 100%;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        font-size:20px;
        margin-bottom: 15px;
    }
}

@media screen and (max-width:481px) {
    .createOverlay {
        background: rgba(0, 0, 0, .8);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 900;
        transition: all .5s ease;
    }
    
    .createPanel {
        text-align: center;
        line-height: 35px;
        width: 80%;
        background: #fff;
        padding: 2vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .close {
        width: 50px;
        height:50px;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
        display: block;
        font-size: 30px;
        color: #00AFEC;
        text-align: center;
    }

    .createPanel h2{
        margin-bottom:10px;
    }

    .createModal-enter,
    .createModal-leave-active {
        opacity: 0;
    }
    
    .createModal-enter .panel,
    .createModal-leave-active .panel{
        top: -200px;
    }

    .hoge{
        width: 100%;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        font-size:20px;
        margin-bottom: 15px;
    }
}
</style>