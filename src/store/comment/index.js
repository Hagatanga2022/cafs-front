import commentService from "@/api/comment";

export const comment = {
  namespaced: true,
  state: () => ({
    allComments: [],
    comment: {},
  }),
  mutations: {
    setComment(state, comments) {
      state.allComments = comments;
    },
    cleanComment(state) {
      state.comment = {};
    },
    cleanComments(state) {
      state.allComments = [];
      state.comment = {};
    },
  },
  actions: {
    async getComment({ commit }) {
      const comments = await commentService.read();
      commit("setComment", comments);
    },
    async postComment({ dispatch, state }) {
      try {
        await commentService.create(state.comment);
        dispatch("getComment");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async editComment({ dispatch, state }, commentID) {
      try {
        await commentService.update(commentID, state.comment);
        dispatch("getComment");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async deleteComment({ dispatch }, commentID) {
      try {
        await commentService.delete(commentID);
        dispatch("getComment");
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
