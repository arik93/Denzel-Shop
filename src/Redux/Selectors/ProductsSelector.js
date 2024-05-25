export const getProductInfoSelector = (state) => {
  return (
    state.ProductsReducer.productInfo
  )
};

export const getProductCategoriesSelector = (state) => {
  return (
    state.ProductsReducer.productCategories
  )
};

export const getProductCategoryInfoSelector = (state) => {
  return (
    state.ProductsReducer.productCategoryInfo
  )
};

export const getProductsInCategorySelector = (state) => {
  return (
    state.ProductsReducer.productsInCategory
  )
};

