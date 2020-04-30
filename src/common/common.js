import Axios from "axios";
import global from "./global.js";

function deepCopy(obj = {}) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  let res;
  if (obj instanceof Array) {
    res = [];
  }
  if (obj instanceof Object) {
    res = {};
  }
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      res[key] = deepCopy(obj[key]);
    }
  }
  return res;
}

function getToken() {
  const token = JSON.parse(localStorage.getItem("user"))["token"];
  return token;
}

function getUserID() {
  const user_id = JSON.parse(localStorage.getItem("user"))["id"];
  return user_id;
}

//点赞
function addLike(id) {
  const token = getToken();
  const user_id = getUserID();
  const addLike = Axios.create();
  return addLike
    .post(
      global.host + "addlike",
      {
        id,
        user_id,
      },
      {
        headers: {
          token,
        },
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response.data.message;
    });
}

//取消点赞
function cancelLike(id) {
  const token = getToken();
  const user_id = getUserID();
  const cancelLike = Axios.create();
  return cancelLike
    .post(
      global.host + "cancellike",
      {
        id,
        user_id,
      },
      {
        headers: {
          token,
        },
      }
    )
    .then((res) => {
      // console.log(res.data.data)
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response.data.message;
    });
}

//收藏
function addCollect(img_id) {
  const token = getToken();
  const user_id = getUserID();
  const addCollect = Axios.create();
  return addCollect
    .post(
      global.host + "addcollect",
      {
        img_id,
        user_id,
      },
      {
        headers: {
          token,
        },
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
}
//取消收藏
function cancelCollect(img_id) {
  const token = getToken();
  const user_id = getUserID();
  const cancelCollect = Axios.create();
  return cancelCollect
    .post(
      global.host + "cancelcollect",
      {
        img_id,
        user_id,
      },
      {
        headers: {
          token,
        },
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
}
//收藏
function addDownload(img_id) {
  const token = getToken();
  const user_id = getUserID();
  const addDownload = Axios.create();
  return addDownload
    .post(
      global.host + "adddownload",
      {
        img_id,
        user_id,
      },
      {
        headers: {
          token,
        },
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
}
export default {
  deepCopy,
  getToken,
  getUserID,
  addLike,
  cancelLike,
  addCollect,
  cancelCollect,
  addDownload
};
