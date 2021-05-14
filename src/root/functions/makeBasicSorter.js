export const makeBasicSorter = ({ column, order }) => (itemA, itemB) => {
  const a = String(itemA[column]);
  const b = String(itemB[column]);

  if (order === "desc") {
    return b.localeCompare(a);
  }

  return a.localeCompare(b);
};
