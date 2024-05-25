import React, { useEffect } from 'react';
import CartPage from './CartPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getCartItemsSelector } from './../../../Redux/Selectors/CartSelector';
import { getCartItems, updateItemQuantity, deleteCartItem, clearCartItems } from './../../../Redux/Reducers/CartReducer';
import { useNavigate } from 'react-router-dom';

function CartPageContainer(props) {
  const {
    cartItems,
    getCartItems,
    updateItemQuantity,
    deleteCartItem,
    clearCartItems
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, [])

  return (
    <CartPage
      cartItems={cartItems}
      getCartItems={getCartItems}
      updateItemQuantity={updateItemQuantity}
      deleteCartItem={deleteCartItem}
      clearCartItems={clearCartItems}
      navigate={navigate}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: getCartItemsSelector(state)
  }
};


export default compose(
  connect(
    mapStateToProps,
    {
      getCartItems,
      updateItemQuantity,
      deleteCartItem,
      clearCartItems
    }
  )
)(CartPageContainer);
