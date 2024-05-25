import React from 'react';
import HeaderBarControls from './HeaderBarControls';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCartItemsQuantitySelector } from '../../../Redux/Selectors/CartSelector';

import { getWishlistItemsQuantitySelector } from '../../../Redux/Selectors/WishlistSelector';

function HeaderBarControlsContainer(props) {
  const {
    cartItemsQuantity,
    wishlistItemsQuantity,
    showMobileDrawer
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <HeaderBarControls 
      navigate={navigate}
      cartItemsQuantity={cartItemsQuantity}
      wishlistItemsQuantity={wishlistItemsQuantity}
      showMobileDrawer={showMobileDrawer}
    />
  )
};

const mapStateToProps = (state) => {
  return {
    cartItemsQuantity: getCartItemsQuantitySelector(state),
    wishlistItemsQuantity: getWishlistItemsQuantitySelector(state)
  }
};

export default compose(
  connect(
    mapStateToProps,
    {

    }
  )
)(HeaderBarControlsContainer);
