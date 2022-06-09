import axios from "axios";

export const http = {
  patch: axios.patch,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  post: axios.post,
  head: axios.head,
};