export function promiseTimeOut(time: number) {
  return new Promise((resolve) => {
    return setTimeout(resolve, time);
  });
}
