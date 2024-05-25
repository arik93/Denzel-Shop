import React from 'react';
import CatalogPageContainer from '../CatalogPage/CatalogPageContainer';
import CategoryOrProductsPageContainer from '../CategoryOrProductsPage/CategoryOrProductsPageContainer';
import ProductFullInfoCointainer from '../ProductFullInfo/ProductFullInfoCointainer';

export default function PageSwitcher(props) {
  const { productCategoryInfo, productSlug } = props;

  if (productSlug === 'catalog') {
    return <CatalogPageContainer />
  } else if (productCategoryInfo.type === 'category') {
    return <CategoryOrProductsPageContainer />
  } else if (productCategoryInfo.type === 'product') {
    return <ProductFullInfoCointainer />
  }
  
}
