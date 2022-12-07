import axios from "axios";

class ProjectService {
  async create(projectInfo) {
    await axios.post("api/projects/", projectInfo);
  }
  async read() {
    const { data } = await axios.get("api/projects/");
    return data;
  }
  async update(projectID, projectInfo) {
    await axios.patch(`api/projects/${projectID}/`, projectInfo);
  }
  async delete(projectID) {
    await axios.delete(`api/projects/${projectID}/`);
  }
}

export default new ProjectService();
