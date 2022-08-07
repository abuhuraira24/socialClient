export const time = (time) => {
  let getTime = {};
  if (time.includes("hours")) {
    getTime.time = time.replace("hours", "h");
  }
  if (time.includes("minutes")) {
    getTime.time = time.replace("minutes", "m");
  }
  if (time.includes("seconds")) {
    getTime.time = time.replace("seconds", "s");
  }
  if (time.includes("an hour")) {
    getTime.time = time.replace("hour", "h");
  }
  if (time.includes("day")) {
    getTime.time = time.replace("day", "d");
  }

  return {
    getTime,
  };
};
