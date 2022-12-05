import axios from "axios";

class AnnouncementService {
  async create(announceInfo) {
    await axios.post("api/announces/", announceInfo);
  }
  async read() {
    const { data } = await axios.get("api/announces/");
    return data;
  }
  async update(announceID, announceInfo) {
    await axios.patch(`api/announces/${announceID}/`, announceInfo);
  }
  async delete(announceID) {
    await axios.delete(`api/announces/${announceID}/`);
  }
}

export default new AnnouncementService();
