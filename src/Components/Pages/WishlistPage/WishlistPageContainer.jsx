import React from 'react';
import WishlistPage from './WishlistPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from 'react-router-dom';
import { getWishlistItemsSelector } from './../../../Redux/Selectors/WishlistSelector';
import { getWishlistItems, deleteWishlistItem } from './../../../Redux/Reducers/WishlistReducer';

function WishlistPageContainer(props) {
  const {
    wishlistItems,
    getWishlistItems,
    deleteWishlistItem
  } = props;

  const navigate = useNavigate();

  return (
    <WishlistPage
      wishlistItems={wishlistItems}
      getWishlistItems={getWishlistItems}
      deleteWishlistItem={deleteWishlistItem}
      navigate={navigate}
    />
  )
};

const mapStateToProps = (state) => {
  return {
    wishlistItems: getWishlistItemsSelector(state)
  }
};


export default compose(
  connect(
    mapStateToProps,
    {
      getWishlistItems,
      deleteWishlistItem
    }
  )
)(WishlistPageContainer);
