/**
 * 转换活动时间
 * @param 时间戳
 * @returns {{timeStr: string, yearStr: string, str: string,
 *          year: number, month: *, day: *, h: *, mm: *, s: *}}
 */
export function setTime(time) {
  if (!time) return "";

  // 时间转换添加0
  function add0(m) {
    return m < 10 ? `0${ m }` : m;
  }

  const date = time ? new Date(window.parseInt(time)) : new Date();
  const year = date.getFullYear();
  const month = add0(date.getMonth() + 1);
  const day = add0(date.getDate());
  const h = add0(date.getHours());
  const mm = add0(date.getMinutes());
  const s = add0(date.getSeconds());
  const str = `${ month }月${ day }日`;
  const yearStr = `${ year }年${ month }月`;
  const timeStr = `${ year }-${ month }-${ day } ${h}:${mm}:${s}`;
  const duringStr = `${h}:${mm}:${s}`;
  return { duringStr, timeStr, yearStr, str, year, month, day, h, mm, s };
}

export default setTime;
