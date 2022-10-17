// 获取年月日
function formatterDate(type = "Y-M-D h:m:s", date?: any) {
  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }
  let Y = date.getFullYear();
  let M = date.getMonth() + 1;
  let D = date.getDate();
  let W = date.getDay();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  switch (W) {
    case 1:
      W = "一";
      break;
    case 2:
      W = "二";
      break;
    case 3:
      W = "三";
      break;
    case 4:
      W = "四";
      break;
    case 5:
      W = "五";
      break;
    case 6:
      W = "六";
      break;
    case 0:
      W = "日";
      break;
  }
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return type
    .replace("Y", Y)
    .replace("M", M)
    .replace("D", D)
    .replace("W", W)
    .replace("h", h)
    .replace("m", m)
    .replace("s", s);
}
/**
 * @param {Function} fn 需要执行的方法，因this指向问题，建议不使用箭头函数，
 * @param {Number} delay 间隔时间，默认值100
 * @param {Boolean} promptly 是否立即执行，默认false
 * **/
const debounce = (fn: Function, delay = 100, promptly?: boolean) => {
  let timer: any = null;
  return function (...args: any[]) {
    // 立即执行
    if (promptly) {
      // 当timer为null时执行
      if (!timer) fn.apply(this, args);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
};
//颜色16进制换算rgba,添加透明度
const hexToRgba = (hex: string, opacity: number) => {
  if (hex.length === 4) {
    return (
      "rgba(" +
      parseInt("0x" + hex.slice(1, 2) + hex.slice(1, 2)) +
      "," +
      parseInt("0x" + hex.slice(2, 3) + hex.slice(2, 3)) +
      "," +
      parseInt("0x" + hex.slice(3, 4) + hex.slice(3, 4)) +
      "," +
      opacity +
      ")"
    );
  }
  return (
    "rgba(" +
    parseInt("0x" + hex.slice(1, 3)) +
    "," +
    parseInt("0x" + hex.slice(3, 5)) +
    "," +
    parseInt("0x" + hex.slice(5, 7)) +
    "," +
    opacity +
    ")"
  );
};

(Date.prototype as any).format = function (fmt: string) {
  var o: any = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

export { formatterDate, debounce, hexToRgba };
