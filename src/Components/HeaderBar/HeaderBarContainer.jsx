import React from 'react';
import HeaderBar from './HeaderBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductCategoriesSelector } from '../../Redux/Selectors/ProductsSelector';

function HeaderBarContainer(props) {
  const {
    productCategories,
    closeMobileDrawer
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <HeaderBar 
      navigate={navigate}
      productCategories={productCategories}
      closeMobileDrawer={closeMobileDrawer}
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

    }
  )
)(HeaderBarContainer);
