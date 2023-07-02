import axios from "axios";

export default function RequestApi() {
  const get = (url, params) => {
    const token = localStorage.getItem("admin_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.get(url, { params, headers });
  };

  const post = (url, data) => {
    const token = localStorage.getItem("admin_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post(url, data, { headers });
  };

  const put = (url, data) => {
    const token = localStorage.getItem("admin_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.put(url, data, { headers });
  };

  const remove = (url, data) => {
    const token = localStorage.getItem("admin_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.delete(url, { data, headers });
  };

  return {
    get,
    post,
    put,
    delete: remove,
  };
}
