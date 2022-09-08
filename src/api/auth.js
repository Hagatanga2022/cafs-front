import axios from "axios";

export default class AuthService {
  async login(user) {
    const response = await axios.post("token/", user);
    return response.data;
  }
}
