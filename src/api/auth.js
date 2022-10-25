import axios from "axios";

class AuthService {
  async get() {
    const { data } = await axios.get("auth/user/");
    return data;
  }
  async register(user) {
    const { data } = await axios.post("auth/registration/", user);
    return data;
  }
  async login(user) {
    const { data } = await axios.post("auth/login/", user);
    return data;
  }
  async update(newUser) {
    const { data } = await axios.patch("auth/user/", newUser);
    console.log("Após atualizar: ", data.first_name);
  }
  async logout() {
    await axios.post("auth/logout/");
  }
}

export default new AuthService();
