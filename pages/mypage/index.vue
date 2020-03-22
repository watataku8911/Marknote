<template>
  <div class="mypage">
    <Header></Header>
    <Account></Account>
    <List></List>
  </div>
</template>

<script>
import Header from '@/components/header.vue'

import Account from '@/components/mypage/account.vue'

import List from '@/components/mypage/list.vue'



export default {
  components: {
    Header,
    Account,
    List
  },
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    
}
</style>