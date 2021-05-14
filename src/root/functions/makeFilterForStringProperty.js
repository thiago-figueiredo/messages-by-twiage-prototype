export const makeFilterForStringProperty = ({ string }) => (property) => {
  return String(property).toLowerCase().includes(string.toLowerCase());
};
