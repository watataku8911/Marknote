<template>
  <section id="wrapper">
    <Header></Header>
    <div id="contents">
			<h1>Mark&nbsp;Note</h1>
			<p><img src="@/assets/6706.png" alt=""></p>
    </div>

    <div id="sub_contents">
      <h2 id="studyNote"><span>What&nbsp;</span>Mark&nbsp;Note?</h2>
      <p>ノートを取るように情報を蓄積するソフトウェアないしウェブサービスである。</p>
      <p>また、ノートの取り方はメモを取るときやドキュメントを書くときにとても便利な<em>「※マークダウン記法」</em>を採用。</p>
      <div id="toUse">
        <h2>Function</h2>
          <div id="toUseMarkdown">
            <div id="toUseLeftMarkdown">
              <p class="title">マークダウン</p>
              <p>綺麗に且つ、素早く取れるようにマークダウンを採用。</p>
            </div>
            <div id="toUseRightMarkdown">
              <img src="@/assets/sample-2.png" alt="">
            </div>
          </div>    
      </div>
      <div id="toUseMypage">
        <div id="toUseLeftMypage">
          <p class="title">マイページ</p>
          <p>個人レベルでページを生成でき、タグ付けなどをしてノートを管理ができ、共有機能で友達と繋がることができる。</p>
        </div>
        <div id="toUseRightMypage">
          <img src="@/assets/sample.png" alt="">
        </div>
      </div>
      <join></join>
    </div>
  </section>
</template>

<script>
import Header from '@/components/index/Header.vue'

import join from '@/components/index/join.vue'

export default {
  components: {
    Header,
    join
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

  p {
    font-size: 2vh;
  }
  
@media screen and (min-width:1026px){
  #wrapper{
    width: 100%;
    height: 100vh;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  #contents {
    background: rgba(255,255,255,0.4);
  }

  #contents h1{
    color: #55c500;
    text-align: center;
    font-size: 120px;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
  }

  #contents p{
      padding-top: 20px;
      margin-left: 750px;
      text-align: center;
  }

  #contents img {
    width: 40vh;
    height: 50vh;
  }

  

  /*
  *sub_contents
  */
  #sub_contents{
      font-size: calc(8vh - 80px);
      text-align: center;
      width: 100%;
      background-color: white;
  }

  #sub_contents #studyNote{
      color: #55c500;
      font-size: 60px;
      font-family: 'Anton', sans-serif;
      font-family: 'Lobster', cursive;
  }

  #sub_contents p{
      letter-spacing: 2px;
      margin-left: 8px;
      font-size: 20px;
  }
  
  #sub_contents #whatMarkdown{
      text-align: left;
      margin-top: 110px;
      border: solid 1px #ccc;
      width: 50%;
      padding: 20px;
      line-height: 30px;
      margin-bottom: 100px;
      margin-right: 30px;
      float: right;
      clear: both;
  }
  #toUse{
      margin-top: 40px; 
      overflow: hidden;
      width: 85%;
      margin-left: auto;
      margin-right: auto;
  }
  #toUse h2{
      font-family: 'Anton', sans-serif;
      font-family: 'Lobster', cursive;
      color: #55c500;
      text-align: center;
      padding-bottom: 30px;
      font-size: 60px;

  }
  #toUseMarkdown{
      overflow: hidden;
      margin-bottom: 60px;
  }
  #toUse #toUseLeftMarkdown{
      width: 40%;
      float: left;
  }
  #toUse #toUseLeftMarkdown .title{
      text-align: center;
      padding-bottom: 50px;
      font-weight: bold;
  }
  #toUse #toUseRightMarkdown{
      width: 40%;
      float: right;
  }

  #toUse #toUseRightMarkdown img{
      border: #000 1px solid;
      width: 55vh;
      height:35vh;
  }
  #toUseMypage{
      overflow: hidden;
      width: 85%;
      margin: 0% auto;
  }
  #toUseLeftMypage{
      width: 40%;
      float: left;
  }
  #toUseLeftMypage .title{
      text-align: center;
      padding-bottom: 50px;
      font-weight: bold;
  }
  #toUseRightMypage{
      width: 40%;
      float: right;
  }

  #toUseRightMypage img{
      border: #000 1px solid;
      width: 55vh;
      height:35vh;
  }
}

@media screen and (min-width:482px) and (max-width:1025px){
  #wrapper{
    width: 100%;
    height: 100vw;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  #contents {
    background: rgba(255,255,255,0.4);
    height: 50vh;
  }

  #contents h1{
    color: #55c500;
    font-size: 10vh;
    text-align: center;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
  }

  #contents img {
    padding-top: 5%;
    padding-right: 5%;
    position: absolute;
    right: 0%;
    width: 25vh;
    height:30vh;
  }

  /*
  *sub_contents
  */
  #sub_contents{
      font-size: calc(8vh - 80px);
      text-align: center;
      width: 100%;
      background-color: white;
  }
  #sub_contents #studyNote{
      color: #55c500;
      font-family: 'Anton', sans-serif;
      font-family: 'Lobster', cursive;
  }

  #sub_contents #whatMarkdown{
      text-align: left;
      border: solid 1px #ccc;
      width: 100%;
      padding: 5px;
      line-height: 30px;
      margin-right: 30px;
      float: none;
      clear: both;
  }
  #toUse{
      overflow: hidden;
      width: 85%;
      margin:0 auto;
  }

  #toUse h2{
      font-family: 'Anton', sans-serif;
      font-family: 'Lobster', cursive;
      color: #55c500;
      text-align: center;
  }

  #toUseMarkdown{
      overflow: hidden;
      margin-bottom: 60px;
  }

  #toUse #toUseLeftMarkdown{
      width: 100%;
      float: none;
  }

  #toUse #toUseLeftMarkdown .title{
      text-align: center;
      padding-bottom: 20px;
      font-weight: bold;
  }

  #toUse #toUseRightMarkdown{
      width: 100%;
      float: none;
  }
  

  #toUse #toUseRightMarkdown img {
      border: #000 1px solid;
      width: 45vh;
      height:25vh;
  }

  #toUseMypage{
      margin: 0 auto;
      overflow: hidden;
      padding-bottom: 30px;
      width: 85%;
  }

  #toUseLeftMypage{
      width: 100%;
      float: none;
  }

  #toUseMypage #toUseLeftMypage .title{
      text-align: center;
      padding-bottom: 20px;
      font-weight: bold;
  }

  #toUseRightMypage{
      width: 100%;
      float: none;
  }

    #toUseMypage #toUseRightMypage img {
      border: #000 1px solid;
      width: 45vh;
      height:25vh;
  }

}

@media screen and (max-width:481px){
  #wrapper{
    width: 100%;
    height: 100vh;
    background: url(../assets/background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  #contents {
    background: rgba(255,255,255,0.4);
    height: 50vh;
  }

  #contents h1{
    color: #55c500;
    text-align: center;
    font-family: 'Anton', sans-serif;
    font-family: 'Lobster', cursive;
    font-size: 5vh;
  }

  #contents img {
    padding-right: 1vh;
    position: absolute;
    right: 0%;
    bottom: 20vh;
    width: 20vh;
    height:23vh;
  }

  /*
  *sub_contents
  */
  #sub_contents{
      font-size: calc(8vh - 80px);
      text-align: center;
      width: 100%;
      background-color: white;
  }
  #sub_contents #studyNote{
      color: #55c500;
      font-family: 'Anton', sans-serif;
      font-family: 'Lobster', cursive;
  }
  
  #sub_contents #whatMarkdown{
      text-align: left;
      /* border: solid 1px #ccc; */
      width: 100%;
      padding: 5px;
      line-height: 30px;
      margin-right: 30px;
      float: none;
      clear: both;
  }
  #toUse{
      overflow: hidden;
      width: 85%;
      margin:0 auto;
  }

  #toUse h2{
      font-family: 'Anton', sans-serif;
      font-family: 'Lobster', cursive;
      color: #55c500;
      text-align: center;
  }

  #toUseMarkdown{
      overflow: hidden;
      margin-bottom: 60px;
  }

  #toUse #toUseLeftMarkdown{
      width: 100%;
      float: none;
  }

  #toUse #toUseLeftMarkdown .title{
      text-align: center;
      padding-bottom: 20px;
      font-weight: bold;
  }

  #toUse #toUseRightMarkdown{
      width: 100%;
      float: none;
  }

  #toUse #toUseRightMarkdown img {
      width: 40vh;
      height:25vh;
  }

  #toUseMypage{
      margin: 0 auto;
      overflow: hidden;
      padding-bottom: 30px;
      width: 85%;
  }

  #toUseLeftMypage{
      width: 100%;
      float: none;
  }

  #toUseMypage #toUseLeftMypage .title{
      text-align: center;
      padding-bottom: 20px;
      font-weight: bold;
  }

  #toUseRightMypage{
      width: 100%;
      float: none;
  }

    #toUseMypage #toUseRightMypage img {
      width: 40vh;
      height:25vh;
  }
}



</style>

