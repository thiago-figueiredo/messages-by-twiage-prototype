import { reactive } from "vue";

import { makeFilterForStringProperty } from "../../../root/functions/makeFilterForStringProperty";

const columns = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  name: "",
  state: "",
};

const makeFilter = () => {
  const addressLine1Filter = makeFilterForStringProperty({
    string: filtering.columns.addressLine1,
  });
  const addressLine2Filter = makeFilterForStringProperty({
    string: filtering.columns.addressLine2,
  });
  const cityFilter = makeFilterForStringProperty({
    string: filtering.columns.city,
  });
  const nameFilter = makeFilterForStringProperty({
    string: filtering.columns.name,
  });
  const stateFilter = makeFilterForStringProperty({
    string: filtering.columns.state,
  });

  return (hospital) =>
    addressLine1Filter(hospital.addressLine1) &&
    addressLine2Filter(hospital.addressLine2) &&
    cityFilter(hospital.city) &&
    nameFilter(hospital.name) &&
    stateFilter(hospital.state);
};

export const filtering = reactive({
  columns,
  makeFilter,
});
