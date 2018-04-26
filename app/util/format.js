/**
 * 格式化 时间毫秒数
 * @param {number} time
 * @param {string} rule
 * @returns {string}
 */
export function formatDate(time=new Date().getTime(), rule='YYYY-MM-DD hh:mm:ss'){
  let date = new Date(time);
  let year = date.getFullYear();
  let month = format2digits(+date.getMonth() + 1);
  let day = format2digits(date.getDate());
  let hours = format2digits(date.getHours());
  let minutes = format2digits(date.getMinutes());
  let seconds = format2digits(date.getSeconds());
  let keywords = [
    {rule: /YYYY/g, data: year},
    {rule: /MM/g, data: month},
    {rule: /DD/g, data: day},
    {rule: /hh/g, data: hours},
    {rule: /mm/g, data: minutes},
    {rule: /ss/g, data: seconds}
  ];
  keywords.forEach(keyword => {
    rule = rule.replace(keyword.rule,keyword.data);
  });
  return rule;
}

/**
 * 格式化 2位数
  * @param {number} num
 * @returns {string}
 */
function format2digits(num){
  if(num < 10 && num >= 0){
    return '0' + num;
  }
  return num;
}