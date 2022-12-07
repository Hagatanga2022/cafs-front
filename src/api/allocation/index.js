import axios from "axios";

class AllocationService {
  async create(allocationInfo) {
    await axios.post("api/allocations/", allocationInfo);
  }
  async read() {
    const { data } = await axios.get("api/allocations/");
    return data;
  }
  async update(allocationID, allocationInfo) {
    await axios.patch(`api/allocations/${allocationID}/`, allocationInfo);
  }
  async delete(allocationID) {
    await axios.delete(`api/allocations/${allocationID}/`);
  }
}

export default new AllocationService();
