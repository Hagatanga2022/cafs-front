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
    await axios.patch("auth/user/", newUser);
  }
  async logout() {
    await axios.post("auth/logout/");
  }
}

export default new AuthService();
