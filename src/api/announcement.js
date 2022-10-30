import axios from "axios";

class AnnouncementService {
  async create(announce) {
    await axios.post("api/announces/", announce);
  }
  async read() {
    const { data } = await axios.get("api/announces/");
    return data;
  }
  async update(idAnnounce, announce) {
    await axios.patch(`api/announces/${idAnnounce}/`, announce);
  }
  async delete(idAnnounce) {
    await axios.delete(`api/announces/${idAnnounce}/`);
  }
}

export default new AnnouncementService();
