<template>
  <div class="mypage">
    <Header />
    <Account />
    <List />
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import Header from '@/components/header.vue'
import Account from '@/components/mypage/account.vue'
import List from '@/components/mypage/list.vue'

export default {
  components: {
    Header,
    Account,
    List
  },
  mounted() {
    //1時間後ログアウト
    setTimeout(()=>{
        firebase.auth().signOut()
        .then(() => {
            this.$router.push('/');
        })
    },3600000); 
  }
}

</script>
