<template>
    <section class="index-contents">
      <div class="index-filter">
        <Header />
        <h1 class="index-title">Mark&nbsp;Note</h1>
      </div>
    </section>
</template>

<script>
import firebase from '@/plugins/firebase'
import Header from '@/components/index/Header.vue'

export default {
  components: {
    Header
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user)=> {
        if (user != null) {
            this.$router.push('/mypage');
        } else {
            this.$router.push('/');
        }
    })
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
         -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
            box-sizing: border-box;
  }
  
@media screen and (min-width:1026px){
  .index-contents{
    width: 100%;
    height: 100vh;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
  }

  .index-filter {
    background: rgba(255,255,255,0.4);
    height: 100vh;
  }

  .index-title{
    color: #55c500;
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 10em;
    font-weight: bold;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
  }
}

@media screen and (min-width:482px) and (max-width:1025px){
  .index-contents{
    width: 100%;
    height: 100vh;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
  }

  .index-filter {
    background: rgba(255,255,255,0.4);
    height: 100vh;
  }

  .index-title{
    color: #55c500;
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 6em;
    font-weight: bold;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
  }
}

@media screen and (max-width:481px){
  .index-contents{
    width: 100%;
    height: 100vh;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
  }

  .index-filter {
    background: rgba(255,255,255,0.4);
    height: 100vh;
  }

  .index-title{
    color: #55c500;
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 3em;
    font-weight: bold;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
  }
}
</style>

