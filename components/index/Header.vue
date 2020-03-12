<template>
    <div id="header">
        <div id="navi">
			<ul>
                <li><a @click="showLoginModal = true">ログイン</a></li>
                <loginModal v-if="showLoginModal" @close="showLoginModal = false"></loginModal>
				<li><a @click="showCreateModal = true">アカウント登録</a></li>
                <createModal v-if="showCreateModal" @close="showCreateModal = false"></createModal>
			</ul>
		</div>
    </div>    
</template>

<script>
import loginModal from "@/components/index/loginModal.vue";
import createModal from "@/components/index/createModal.vue";
 
export default {
    name: 'app',
    data() {
        return {
            showLoginModal: false,
            showCreateModal: false
        }
    },
    components: {
        loginModal,
        createModal
    }
}
</script>



<style>
@media screen and (min-width:1026px){
    #header{
        width: 100%;
        height: 30vh;
        overflow: hidden;
        background: rgba(255,255,255,0.4);
    }
    #header #navi{
        width: 400px;
        margin: 0 auto;
        overflow: hidden;
        margin-top: 2%;
        float: right;
    }
    #header #navi li{
        margin-top:5px;
        margin-bottom: 5px;
        width:150px;
        float: left;
        text-align: center;
        background-color: #eee;
        margin-left: 30px;
        line-height: 50px;
        border-radius: 20px;
    }

    #header #navi li a {
        box-shadow:0px 0px 6px 3px #777;
        -moz-box-shadow:0px 0px 6px 3px #777;
        -webkit-box-shadow:0px 0px 6px 3px #777;
        display: block;
        border-radius: 20px;
    }

    #header #navi li a:hover{
        box-shadow:0px 0px 0px 0px #777;
        -moz-box-shadow:0px 0px 0px 0px #777;
        -webkit-box-shadow:0px 0px 0px 0px #777; 
    }
}
@media screen and (min-width:482px) and (max-width:1025px){
    #header{
        width: 100%;
        height: 30vh;
        overflow: hidden;
        background: rgba(255,255,255,0.4);
    }
    #header #navi{
        width: 400px;
        margin: 0 auto;
        overflow: hidden;
        margin-top: 2%;
        float: right;
    }
    #header #navi li{
        margin-top:5px;
        margin-bottom: 5px;
        width:150px;
        float: left;
        text-align: center;
        background-color: #eee;
        margin-left: 30px;
        line-height: 50px;
        border-radius: 20px;
    }

    #header #navi li a {
        box-shadow:0px 0px 6px 3px #777;
        -moz-box-shadow:0px 0px 6px 3px #777;
        -webkit-box-shadow:0px 0px 6px 3px #777;
        display: block;
        border-radius: 20px;
    }

    #header #navi li a:hover{
        box-shadow:0px 0px 0px 0px #777;
        -moz-box-shadow:0px 0px 0px 0px #777;
        -webkit-box-shadow:0px 0px 0px 0px #777; 
    }
}

@media screen and (max-width:481px){
    #header{
        width: 100%;
        height: 30vh;
        overflow: hidden;
        background: rgba(255,255,255,0.4);
        display: flex;
    }
    #header #navi{
        margin: 0 auto;
        overflow: hidden;
        margin-top: 2%;
        width: 95%;
    }
    #header #navi ul{
        display: flex;
        justify-content: space-around;
    }
    #header #navi li{
        margin-top:5px;
        margin-bottom: 5px;
        width: 45%;
        text-align: center;
        background-color: #eee;
        line-height: 30px;
        border-radius: 20px;
    }

    #header #navi li a {
        box-shadow:0px 0px 6px 3px #777;
        -moz-box-shadow:0px 0px 6px 3px #777;
        -webkit-box-shadow:0px 0px 6px 3px #777;
        display: block;
        border-radius: 20px;
    }

    #header #navi li a:hover{
        box-shadow:0px 0px 0px 0px #777;
        -moz-box-shadow:0px 0px 0px 0px #777;
        -webkit-box-shadow:0px 0px 0px 0px #777; 
    }
}
</style>
