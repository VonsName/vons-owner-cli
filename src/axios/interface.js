import axios from './api'

export const query = params => {

  return axios({

    url: '/query',

    method: 'get',

    params:params

  })

};


export const mock = params => {

  return axios({

    url: '/mock',

    method: 'get',

    params:params

  })

};

export const upload = data => {

  return axios({

    url: '/upload',

    method: 'post',

    params:data
  })

};

// 默认全部倒出

// 根据需要进行

export default {

  query,

  mock,

  upload

}
