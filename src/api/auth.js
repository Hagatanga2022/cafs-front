import axios from "axios";

class AuthService {
  async login(user) {
    const { data } = await axios.post("token/", user);
    console.log(data);
    return data;
  }
}

export default new AuthService();
