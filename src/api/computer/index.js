import axios from "axios";

class ComputerService {
  async create(computerInfo) {
    await axios.post("api/computers/", computerInfo);
  }
  async read() {
    const { data } = await axios.get("api/computers/");
    return data;
  }
  async update(computerID, computerInfo) {
    await axios.patch(`api/computers/${computerID}/`, computerInfo);
  }
  async delete(computerID) {
    await axios.delete(`api/computers/${computerID}/`);
  }
}

export default new ComputerService();
