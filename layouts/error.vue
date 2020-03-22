<template>
    <div class="container">
        <Header></Header>
        <div class="main">
            <div v-if="error.statusCode === 404">
                <h1 class="err_msg"><span>{{ error.statusCode }}</span><br>
                File Not Found</h1>
                <p class="message">お探しのページは見つかりませんでした。</p>
                <div id="white_box">
                    <div id="cause">
                        <ul>
                            <li>アクセスしようとしたファイルが存在しない。(ファイルの設置箇所を誤っている)</li>
                            <li>URLアドレスが間違っている。</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-else-if="error.statusCode === 403">
                <h1 class="err_msg"><span>{{ error.statusCode }}</span><br>
                Forbidden</h1>
                <p class="message">アクセスができません。</p>
                <div id="white_box">
                    <div id="cause">
                        <ul>
                            <li>アクセス権がない。</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-else-if="error.statusCode === 500">
                <h1 class="err_msg"><span>{{ error.statusCode }}</span><br>
                Internal Server Error</h1>
                <p class="message">サーバに内部エラーがあります。</p>
            </div>
            <div v-else-if="error.statusCode === 503">
                <h1 class="err_msg"><span>{{ error.statusCode }}</span><br>
                Internal Server Error</h1>
                <p class="message">アクセスが殺到していて一時的にサービスが使用不可になっています</p>
                <div id="white_box">
                    <div id="cause">
                        <ul>
                            <li>時間を置いて再度アクセス</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1 class="err_msg">HTTPステータスコード<br>
                <span>{{ error.statusCode }}</span></h1>
            </div>
        </div>
    <footer></footer>
    </div>
</template>

<script>
import Header from '@/components/header.vue'

export default {
  props: {
    error: {
        type: Object,
        default: null
    }
  },
  components: { 
    Header
  }  
}
</script>

<style>
@media screen and (min-width:1026px){
    .main {
        width: 100%;
        text-align: center;
        padding-top: 8%;
    }

    .err_msg {
        color:red;
        font-weight: bold;
        font-size: calc(10vh + 5px);
        text-align: center;
        line-height: 13vh;
    }


    .err_msg  span {
        font-size: 20vh;
    }

    .message {
        margin-top: 1%;
        font-size:3vh;
        letter-spacing: 1px;
        font-weight: bold;  
    }

    #cause {
    text-align: left;
    }
    #cause li {
        font-size:calc((0.1rem + 0.25vh)  * 6);
        color: #666;
    }

    h3 {
        letter-spacing: 1px;
        padding: 0;
    }

    #white_box {
        width: 70vw;
        margin: 55px auto 0;
        border: solid 1px #666;
        padding: 5vh;
    }

    footer{
        width: 100%;
        overflow: hidden;
        background-color: #ccc;
        height: 60px;
        padding: 4px 10px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
@media screen and (min-width:482px) and (max-width:1025px){
    .main {
        width: 100%;
        text-align: center;
        padding-top: 10vh;
    }

    .err_msg {
        color:red;
        font-weight: bold;
        font-size: calc(8vh + 5px);
        text-align: center;
        line-height: 10vh;
    }


    .err_msg  span {
        font-size: 15vh;
    }

    .message {
        margin-top: 1%;
        font-size:2.5vh;
        letter-spacing: 1px;
        font-weight: bold;  
    }

    #cause {
    text-align: left;
    }
    #cause li {
        font-size:calc((0.1rem + 0.25vh)  * 5);
        color: #666;
    }

    h3 {
        letter-spacing: 1px;
        padding: 0;
    }

    #white_box {
        width: 95vw;
        margin: 55px auto 0;
        border: solid 1px #666;
        padding: 5vh;
    }

    footer{
        width: 100%;
        overflow: hidden;
        background-color: #ccc;
        height: 60px;
        padding: 4px 10px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
}

@media screen and (max-width:481px) {
    .main {
        width: 100%;
        text-align: center;
        padding-top: 18vh;
    }

    .err_msg {
        color:red;
        font-weight: bold;
        font-size: calc(5vh + 5px);
        text-align: center;
        line-height: 8vh;
    }


    .err_msg  span {
        font-size: 13vh;
    }

    .message {
        margin-top: 1%;
        font-size:2.5vh;
        letter-spacing: 1px;
        font-weight: bold;  
    }

    #cause {
    text-align: left;
    }
    #cause li {
        font-size:calc((0.1rem + 0.25vh)  * 5);
        color: #666;
    }

    h3 {
        letter-spacing: 1px;
        padding: 0;
    }

    #white_box {
        width: 95vw;
        margin: 3vh auto 0;
        border: solid 1px #666;
        padding: 5vh;
    }

    footer{
        width: 100%;
        overflow: hidden;
        background-color: #ccc;
        height: 60px;
        padding: 4px 10px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>