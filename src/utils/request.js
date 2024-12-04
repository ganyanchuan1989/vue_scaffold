import axios from 'axios';
import { ElNotification, ElMessage } from 'element-plus';

const instance = axios.create({
  baseURL: '/',
  timeout: 3000,
  // responseType: 'json',
  isShowError: true, // 自定义属性
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const { status, config } = response;
    console.log(response);
    let ret = {};
    if (status === 200) {
      if (response?.data?.code === 200) {
        ret = { code: 0, data: response?.data?.data };
      } else {
        ret = { code: 1, data: {}, message: response?.data?.message };
      }
    } else {
      ret = { code: status, message: response?.data?.message };
    }

    if (config.isShowError && ret.code !== 0) {
      ElMessage({
        message: ret.message,
        type: 'error',
      });
    }
    return ret;
  },
  (error) => {
    const { config } = error;
    ElNotification({
      title: '系统异常',
      message: `请求地址：${config?.url}`,
      duration: 0,
    });
    console.error(error);
  },
);

const request = (config) => {
  return instance.request({
    ...config,
    method: config.method || 'POST',
    contentType: config.contentType || 'application/json',
    data: config.data || {},
    headers: {
      ...config.headers,
      'Content-Type': config.contentType || 'application/json',
    },
  });
};

export default request;
