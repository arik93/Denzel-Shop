import { wishlistAPI } from "../../API/API";

const SET_WISHLIST_ITEMS = 'SET_WISHLIST_ITEMS';
const SET_WISHLIST_ITEMS_QUANTITY = 'SET_WISHLIST_ITEMS_QUANTITY';

const initialState = {
  wishlistItems: [],
  wishlistItemsQuantity: null
};

const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WISHLIST_ITEMS:
      return {
        ...state,
        wishlistItems: [...action.wishlistItems]
      }

    case SET_WISHLIST_ITEMS_QUANTITY:
      return {
        ...state,
        wishlistItemsQuantity: action.quantity
      }
      
    default:
      return state;
  }
};

//Actions
const setWishlistItems = (wishlistItems) => {
  return {
    type: SET_WISHLIST_ITEMS,
    wishlistItems
  }
}

const setWishlistItemsQuantity = (quantity) => {
  return {
    type: SET_WISHLIST_ITEMS_QUANTITY,
    quantity
  }
}


//Thunks
export const getWishlistItems = () => {
  return (
    async (dispatch) => {
      const response = await wishlistAPI.getWishlistItems();
      dispatch(setWishlistItems(response.products ? response.products : []));
      dispatch(
        setWishlistItemsQuantity(
          response.products 
            ? response.products.reduce((acc, obj) => {
                return acc + Number(obj.quantity);
              }, 0)
            : 0
        )
      );
    }
  )
};

export const addItemToWishlist = (product_id, quantity) => {
  return (
    async (dispatch) => {
      const response = await wishlistAPI.addItemToWishlist(product_id, quantity);
      return response;
    }
  )
};

export const deleteWishlistItem = (id) => {
  return (
    async (dispatch) => {
      const response = await wishlistAPI.deleteWishlistItem(id);
      return response;
    }
  )
};

export default WishlistReducer;