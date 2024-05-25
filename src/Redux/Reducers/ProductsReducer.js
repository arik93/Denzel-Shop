import { productsAPI } from "../../API/API";

const SET_PRODUCT_INFO = 'SET_PRODUCT_INFO';
const SET_PRODUCT_CATEGORIES = 'SET_PRODUCT_CATEGORIES';
const SET_PRODUCT_CATEGORY_INFO = 'SET_PRODUCT_CATEGORY_INFO';
const SET_PRODUCTS_IN_CATEGORY = 'SET_PRODUCTS_IN_CATEGORY'


const initialState = {
  productInfo: null,
  productCategories: [],
  productCategoryInfo: {},
  productsInCategory: []
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_INFO:
      return {
        ...state,
        productInfo: action.info
      }

    case SET_PRODUCT_CATEGORIES:
      return {
        ...state,
        productCategories: [...action.categories]
      }

    case SET_PRODUCT_CATEGORY_INFO:
      return {
        ...state,
        productCategoryInfo: {...action.categoryInfo}
      }

    case SET_PRODUCTS_IN_CATEGORY:
      return {
        ...state,
        productsInCategory: [...action.products]
      }
      
    default:
      return state;
  }
};

//Actions
const setProductInfo = (info) => {
  return {
    type: SET_PRODUCT_INFO,
    info
  }
};

const setProductCategories = (categories) => {
  return {
    type: SET_PRODUCT_CATEGORIES,
    categories
  }
};

const setProductCategoryInfo = (categoryInfo) => {
  return {
    type: SET_PRODUCT_CATEGORY_INFO,
    categoryInfo
  }
};

const setProductsInCategory = (products) => {
  return {
    type: SET_PRODUCTS_IN_CATEGORY,
    products
  }
};

//Thunks
export const getProductInfo = (id) => {
  return (
    async (dispatch) => {
      const response = await productsAPI.getProductInfo(id);
      dispatch(setProductInfo(response.data));
    }
  )
};

export const getProductInfoBySlug = (slug) => {
  return (
    async (dispatch) => {
      const response = await productsAPI.getProductInfoBySlug(slug);
      dispatch(setProductInfo(response.data));
    }
  )
};

export const getProductCategories = () => {
  return (
    async (dispatch) => {
      const response = await productsAPI.getProductCategories();
      dispatch(setProductCategories(response.data));
    }
  )
};

export const getProductsInCategoryById = (id) => {
  return (
    async (dispatch) => {
      const response = await productsAPI.getProductsInCategoryById(id);
      dispatch(setProductsInCategory(response.data));
    }
  )
};

export const getProductsInCategoryBySlug = (slug) => {
  return (
    async (dispatch) => {
      const response = await productsAPI.getProductsInCategoryBySlug(slug);
      dispatch(setProductCategoryInfo(response.data));
      if (response.data.children?.length === 0 ) {
        dispatch(setProductsInCategory(response.data.category_products))
      } else if (response.data.children) {
        dispatch(setProductsInCategory(response.data.children));
      }
    }
  )
}

export default ProductsReducer;