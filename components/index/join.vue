<template>
<div id="join">
	<h2>UsingSoon</h2>
        <p><a @click="showCreateModal = true">アカウント登録</a></p>
        <createModal v-if="showCreateModal" @close="showCreateModal = false"></createModal>
</div>
</template>

<script>
import createModal from "@/components/index/createModal.vue";
 
export default {
    name: 'app',
    data() {
        return {
            showCreateModal: false
        }
    },
    components: {
        createModal
    }
}

</script>

<style scoped>
@media screen and (min-width:1026px){
  #sub_contents #join{
      text-align: center;
      overflow: hidden;
      clear: left;
  }
  #sub_contents #join h2{
      font-family: 'Anton', sans-serif;
      font-family: 'Lobster', cursive;
      color: #55c500;
      text-align: center;
      margin-bottom: 20vh;
      font-size: 60px;
  }
  #sub_contents #join a{
      display:block;
      margin: 0 auto;
      text-align: center;
      width: 300px;
      padding: 15px 40px;
      font-size: 1.2em;
      background-color:  #00FF7F;
      color: #fff;
      border-style: none;
      margin-top: 20px;
      margin-bottom: 20px;
      box-shadow:0px 0px 6px 3px #777;
      -moz-box-shadow:0px 0px 6px 3px #777;
      -webkit-box-shadow:0px 0px 6px 3px #777;
  }
   #sub_contents #join a:hover{
      box-shadow:0px 0px 0px 0px #777;
      -moz-box-shadow:0px 0px 0px 0px #777;
      -webkit-box-shadow:0px 0px 0px 0px #777;
  }
}

@media screen and (min-width:482px) and (max-width:1025px){
     #sub_contents #join{
      text-align: center;
      overflow: hidden;
      clear: left;
  }
  #sub_contents #join h2{
      font-family: 'Anton', sans-serif;
      font-family: 'Lobster', cursive;
      color: #55c500;
      text-align: center;
      margin-bottom: 20vh;
      font-size: 60px;
  }
  #sub_contents #join a{
      display:block;
      margin: 0 auto;
      text-align: center;
      width: 40vh;
      padding: 15px 40px;
      font-size: 1.2em;
      background-color:  #00FF7F;
      color: #fff;
      border-style: none;
      margin-top: 20px;
      margin-bottom: 20px;
      box-shadow:0px 0px 6px 3px #777;
      -moz-box-shadow:0px 0px 6px 3px #777;
      -webkit-box-shadow:0px 0px 6px 3px #777;
  }
   #sub_contents #join a:hover{
      box-shadow:0px 0px 0px 0px #777;
      -moz-box-shadow:0px 0px 0px 0px #777;
      -webkit-box-shadow:0px 0px 0px 0px #777;
  }
}

@media screen and (max-width:481px){
    #sub_contents #join{
      text-align: center;
      overflow: hidden;
      clear: left;
    }
    #sub_contents #join h2{
        font-family: 'Anton', sans-serif;
        font-family: 'Lobster', cursive;
        color: #55c500;
        text-align: center;
        margin-bottom: 20vh;
    }
    #sub_contents #join a{
        display:block;
        margin: 0 auto;
        text-align: center;
        width: 200px;
        padding: 15px 40px;
        font-size: 1.2em;
        background-color:  #00FF7F;
        color: #fff;
        border-style: none;
        margin-top: 20px;
        margin-bottom: 20px;
        box-shadow:0px 0px 6px 3px #777;
        -moz-box-shadow:0px 0px 6px 3px #777;
        -webkit-box-shadow:0px 0px 6px 3px #777;
    }
    #sub_contents #join a:hover{
        box-shadow:0px 0px 0px 0px #777;
        -moz-box-shadow:0px 0px 0px 0px #777;
        -webkit-box-shadow:0px 0px 0px 0px #777;
    }
}
</style>