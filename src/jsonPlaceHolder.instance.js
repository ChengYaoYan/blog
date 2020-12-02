import axios from "axios";
import store from "./store";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

instance.interceptors.request.use(
  (req) => {
    if (store.state.token) {
      console.log(store.state.token);
      req.headers.authorization = `Bearer ${store.state.token}`;
      return req;
    } else if (store.state.token === "") {
      // 初始状态时，token === ""
      // 这种解决方案暂时感觉有点不妥
      return req;
    }
    throw { message: "the token is not available" };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;