import { createSelector } from 'reselect'

const roleIdGetter = (state, props) => props.roleId
export const rolesDataGetter = (state, props) => state.roles.data
export const rolesListGetter = (state, props) => state.roles.list

export const roleFactory = () => createSelector(roleIdGetter, rolesDataGetter, (roleId, data) => data[roleId])
