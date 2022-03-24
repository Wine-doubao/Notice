// 设置localStorage和删除localStorage
export default{
  setExpire: (key, value, expire) => {
    let obj = {
      data: value,
      time: Date.now(),
      expire: expire
    };
    //localStorage 设置的值不能为对象,转为json字符串
    localStorage.setItem(key, JSON.stringify(obj));
  },  
  getExpire: key => {
      let val = localStorage.getItem(key);
      if (!val) {
        return val;
      }
      val = JSON.parse(val);
      if (Date.now() - val.time > val.expire) {
          localStorage.removeItem(key);
          return null;
      }
      return val.data;
  },
  remove(name) {//移出缓存
    localStorage.removeItem(name);
  },
  clear() {//移出全部缓存
    localStorage.clear();
    console.log("cleard");
  }
}