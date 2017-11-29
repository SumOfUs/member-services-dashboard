import { createReducer } from './create-reducer';
import { reduce } from 'lodash';

const initialState = {};

export const RESET_MEMBERS = '@app:members:search:reset';
export const UPDATE_MEMBERS = '@app:members:search:update';

const reset = () => initialState;
const update = (state, action) => {
  console.log('members:', action.members);
  return reduce(
    action.members,
    (result, member) => {
      result[member.id] = member;
      return result;
    },
    {}
  );
};

export default createReducer(initialState, {
  [RESET_MEMBERS]: reset,
  [UPDATE_MEMBERS]: update,
});

export function resetMembers() {
  return {
    type: RESET_MEMBERS,
  };
}

export function updateMembers(members) {
  return {
    type: UPDATE_MEMBERS,
    members,
  };
}
