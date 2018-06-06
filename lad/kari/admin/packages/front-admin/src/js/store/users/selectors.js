import { createSelector } from 'reselect'
import get from 'lodash/get'

const idUser = (state, props) => props.userId
export const usersDataGetter = (state, props) => state.users.data
const usersListGetter = (state, props) => state.users.list

export const userSelectorFactory = () => createSelector(usersDataGetter, idUser, (users, id) => users[id])
