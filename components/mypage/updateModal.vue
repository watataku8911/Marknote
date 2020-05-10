<template>
    <transition name="updateModal">
        <div class="updateOverlay" @click="$emit('close')">
            <div class="updatePanel" @click.stop>
                <a tabindex="-1" @click="$emit('close')" class="close">×</a>
                <h2>アカウント編集</h2>
                <input type="text" placeholder="アカウント名" v-model="name"  class="updateHoge">
                <p v-if="this.errUploadFlg"><font color="red">画像ファイルを正しく選択して下さい。</font></p>
                <div class="imgContent">
                    <div class="imagePreview">  
                        <img :src="this.uploadedImage" width="50" height="50" alt="" />
                    </div>

                    <label for="corporation_file" class="btn btn-success">
                        プロフィール画像を設定する
                        <input type="file" class="file_input" style="display:none;"
                        id="corporation_file" mulitple="multiple"
                        @change="onDrop">
                    </label>
                </div>
                <input type="button" value="編集" @click="update" v-show="!isLoadingFlg">
                <div class="loading"><pulse-loader :loading="isLoadingFlg"></pulse-loader></div>
            </div>
        </div>
    </transition>
</template>
<script>
import firebase from '@/plugins/firebase'

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


export default {
    components: { 
        PulseLoader
    },
    data() {
        return {
            name: '',
            fileList: "",
            errUploadFlg: false,
            isLoadingFlg: false,
            uploadedImage: "",
            isDropingFlg: false
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user != null) {
                if(user.displayName != null) {
                    this.name = user.displayName;
                } else {
                    this.name = "";
                }
                if(user.photoURL != null) {
                    this.uploadedImage = user.photoURL;
                } else {
                    this.uploadedImage = "";
                }
            } else {
                this.$router.push('/');
            }
        })
    },
    methods: {
        onDrop(event){
            this.isDropingFlg = true;
            //画像データ取得
            let fileList = event.target.files || e.dataTransfer.files;
            this.fileList = fileList;

            this.createImage(fileList[0]);
        },
        // アップロードした画像を表示
        createImage(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImage = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        update() {
            this.isLoadingFlg = true;
            if(this.isDropingFlg) {
                var errFlg;
                if(this.fileList[0].type == "image/png") {
                    var blob = new Blob(this.fileList, { type: "image/png" });
                    errFlg = false;
                } else if(this.fileList[0].type == "image/jpg") {
                    var blob = new Blob(this.fileList, { type: "image/jpg" });
                    errFlg = false;
                } else if(this.fileList[0].type == "image/jpeg") {
                    var blob = new Blob(this.fileList, { type: "image/jpeg" });
                    errFlg = false;
                } else if(this.fileList[0].type == "image/gif") {
                    var blob = new Blob(this.fileList, { type: "image/gif" });
                    errFlg = false;
                } else {
                    errFlg = true;
                }
                
                if(!errFlg) {
                    this.isLoadingFlg = true;
                    this.updateImage(blob);
                }
            } else {
                this.isLoadingFlg = true;
                this.updateAccount(this.uploadedImage);
            }
        },
        updateImage(blob) {
            var storageRef = firebase.storage().ref();
            var mountainsRef = storageRef.child('profileImage/' + this.fileList[0].name);
            //Firebase 画像アップロード
            mountainsRef.put(blob).then(snapshot => {
                //Firebase 画像取得(URL)
                mountainsRef.getDownloadURL().then((url) => {
                    this.updateAccount(url);
                }).catch((error) => {
                    console.log(error);
                });
            });
        },
        //アカウント編集
        updateAccount(url) {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: this.name,
                photoURL: url
            }).then((user) => {
                alert("アカウントを編集しました\nモーダルを閉じてください。");

                this.$emit('close');
            }).catch((error) => {
                alert("予期せぬエラーが起こりました");
            });
        }
    }
}
</script>

<style>
@media screen and (min-width:1026px){
    .updateOverlay {
        background: rgba(0, 0, 0, .8);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 900;
        transition: all .5s ease;
    }
    
    .updatePanel {
        text-align: center;
        width: 40%;
        background: #fff;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .close {
        width: 50px;
        height:50px;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
        display: block;
        font-size: 30px;
        color: #00AFEC;
        text-align: center;
    }

    .updatePanel h2 {
        font-size: 4vh;
        margin-bottom: 10px;
    }

    .updateModal-enter,
    .updateModal-leave-active {
        opacity: 0;
    }
    
    .updateModal-enter .panel,
    .updateModal-leave-active .panel{
        top: -200px;
    }
    
    .imgContent {
        width: 90%;
        max-width: 700px;
        height: 40vh;
        margin:auto;
        margin-bottom:40px;
        background-color: #ccc;
        padding-top:5%; 
    } 

    
    .imagePreview {
        height:200px;
        width:200px;
        background: rgb(240, 240, 240);
        overflow:hidden;
        border-radius: 50%;
        background-position: center center;
        background-size: cover;
        margin-left: auto;
        margin-right: auto;
        margin-bottom:20px;
        position: relative;
    }

    .imagePreview img{
        height:200px;
        width:200px;
    }

    label {
        background-color: #fff;
        padding: 2%;
        box-shadow:1px 1px 8px 0px #000;
    }

    .updateHoge{
        width: 80%;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        font-size:20px;
        margin-bottom: 15px;
    }
}

@media screen and (min-width:482px) and (max-width:1025px){
    .updateOverlay {
        background: rgba(0, 0, 0, .8);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 900;
        transition: all .5s ease;
    }
    
    .updatePanel {
        text-align: center;
        width: 80%;
        background: #fff;
        padding: 2vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .close {
        width: 50px;
        height:50px;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
        display: block;
        font-size: 30px;
        color: #00AFEC;
        text-align: center;
    }

    .updatePanel h2 {
        margin-bottom: 10px;
    }

    .updateModal-enter,
    .updateModal-leave-active {
        opacity: 0;
    }
    
    .updateModal-enter .panel,
    .updateModal-leave-active .panel{
        top: -200px;
    }

    input[type="button"]{
        width: 40%;
        padding: 10px;
        font-size: 1.3em;
        background-color: #6bef6b;
        color: #fff;
        border-style: none;
        margin-top: 20px;
        box-shadow:0px 0px 6px 3px #777;
        -moz-box-shadow:0px 0px 6px 3px #777;
        -webkit-box-shadow:0px 0px 6px 3px #777;
    }
    .imgContent {
        width: 90%;
        max-width: 700px;
        padding: 2vh;
        margin:auto;
        margin-bottom:40px;
        background-color: #ccc;
        padding-top:5%; 
    } 
    .imagePreview {
        height:100px;
        width:100px;
        background: rgb(240, 240, 240);
        overflow:hidden;
        border-radius: 50%;
        background-position: center center;
        background-size: cover;
        margin-left: auto;
        margin-right: auto;
        margin-bottom:20px;
        position: relative;
    }

    .imagePreview img{
        height:100px;
        width:100px;
    }

    label {
        background-color: #fff;
        padding: 2%;
        box-shadow:1px 1px 8px 0px #000;
    }

    .updateHoge{
        width: 80%;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        font-size:20px;
        margin-bottom: 15px;
    }

}

@media screen and (max-width:481px){
    .updateOverlay {
        background: rgba(0, 0, 0, .8);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 900;
        transition: all .5s ease;
    }
    
    .updatePanel {
        text-align: center;
        width: 70%;
        background: #fff;
        padding: 2vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .close {
        width: 50px;
        height:50px;
        box-shadow:1px 1px 8px 0px #000;
        border-radius: 50%;
        display: block;
        font-size: 30px;
        color: #00AFEC;
        text-align: center;
    }

    .updatePanel h2 {
        margin-bottom: 10px;
    }

    .updateModal-enter,
    .updateModal-leave-active {
        opacity: 0;
    }
    
    .updateModal-enter .panel,
    .updateModal-leave-active .panel{
        top: -200px;
    }

    input[type="button"]{
        width: 40%;
        padding: 10px;
        font-size: 1.3em;
        background-color: #6bef6b;
        color: #fff;
        border-style: none;
        margin-top: 20px;
        box-shadow:0px 0px 6px 3px #777;
        -moz-box-shadow:0px 0px 6px 3px #777;
        -webkit-box-shadow:0px 0px 6px 3px #777;
    }
    .imgContent {
        width: 90%;
        max-width: 700px;
        padding: 2vh;
        margin:auto;
        background-color: #ccc;
        padding-top:5%; 
    } 
    .imagePreview {
        height:50px;
        width:50px;
        background: rgb(240, 240, 240);
        overflow:hidden;
        border-radius: 50%;
        background-position: center center;
        background-size: cover;
        margin-left: auto;
        margin-right: auto;
        margin-bottom:20px;
        position: relative;
    }
    label {
        background-color: #fff;
        padding: 2%;
        box-shadow:1px 1px 8px 0px #000;
    }

    .updateHoge{
        width: 80%;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        font-size:20px;
        margin-bottom: 15px;
    }
}

</style>