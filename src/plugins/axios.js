import axios from "axios";

// axios.defaults.baseURL = "https://cafs.pythonanywhere.com/";
axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.defaults.headers.common["Content-Type"] = "application/json";
