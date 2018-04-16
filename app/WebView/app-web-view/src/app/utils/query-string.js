
// 数据序列化
export default {
  stringify: function(data){
    // 若无数据
    if(!data){return '';}
    let pairs = [];
    for(let key in data){
      // 过滤掉 继承来的属性
      if(!data.hasOwnProperty(key)){continue;}
      // 过滤掉 方法类的属性
      if(typeof data[key] === 'function'){continue;}
      let value = data[key].toString();
      key = encodeURIComponent(key);
      value = encodeURIComponent(value);
      pairs.push(`${key}=${value}`);
    }
    return pairs.join('&');
  }
}