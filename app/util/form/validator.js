import _ from 'lodash';

// form 表单 数据格式 验证器
const validator = {

  // 验证是否为空
  isEmpty(value){
    return typeof value === 'undefined' || !value.trim();
  },

  // 验证手机号码
  isPhone(value){
    return /^1[34578]\d{9}$/.test(value);
  },

  // 验证是否为数字
  isNumber(value){
    return typeof value === 'number' && value === value; // typeof NaN === 'number'
  },

  // 验证是否为boolean
  isBoolean(value){
    return typeof value === 'boolean';
  },

  // 验证是否相等
  isEqual(val1, val2){
    return _.isEqual(val1, val2);
  },

  // 长度限制
  isLength(val, min, max){
    let length = val.toString().trim().length;
    // 验证结果
    let result = true;
    // 长度 大于等于min, 小于等于max
    typeof min !== 'undefined' && (result = result && length >= min);
    typeof max !== 'undefined' && (result = result && length <= max);
    return result;
  }
};

export default validator