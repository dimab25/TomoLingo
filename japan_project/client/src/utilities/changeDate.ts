const getFormattedDate = (param:string) => {
    return new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  export default getFormattedDate