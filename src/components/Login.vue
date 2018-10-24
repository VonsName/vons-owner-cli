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
    data() {
      return {
        message: 'von-owner',
        username: undefined,
        password: undefined
      }
    },
    methods: {
      login: function () {

        this.$http.get('/login/userLogin', {
          params: {
            username: this.username,
            password: this.password
          },
          headers:{
            'token':this.GLOBAL.token
          }
        }).then((res) => {
          const data = res.data;
          if (data.code === this.GLOBAL.SUCCESS) {
            // console.log(data.data.token);
            this.GLOBAL.token = data.data.token;
            this.$router.push({name: 'Index', params: {token: this.GLOBAL.token}})
            // this.$router.push("/success") 不带参数
          } else {
            console.log("error")
          }
        }).catch((res) => {
          console.log(res.data.code);
        })
      }
    }
  }
</script>

<style scoped>

</style>
