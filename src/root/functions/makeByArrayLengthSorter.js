export const makeByArrayLengthSorter = ({ column, order }) => (
  itemA,
  itemB,
) => {
  const a = (itemA[column] || []).length;
  const b = (itemB[column] || []).length;

  if (order === "desc") {
    return b - a;
  }

  return a - b;
};
