/**
 *
 * @param func    {Function}   实际要执行的函数
 * @param wait    {Number}     执行间隔，单位是毫秒（ms），默认1000ms
 * @param wait    {Object}     leading 前置执行
 * @return        {Function}   返回一个“节流”函数
 */

export function throttle(func, wait = 1000, leading = true) {
  // 利用闭包保存定时器和上次执行时间
  let timer = null;
  let previous; // 上次执行时间
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this;
    const args = arguments;
    const now = +new Date();
    if (previous && now < previous + wait) {
      if (leading) return;
      // 周期之中
      clearTimeout(timer);
      timer = setTimeout(function () {
        previous = now;
        func.apply(context, args);
      }, wait);
    } else {
      previous = now;
      func.apply(context, args);
    }
  };
}


/**
 * @param     func     {Function}   实际要执行的函数
 * @param     delay    {Number}     延迟时间，单位是毫秒（ms）
 * @return    {Function} 去抖动
 */

export function debounce(fn, delay = 1000) {
  let timer;

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给func
    var context = this;
    var args = arguments;

    // 函数被调用，清除定时器
    clearTimeout(timer);

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 func
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
