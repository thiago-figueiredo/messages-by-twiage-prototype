import { computed, reactive } from "vue";

const columns = reactive({
  addressLine1: { name: "Address Line 1", visible: true },
  addressLine2: { name: "Address Line 2", visible: true },
  city: { name: "City", visible: true },
  name: { name: "Name", visible: true },
  state: { name: "State", visible: true },
});

const set = (column) => (columns[column].visible = !columns[column].visible);

const visibleColumnsCount = computed(() =>
  Object.values(columns).reduce((count, column) => {
    if (column.visible === true) {
      count += 1;
    }

    return count;
  }, 0),
);

export const visibility = reactive({
  columns,
  set,
  visibleColumnsCount,
});
