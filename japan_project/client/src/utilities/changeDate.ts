//REVIEW good job with the helper functions

const getFormattedDate = (param: Date | string) => {
  return new Date(param).toLocaleString("en-GB", {
    // day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

const getFormattedDateAndTime = (param: Date | string) => {
  return new Date(param).toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });
};

const getFormattedDateAndDay = (param: Date | string) => {
  return new Date(param).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default getFormattedDate;
export { getFormattedDateAndTime };
export { getFormattedDateAndDay };
