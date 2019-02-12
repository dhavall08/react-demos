import { cloneDeep } from 'lodash';

export const getClone = (state, changeValidation) => {
  let failed;
  for (let val in state.valid) {
    if (!state.valid[val]) {
      failed = true;
      state.valid[val] === null && changeValidation(val, false);
    }
  }
  if (failed) {
    return false;
  }
  else {
    return cloneDeep(state);
  }
}