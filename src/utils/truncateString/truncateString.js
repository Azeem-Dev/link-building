export const truncateString = (MainString, maxLength) => {
  var trimmedString = MainString.substr(0, maxLength-3);
  return (trimmedString =
    trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    ) + "...");
};
