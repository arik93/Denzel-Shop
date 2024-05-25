import React from 'react';
import ProductFullInfo from './ProductFullInfo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { getProductInfoSelector, getProductCategoriesSelector } from './../../../Redux/Selectors/ProductsSelector';
import { getProductInfoBySlug } from './../../../Redux/Reducers/ProductsReducer';

import { getCartItemsSelector } from './../../../Redux/Selectors/CartSelector';
import { getCartItems, addItemToCart } from './../../../Redux/Reducers/CartReducer';

import { getWishlistItems, addItemToWishlist } from './../../../Redux/Reducers/WishlistReducer';

function ProductFullInfoCointainer(props) {
  const {
    productInfo,
    getProductInfoBySlug,
    productCategories,

    cartItems,
    getCartItems,
    addItemToCart,

    getWishlistItems,
    addItemToWishlist
  } = props;

  const { productSlug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async() => {
      await getProductInfoBySlug(productSlug);
    })();
    getCartItems();
    getWishlistItems();
  }, [])

  return (
    <ProductFullInfo
      navigate={navigate}
      productInfo={productInfo}
      productCategories={productCategories}
      cartItems={cartItems}
      getCartItems={getCartItems}
      addItemToCart={addItemToCart}
      getWishlistItems={getWishlistItems}
      addItemToWishlist={addItemToWishlist}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    productInfo: getProductInfoSelector(state),
    cartItems: getCartItemsSelector(state),
    productCategories: getProductCategoriesSelector(state)
  }
};

export default compose(
  connect(
    mapStateToProps,
    {
      getProductInfoBySlug,
      getCartItems,
      addItemToCart,
      getWishlistItems,
      addItemToWishlist
    }
  )
)(ProductFullInfoCointainer);
