import axios from "axios";

export default class AuthService {
  async login(user) {
    const response = await axios.post("token/", user);
    console.log("vish ", response.data)
    return response.data;
  }
}
