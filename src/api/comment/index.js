import axios from "axios";

class CommentService {
  async create(commentInfo) {
    await axios.post("api/comments/", commentInfo);
  }
  async read() {
    const { data } = await axios.get("api/comments/");
    return data;
  }
  async update(commentID, commentInfo) {
    await axios.patch(`api/comments/${commentID}/`, commentInfo);
  }
  async delete(commentID) {
    await axios.delete(`api/comments/${commentID}/`);
  }
}

export default new CommentService();
