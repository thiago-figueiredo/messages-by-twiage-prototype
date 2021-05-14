export const makeFilterForObjectsInsideArray = ({
  arrayPropertyName,
  itemPropertyName,
  string,
}) => (user) => {
  if (string === "") {
    return true;
  }

  if (Array.isArray(user[arrayPropertyName]) === false) {
    return false;
  }

  return user[arrayPropertyName].some((item) =>
    item[itemPropertyName].toLowerCase().includes(string.toLowerCase()),
  );
};
