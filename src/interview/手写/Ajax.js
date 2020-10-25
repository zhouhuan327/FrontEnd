const xhr = new XMLHttpRequest();
xhr.open("GET", "/url");
xhr.onreadystatechange = () => {
  // xhr.readyStatus==0 尚未调用 open 方法
  // xhr.readyStatus==1 已调用 open 但还未发送请求（未调用 send）
  // xhr.readyStatus==2 已发送请求（已调用 send）
  // xhr.readyStatus==3 已接收到请求返回的数据
  // xhr.readyStatus==4 请求已完成
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 || xhr.status < 300 || xhr.status === 304) {
      console.log(xhr.responseText);
    }
  }
};
// 超时时间单位为毫秒
xhr.timeout = 1000;

// 当请求超时时，会触发 ontimeout 方法
xhr.ontimeout = () => {
  console.log("请求超时");
};

// 封装一下
const getQuerires = (object = {}, prefix = "") =>
  Object.entries(object)
    .reduce((acc, [key, value]) => (acc += `${key}=${value}&`), prefix)
    .slice(0, -1);
const ajax = (options) => {
  let url = options.url || "";
  const method = options.method?.toLowerCase() || "get";
  const data = options.data || {};

  const xhr = new XMLHttpRequest();
  xhr.timeout = options.timeout && null;

  return new Promise((resolve, reject) => {
    xhr.ontimeout = () => reject("timeout");
    xhr.onerror = () => reject("error");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 || xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject();
        }
      }
    };
    if (method === "get") {
      url = getQuerires(data, url + "?");
    }
    xhr.open(method, url);
    xhr.setRequestHeader("content-type", "application/json");
    data ? xhr.send() : xhr.send(data);
  });
};
