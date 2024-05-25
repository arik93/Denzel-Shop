import React, { useEffect } from 'react';
import CategoryOrProductsPage from './CategoryOrProductsPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  getProductCategoryInfoSelector,
  getProductsInCategorySelector
 } from '../../../Redux/Selectors/ProductsSelector';
import {
  getProductsInCategoryBySlug
} from '../../../Redux/Reducers/ProductsReducer';

function CategoryOrProductsPageContainer(props) {
  const {
    productCategoryInfo,
    productsInCategory,
    getProductsInCategoryBySlug
  } = props;

  const navigate = useNavigate();

  const {productSlug} = useParams();

  useEffect(() => {
    getProductsInCategoryBySlug(productSlug);
  }, [productSlug])

  return (
    <CategoryOrProductsPage 
      productCategoryInfo={productCategoryInfo}
      productsInCategory={productsInCategory}
      navigate={navigate}
    />
  )
};

const mapStateToProps = (state) => {
  return {
    productCategoryInfo: getProductCategoryInfoSelector(state),
    productsInCategory: getProductsInCategorySelector(state)
  }
};


export default compose(
  connect(
    mapStateToProps,
    {
      getProductsInCategoryBySlug
    }
  )
)(CategoryOrProductsPageContainer);
