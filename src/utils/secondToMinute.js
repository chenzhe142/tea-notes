const MINUTE_TO_SECOND = 60;

export default function secondToMinute(timeInSecond) {
  let minute = Math.floor(timeInSecond / MINUTE_TO_SECOND);
  let second = timeInSecond % MINUTE_TO_SECOND;
  return { minute: minute, second: second};
}
