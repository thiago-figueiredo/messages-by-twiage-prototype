<template>
  <td v-if="visibility.columns[column].visible" class="text-end">
    <button
      @click.stop="
        showOrganisations({ organisationsPropertyName: column, user })
      "
      @keyup.enter.stop
      class="styleless-button"
      type="button"
      v-if="user[column]?.length"
    >
      {{ user[column].length }}
    </button>
    <span v-else>{{
      Array.isArray(user[column]) ? user[column].length : "N/A"
    }}</span>
  </td>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["column", "user", "showOrganisations", "visibility"],
});
</script>
