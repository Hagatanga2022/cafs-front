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
  async logout() {
    await axios.post("auth/logout/");
  }
  async update(newUser) {
    await axios.patch("auth/user/", newUser);
  }
}

export default new AuthService();
