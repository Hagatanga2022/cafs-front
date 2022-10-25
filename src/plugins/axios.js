import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
