<template>
  <div class="mt-4">
    <div>
      <div class="align-items-center d-flex mb-3" style="overflow-x: auto">
        <div>
          Showing <i>{{ categories?.length }}</i> of {{ total }} categories
        </div>
        <div class="btn-group ms-auto" role="group" aria-label="Basic example">
          <button
            type="button"
            class="btn btn-sm btn-outline-dark"
            @click="add"
          >
            Add
          </button>
          <button type="button" class="btn btn-sm btn-outline-dark">
            Download
          </button>
          <button type="button" class="btn btn-sm btn-outline-dark">
            Refresh
          </button>
        </div>
      </div>
      <div>
        <div class="dropdown">
          <button
            aria-expanded="false"
            class="btn btn-outline-dark btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
          >
            Showing <i>{{ visibility.visibleColumnsCount }}</i> of 5 columns
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li
              :key="columnName"
              v-for="(columnInfo, columnName) in visibility.columns"
            >
              <button
                class="dropdown-item"
                @click.prevent.stop="visibility.set(columnName)"
              >
                <span
                  v-if="!columnInfo.visible"
                  style="display: inline-block; height: 18px; width: 16px"
                ></span>
                <i class="bi bi-check2" v-if="columnInfo.visible"></i>
                {{ columnInfo.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <form class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <lo-th column="name" :sorting="sorting" :visibility="visibility"
                >Name</lo-th
              >
              <lo-th column="city" :sorting="sorting" :visibility="visibility"
                >City</lo-th
              >
              <lo-th column="state" :sorting="sorting" :visibility="visibility"
                >State</lo-th
              >
              <lo-th
                column="addressLine1"
                :sorting="sorting"
                :visibility="visibility"
                >Address Line 1</lo-th
              >
              <lo-th
                column="addressLine2"
                :sorting="sorting"
                :visibility="visibility"
                >Address Line 2</lo-th
              >
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-if="visibility.columns.name.visible">
                <input
                  class="form-control form-control-sm"
                  placeholder="Search by name"
                  type="search"
                  v-model="filtering.columns.name"
                />
              </td>
              <td v-if="visibility.columns.city.visible">
                <input
                  class="form-control form-control-sm"
                  placeholder="Search by city"
                  type="search"
                  v-model="filtering.columns.city"
                />
              </td>
              <td v-if="visibility.columns.state.visible">
                <input
                  class="form-control form-control-sm"
                  placeholder="Search by state"
                  type="search"
                  v-model="filtering.columns.state"
                />
              </td>
              <td v-if="visibility.columns.addressLine1.visible">
                <input
                  class="form-control form-control-sm"
                  placeholder="Search by address line 1"
                  type="search"
                  v-model="filtering.columns.addressLine1"
                />
              </td>
              <td v-if="visibility.columns.addressLine2.visible">
                <input
                  class="form-control form-control-sm"
                  placeholder="Search by address line 2"
                  type="search"
                  v-model="filtering.columns.addressLine2"
                />
              </td>
            </tr>
            <tr
              @click="goToHospital({ _id: category.id })"
              @key-up.enter="goToHospital({ _id: category.id })"
              :key="category.id"
              v-for="category in categories"
              tabindex="0"
            >
              <td v-if="visibility.columns.name.visible">
                {{ category.name }}
              </td>
              <td v-if="visibility.columns.city.visible">
                {{ category.last_update }}
              </td>
              <td v-if="visibility.columns.state.visible">
                {{ category.category_id }}
              </td>
              <td v-if="visibility.columns.addressLine1.visible">
                {{ category.addressLine1 }}
              </td>
              <td v-if="visibility.columns.addressLine2.visible">
                {{ category.addressLine2 }}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
import { useMutation } from "@urql/vue";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

import lo_th from "../../../root/components/lo-table/lo-th.vue";

import { filtering } from "./hospitals-table.filtering";
import { sorting } from "./hospitals-table.sorting";
import { visibility } from "./hospitals-table.visibility";

export default defineComponent({
  components: {
    "lo-th": lo_th,
  },

  props: ["data", "fetching"],

  setup(props) {
    const total = computed(() => props.data?.category.length);

    const categories = computed(() => {
      if (props.data !== undefined) {
        const allCategories = props.data.category;

        const filteredHospitals = allCategories.filter(filtering.makeFilter());

        const filteredSortedHospitals = filteredHospitals.sort(
          sorting.makeSorter({ column: sorting.column, order: sorting.order }),
        );

        return filteredSortedHospitals;
      }

      return [];
    });

    const router = useRouter();

    const goToHospital = ({ _id }) => {
      router.push({ path: `/category/${_id}` });
    };

    const { executeMutation } = useMutation(`
      mutation {
        insert_category_one (object: {name: "New Category" }) {
          name
          category_id
        }
      }`);

    const add = async () => {
      const result = await executeMutation();
      console.log(result.data.insert_category_one);
    };

    return {
      add,
      filtering,
      goToHospital,
      categories,
      sorting,
      total,
      visibility,
    };
  },
});
</script>
