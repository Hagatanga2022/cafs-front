import axios from "axios";

class AuthService {
  async login(user) {
    const { data } = await axios.post("token/", user);
    console.log(data);
    return data;
  }
  async updateUser(newUser) {
    await axios.put("/", newUser);
  }
}

export default new AuthService();
