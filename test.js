function getTime(seconds) {
  const year = parseInt(seconds / 31536000);
  let remainingSeconds = seconds % 31536000;
  const month = parseInt(remainingSeconds / 2592000);
  remainingSeconds = remainingSeconds % 2592000;
  const day = parseInt(remainingSeconds / 86400);
  remainingSeconds = remainingSeconds % 86400;
  const hour = parseInt(remainingSeconds / 3600);
  remainingSeconds = remainingSeconds % 3600;
  const minute = parseInt(remainingSeconds / 60);
  return `${year} year ${month} month ${day} day ${hour} hrs ${minute} mins ago`;
}

console.log(getTime(1672656000));
