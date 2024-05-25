import { cartAPI } from "../../API/API";

const SET_CART_ITEMS = 'SET_CART_ITEMS';
const SET_CART_ITEMS_QUANTITY = 'SET_CART_ITEMS_QUANTITY';

const initialState = {
  cartItems: [],
  cartItemsQuantity: null
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: [...action.cartItems]
      }

    case SET_CART_ITEMS_QUANTITY:
      return {
        ...state,
        cartItemsQuantity: action.quantity
      }
      
    default:
      return state;
  }
};

//Actions
const setCartItems = (cartItems) => {
  return {
    type: SET_CART_ITEMS,
    cartItems
  }
}

const setCartItemsQuantity = (quantity) => {
  return {
    type: SET_CART_ITEMS_QUANTITY,
    quantity
  }
}


//Thunks
export const getCartItems = () => {
  return (
    async (dispatch) => {
      const response = await cartAPI.getCartItems();
      dispatch(setCartItems(response.products ? response.products : []));
      dispatch(
        setCartItemsQuantity(
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

export const addItemToCart = (product_id, quantity) => {
  return (
    async (dispatch) => {
      const response = await cartAPI.addItemToCart(product_id, quantity);
      return response;
    }
  )
};

export const updateItemQuantity = (key, quantity) => {
  return (
    async (dispatch) => {
      const response = await cartAPI.updateItemQuantity(key, quantity);
      return response;
    }
  )
};

export const deleteCartItem = (key) => {
  return (
    async (dispatch) => {
      const response = await cartAPI.deleteCartItem(key);
      return response;
    }
  )
};

export const clearCartItems = () => {
  return (
    async (dispatch) => {
      const response = await cartAPI.clearCartItems();
      return response;
    }
  )
}

export default CartReducer;