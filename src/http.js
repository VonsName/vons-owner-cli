exports.install = function (Vue, options) {
  Vue.prototype.httpGet = function (url, param) {
    this.promise = new Promise((resolve, reject) => {
      this.$http.get(url, {params: param, headers: {'token': this.GLOBAL.token}})
        .then((res) => {
          const data = res.data;
          if (data.code === this.GLOBAL.SUCCESS) {
            this.GLOBAL.token = data.data.token;
            resolve(data);
          } else {
            console.log("error");
            resolve(data);
          }
        }).catch((error) => {
        console.log(error);
        reject(error);
      })
    });
  };


  //post
  Vue.prototype.httpPost = function (url, param) {
    this.promise = new Promise((resolve, reject) => {
      this.$http.post(url,
        {
          data: param
        },
        {
          headers:
            {
              'token': this.GLOBAL.token
            }
        }).then((res) => {
        const data = res.data;
        if (data.code === this.GLOBAL.SUCCESS) {
          this.GLOBAL.token = data.data.token;
          resolve(data);
        } else {
          console.log(data.code);
          resolve(data);
        }
      }).catch((error) => {
        console.log(error);
        reject(error);
      })
    })
  };

};
// export default{Vue:prototype.httpGet,Vue:prototype.httpPost}
