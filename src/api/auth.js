import axios from "axios";

class AuthService {
  async get() {
    const { data } = await axios.get("auth/user/");
    console.log("get");
    console.log(data.username);
    return data;
  }
  async register(user) {
    const { data } = await axios.post("auth/registration/", user);
    console.log("register");
    console.log(data);
    return data;
  }
  async login(user) {
    const { data } = await axios.post("auth/login/", user);
    console.log("login");
    console.log("pré-login", user.username);
    console.log("pós-login", data.user.username);
    return data;
  }
  async logout() {
    const { data } = await axios.post("auth/logout/");
    console.log(data);
  }
  async update(newUser) {
    await axios.patch("auth/user/", newUser);
  }
}

export default new AuthService();
