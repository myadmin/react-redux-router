import axios from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求
axios.interceptors.request.use((config) => {
    Toast.loading('加载中', 0)
    return config
}, (error) => {

})

// 拦截相应
axios.interceptors.response.use(function (response) {
    Toast.hide()
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
