// form 表单 数据格式 验证器
const validator = {

  // 验证是否为空
  isEmpty(value){
    return typeof value === 'undefined' || !value.trim();
  },

  // 验证手机号码
  isPhone(value){
    return /^1[34578]\d{9}$/.test(value);
  }
};

export default validator