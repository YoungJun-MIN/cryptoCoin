const throttle = (callback, delay) => {
  let lastCall = 0; // 마지막 실행 시간
  return (event) => {
    const now = new Date().getTime();
    if(now - lastCall >= delay) { // 일정 시간 이상 지난 후에만 실행
      callback(event);
      lastCall = now; // 마지막 실행 시간 갱신
    }
  }
}