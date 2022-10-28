import axios from "axios";

class AnnouncementService {
  async create(announce) {
    await axios.post("avisos/", announce);
  }
  async read() {
    const { data } = await axios.get("avisos/");
    return data;
  }
  async update(idAnnounce, announce) {
    await axios.patch(`avisos/${idAnnounce}/`, announce);
  }
  async delete(idAnnounce) {
    await axios.delete(`avisos/${idAnnounce}/`);
  }
}

export default new AnnouncementService();
