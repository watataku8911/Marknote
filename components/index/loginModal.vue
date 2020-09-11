<template>
  <transition name="loginModal">
    <div class="loginOverlay" @click="$emit('close')">
      <div class="loginPanel" @click.stop>
        <p v-if="isLoginErrFlg">
          <font color="red">ログインに失敗しました。</font>
        </p>
        <h2>ログイン</h2>
        <p v-if="isEmailFlg">
          <font color="red">メールアドレスを入力して下さい。</font>
        </p>
        <p v-if="isMachEmailFlg">
          <font color="red">メールアドレスを正しく入力して下さい。</font>
        </p>
        <input
          type="text"
          placeholder="メールアドレス"
          v-model="email"
          value="hoge@gmail.com"
          class="loginHoge"
        />
        <p v-if="isPasswdFlg">
          <font color="red">パスワードを入力して下さい。</font>
        </p>
        <p v-if="isOkPasswdFlg">
          <font color="red">8文字以上の半角英数字で入力して下さい</font>
        </p>
        <p style="text-align:left;">※8文字以上で半角英数字</p>
        <input
          type="password"
          placeholder="パスワード"
          v-model="password"
          value="Passw0rd"
          class="loginHoge"
        />
        <button class="login-button" @click="login" v-show="!isLoadingFlg">ログイン</button>
        <div class="loading">
          <pulse-loader :loading="isLoadingFlg"></pulse-loader>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import firebase from "@/plugins/firebase";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    PulseLoader
  },
  data() {
    return {
      email: "hoge@gmail.com",
      password: "Passw0rd",
      isEmailFlg: false, //メアド未入力フラグ
      isMachEmailFlg: false, //メアドチェックフラグ
      isPasswdFlg: false, //パスワード未入力エラーフラグ
      isOkPasswdFlg: false, //半角英数字チェックフラグ
      isLoginErrFlg: false, //ログインエラーフラグ
      isLoadingFlg: false //ローディングフラグ
    };
  },
  methods: {
    login() {
      const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      const halfWidth = /^([a-zA-Z0-9]{8,})$/;
      let errFrg = false;
      if (this.email.length == 0) {
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
        this.isLoginErrFlg = false;
        errFrg = true;
      }
      if (this.password.length == 0) {
        this.isPasswdFlg = true;
        this.isOkPasswdFlg = false;
        errFrg = true;
      } else if (!halfWidth.test(this.password)) {
        this.isPasswdFlg = false;
        this.isOkPasswdFlg = true;
        errFrg = true;
      } else {
        this.isPasswdFlg = false;
        this.isOkPasswdFlg = false;
        this.isLoginErrFlg = false;
        errFrg = false;
      }
      if (!errFrg) {
        this.isLoadingFlg = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            // ログインしたら飛ぶページを指定
            this.$router.push("/mypage");
          })
          .catch(error => {
            this.isLoginErrFlg = true;
            this.isLoadingFlg = false;
          });
      }
    }
  }
};
</script>

<style>
/*PC*/
@media screen and (min-width: 1026px) {
  .loginOverlay {
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    transition: all 0.5s ease;
  }

  .loginPanel {
    text-align: center;
    width: 30%;
    background: #fff;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .loginPanel h2 {
    font-size: 4vh;
    margin-bottom: 10px;
  }

  .loginModal-enter,
  .loginModal-leave-active {
    opacity: 0;
  }

  .loginModal-enter .panel,
  .loginModal-leave-active .panel {
    top: -200px;
  }

  .loginHoge {
    width: 100%;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    font-size: 3vh;
    margin-bottom: 15px;
  }

  .login-button {
    margin-top: 8px;
    padding: 10px 30px;
    font-size: 1em;
    background-color: #71ff71;
    color: #fff;
    border-style: none;
    box-shadow: 0px 0px 6px 3px #777;
    -moz-box-shadow: 0px 0px 6px 3px #777;
    -webkit-box-shadow: 0px 0px 6px 3px #777;
  }
}

@media screen and (min-width: 482px) and (max-width: 1025px) {
  .loginOverlay {
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    transition: all 0.5s ease;
  }

  .loginPanel {
    text-align: center;
    width: 80%;
    background: #fff;
    padding: 2vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .loginPanel h2 {
    margin-bottom: 25px;
    font-size: 3vw;
  }

  .loginModal-enter,
  .loginModal-leave-active {
    opacity: 0;
  }

  .loginModal-enter .panel,
  .loginModal-leave-active .panel {
    top: -200px;
  }

  .loginHoge {
    width: 100%;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    font-size: 20px;
    margin-bottom: 15px;
  }

  .login-button {
    margin-top: 8px;
    padding: 10px 30px;
    font-size: 1em;
    background-color: #71ff71;
    color: #fff;
    border-style: none;
    box-shadow: 0px 0px 6px 3px #777;
    -moz-box-shadow: 0px 0px 6px 3px #777;
    -webkit-box-shadow: 0px 0px 6px 3px #777;
  }
}

@media screen and (max-width: 481px) {
  .loginOverlay {
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    transition: all 0.5s ease;
  }

  .loginPanel {
    text-align: center;
    width: 80%;
    background: #fff;
    padding: 2vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .loginPanel h2 {
    font-size: 3vh;
    margin-bottom: 30px;
  }

  .loginModal-enter,
  .loginModal-leave-active {
    opacity: 0;
  }

  .loginModal-enter .panel,
  .loginModal-leave-active .panel {
    top: -200px;
  }

  .loginHoge {
    width: 100%;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    font-size: 20px;
    margin-bottom: 15px;
  }

  .login-button {
    margin-top: 8px;
    padding: 10px 30px;
    font-size: 1em;
    background-color: #71ff71;
    color: #fff;
    border-style: none;
    box-shadow: 0px 0px 6px 3px #777;
    -moz-box-shadow: 0px 0px 6px 3px #777;
    -webkit-box-shadow: 0px 0px 6px 3px #777;
  }
}
</style>