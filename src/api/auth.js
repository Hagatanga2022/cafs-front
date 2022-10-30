import axios from "axios";

class AuthService {
  async create(user) {
    const { data } = await axios.post("auth/registration/", user);
    return data;
  }
  async read() {
    const { data } = await axios.get("auth/user/");
    return data;
  }
  async update(newUser) {
    await axios.patch("auth/user/", newUser);
  }
  async delete(inactivatedUser) {
    await axios.patch("auth/user/", inactivatedUser);
  }
  async login(user) {
    const { data } = await axios.post("auth/login/", user);
    return data;
  }
  async logout() {
    await axios.post("auth/logout/");
  }
}

export default new AuthService();
