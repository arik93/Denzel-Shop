// import { createSelector } from "reselect";

// const getUsersPrimitive = (state) => {
//   return (
//     state.usersPage.users
//   )
// };
// export const getUsers = createSelector(getUsersPrimitive, (users) => {
//   return (
//     users.filter((u) => { return true })
//   )
// });

export const getCartItemsSelector = (state) => {
  return (
    state.CartReducer.cartItems
  )
};

export const getCartItemsQuantitySelector = (state) => {
  return (
    state.CartReducer.cartItemsQuantity
  )
};