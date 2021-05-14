<template>
  <th v-if="visibility.columns[column].visible">
    <div class="mt-3" @click="sorting.set(column)">
      <button class="styleless-button" type="button"><slot></slot></button>
      <span v-if="sorting.column === column">
        <i class="bi bi-arrow-up" v-if="sorting.order === 'asc'"></i>
        <i class="bi bi-arrow-down" v-if="sorting.order === 'desc'"></i>
      </span>
    </div>
  </th>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["column", "sorting", "visibility"],
});
</script>
