<template>
  <section id="wrapper">
    <div id="contents">
      <Header />
			<h1>Mark&nbsp;Note</h1>
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
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic";
  }
  
@media screen and (min-width:1026px){
  #wrapper{
    width: 100%;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
  }

  #contents {
    background: rgba(255,255,255,0.4);
    height: 100vh;
  }

  #contents h1{
    color: #55c500;
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 120px;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
  }
}

@media screen and (min-width:482px) and (max-width:1025px){
  #wrapper{
    width: 100%;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
  }

  #contents {
    background: rgba(255,255,255,0.4);
    height: 100vh;
  }

  #contents h1{
    color: #55c500;
    position: absolute;
    top: 45%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 120px;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
  }
}

@media screen and (max-width:481px){
  #wrapper{
    width: 100%;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
  }

  #contents {
    background: rgba(255,255,255,0.4);
    height: 100vh;
  }

  #contents h1{
    color: #55c500;
    position: absolute;
    top: 45%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 50px;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
  }
}
</style>

