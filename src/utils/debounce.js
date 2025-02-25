const debounce = (callback, delay) => {
  let timeoutId = 0; // 마지막 실행 시간
  return (event) => {
    if(timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(event);
    }, delay)
  }
}

export default debounce