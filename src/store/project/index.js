import projectService from "@/api/project";

export const project = {
  namespaced: true,
  state: () => ({
    allProject: [],
    project: {},
  }),
  mutations: {
    setProject(state, projects) {
      state.allProject = projects;
    },
    cleanProject(state) {
      state.project = {};
    },
    cleanProject(state) {
      state.allProject = [];
      state.project = {};
    },
  },
  actions: {
    async getProjects({ commit }) {
      const projects = await projectService.read();
      commit("setProject", projects);
    },
    async postProject({ dispatch, state }) {
      try {
        await projectService.create(state.project);
        dispatch("getProjects");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async editProject({ dispatch, state }, projectID) {
      try {
        await projectService.update(projectID, state.project);
        dispatch("getProjects");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async deleteProject({ dispatch }, projectID) {
      try {
        await projectService.delete(projectID);
        dispatch("getProjects");
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
