<template>
    <div>
      <p>{{message}}</p>
      <br/>
      <h1>von-owner</h1>
      <input type="text" v-model="username"/>
      <input type="password" v-model="password"/>
      <input type="button" @click="login" value="登录"/>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
          return {
            message:'von-owner',
            username:undefined,
            password:undefined
          }
        },
      methods:{
          login:function () {
            // console.log(this.username);
            // console.log(this.password);
            this.$http.get('/login/userLogin',{
                params:{
                  username:this.username,
                  password:this.password
                }
            }).then(function (res) {
              console.log(res);
            }).catch(function (res) {
              console.log(res);
            })
          }
      }
    }
</script>

<style scoped>

</style>
