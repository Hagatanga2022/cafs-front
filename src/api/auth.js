import axios from "axios";

export default class AuthService {
  async login(user) {
    const { data } = await axios.post("token/", user);
    console.log(data)
    return data;
  }
  async updateUser(newUser) {
    await axios.put("/", newUser);
  }
}
