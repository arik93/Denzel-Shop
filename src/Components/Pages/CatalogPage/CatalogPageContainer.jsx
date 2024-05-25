import React, { useEffect } from 'react';
import CatalogPage from './CatalogPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from 'react-router-dom';
import { 
  getProductCategoriesSelector,
} from '../../../Redux/Selectors/ProductsSelector';
import {
  getProductCategories
} from '../../../Redux/Reducers/ProductsReducer';

function CatalogPageContainer(props) {
  const {
    productCategories,
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getProductCategories();
  }, [productCategories])

  return (
    <CatalogPage 
      productCategories={productCategories}
      navigate={navigate}
    />
  )
};

const mapStateToProps = (state) => {
  return {
    productCategories: getProductCategoriesSelector(state)
  }
};


export default compose(
  connect(
    mapStateToProps,
    {
      getProductCategories
    }
  )
)(CatalogPageContainer);
