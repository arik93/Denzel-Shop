import React, { useEffect } from 'react';
import PageSwitcher from './PageSwitcher';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import { getProductCategoryInfoSelector } from '../../../Redux/Selectors/ProductsSelector';
import { getProductsInCategoryBySlug } from '../../../Redux/Reducers/ProductsReducer';

function PageSwitcherContainer(props) {
  const {
    productCategoryInfo,
    getProductsInCategoryBySlug
  } = props;

  const {productSlug} = useParams();

  useEffect(() => {
    getProductsInCategoryBySlug(productSlug);
  }, [productSlug]);

  return (
    <PageSwitcher
      productCategoryInfo={productCategoryInfo}
      productSlug={productSlug}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    productCategoryInfo: getProductCategoryInfoSelector(state)
  }
};


export default compose(
  connect(
    mapStateToProps,
    {
      getProductsInCategoryBySlug
    }
  )
)(PageSwitcherContainer);
