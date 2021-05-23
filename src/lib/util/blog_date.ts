const blogDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

export default blogDate;
