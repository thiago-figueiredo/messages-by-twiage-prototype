import { reactive } from "vue";

import { makeBasicSorter } from "../../../root/functions/makeBasicSorter";

const columns = {
  addressLine1: makeBasicSorter,
  addressLine2: makeBasicSorter,
  city: makeBasicSorter,
  name: makeBasicSorter,
  state: makeBasicSorter,
};

const makeSorter = ({ column, order }) => columns[column]({ column, order });

const set = (column) => {
  if (sorting.column === column) {
    sorting.order = sorting.order === "desc" ? "asc" : "desc";

    return;
  }

  sorting.column = column;
  sorting.order = "asc";
};

export const sorting = reactive({
  column: "name",
  makeSorter,
  order: "asc",
  set,
});
