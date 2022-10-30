import axios from "axios";

class CommentService {
  async create(comment) {
    await axios.post("api/comments/", comment);
  }
  async read() {
    const { data } = await axios.get("api/comments/");
    return data;
  }
  async update(idComment, comment) {
    await axios.patch(`api/comments/${idComment}/`, comment);
  }
  async delete(idComment) {
    await axios.delete(`api/comments/${idComment}/`);
  }
}

export default new CommentService();
