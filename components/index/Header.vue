<template>
  <header class="header">
    <nav class="h-navi">
      <ul>
        <li>
          <a @click="showLoginModal = true">ログイン</a>
        </li>
        <loginModal v-if="showLoginModal" @close="showLoginModal = false"></loginModal>
        <li>
          <a @click="showCreateModal = true">アカウント登録</a>
        </li>
        <createModal v-if="showCreateModal" @close="showCreateModal = false"></createModal>
      </ul>
    </nav>
  </header>
</template>

<script>
import loginModal from "@/components/index/loginModal.vue";
import createModal from "@/components/index/createModal.vue";

export default {
  name: "app",
  data() {
    return {
      showLoginModal: false,
      showCreateModal: false
    };
  },
  components: {
    loginModal,
    createModal
  }
};
</script>



<style>
@media screen and (min-width: 1026px) {
  .header {
    width: 100%;
    position: relative;
  }

  .h-navi {
    width: 200px;
    margin-top: 2%;
    position: absolute;
    right: 3vw;
  }

  .h-navi li {
    margin-top: 3px;
    width: 100%;
    text-align: center;
    background-color: #eee;
    margin-bottom: 20px;
    border-radius: 20px;
  }

  .h-navi a {
    box-shadow: 0px 0px 6px 3px #777;
    -moz-box-shadow: 0px 0px 6px 3px #777;
    -webkit-box-shadow: 0px 0px 6px 3px #777;
    display: block;
    border-radius: 20px;
    padding: 4%;
    line-height: 30px;
  }

  .h-navi li a:hover {
    box-shadow: 0px 0px 0px 0px #777;
    -moz-box-shadow: 0px 0px 0px 0px #777;
    -webkit-box-shadow: 0px 0px 0px 0px #777;
  }
}
@media screen and (min-width: 482px) and (max-width: 1025px) {
  .header {
    width: 100%;
    position: relative;
  }

  .h-navi {
    width: 200px;
    margin-top: 2%;
    position: absolute;
    right: 3vw;
  }

  .h-navi li {
    margin-top: 3px;
    width: 100%;
    text-align: center;
    background-color: #eee;
    margin-bottom: 20px;
    border-radius: 20px;
  }

  .h-navi a {
    box-shadow: 0px 0px 6px 3px #777;
    -moz-box-shadow: 0px 0px 6px 3px #777;
    -webkit-box-shadow: 0px 0px 6px 3px #777;
    display: block;
    border-radius: 20px;
    padding: 4%;
    line-height: 30px;
  }
}

@media screen and (max-width: 481px) {
  .header {
    width: 100%;
    position: relative;
  }

  .h-navi {
    width: 200px;
    margin-top: 2%;
    position: absolute;
    right: 0;
  }

  .h-navi li {
    margin-top: 3px;
    width: 70%;
    text-align: center;
    background-color: #eee;
    margin-bottom: 20px;
    border-radius: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  .h-navi a {
    box-shadow: 0px 0px 6px 3px #777;
    -moz-box-shadow: 0px 0px 6px 3px #777;
    -webkit-box-shadow: 0px 0px 6px 3px #777;
    display: block;
    border-radius: 20px;
    padding: 4%;
    line-height: 30px;
  }
}
</style>
