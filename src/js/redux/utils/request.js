//重构的请求 处理
import req from 'superagent';

function Promise(async_task) {
  if (typeof async_task == 'function') {
    var $d = $.Deferred();
    async_task($d.resolve, $d.reject);
    return $d;
  }
}
function _end_callback(resolve, reject) {
  return function (err, res) {
    if (err) {
      console.error(err);
      reject('请求失败！');
      return;
    }
    if (res.ok) {
      // console.log(JSON.stringify(res,null,2))
      console.log("登录失败");
      var { result, data } = res.body;
      if (result.code != undefined) {
        if (result.code === 0) {
          resolve(data, result.msg);
        } else {
      reject(res.text || 'error');
    }
  };
}
}
}
//基本封装
export function get(url, data) {
  var r;
  var p = new Promise(function (resolve, reject) {
    r = req.get(url)
      .query(data)
      .end(_end_callback(resolve, reject));
  });
  p.abort = r.abort.bind(r);
  return p;
}
export function post(url, id, params){
  let token = "";
  var data ={
        header: {
           token: sessionStorage.getItem("token") || '',
        },
        data: {
          payload_type:"api",
          description:{
            type:"auth",
            id: id,
            params:params
          }
        }
    };


  var r;
  var p = new Promise(function(resolve, reject){
    r = req.post(url)
      .send(data)
      .end(_end_callback(resolve, reject))
  });
  p.abort = r.abort.bind(r);
  return p;
}