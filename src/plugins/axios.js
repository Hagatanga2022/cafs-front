import axios from "axios";
import store from "@/store";

axios.defaults.baseURL = "https://cafs-backend.herokuapp.com/";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

if (store.state.auth.token.length) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.auth.token}`;
  axios.defaults.headers.get[
    "Authorization"
  ] = `Bearer ${store.state.auth.token}`;
  axios.defaults.headers.post[
    "Authorization"
  ] = `Bearer ${store.state.auth.token}`;
  axios.defaults.headers.patch[
    "Authorization"
  ] = `Bearer ${store.state.auth.token}`;
}
// else {
//   delete axios.defaults.headers.common["Authorization"];
//   delete axios.defaults.headers.get["Authorization"];
//   delete axios.defaults.headers.post["Authorization"];
//   delete axios.defaults.headers.patch["Authorization"];
// }
