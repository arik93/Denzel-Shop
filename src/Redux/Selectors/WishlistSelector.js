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

export const getWishlistItemsSelector = (state) => {
  return (
    state.WishlistReducer.wishlistItems
  )
};

export const getWishlistItemsQuantitySelector = (state) => {
  return (
    state.WishlistReducer.wishlistItemsQuantity
  )
};