import axios from "axios";
import Cookies from 'js-cookie';

const instance1 = axios.create({
  baseURL: "http://denzel.kz/api/rest/",
  headers: {
    'Content-Type': 'application/json',
    'X-Oc-Merchant-Id': 'lJGr4BOk5epzbqXoXtxOJee8hUgSVV6v',
  },
});

const instance2 = axios.create({
  baseURL: "http://denzel.kz/api2/",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance1.interceptors.request.use((config) => {
  // Do something before request is sent
  const sessionKey = Cookies.get('session_key');
  config.headers['X-Oc-Session'] = sessionKey;
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

export const appAPI = {
  async getSession() {
    const response = await instance1.get(`session`);
    // console.log('session key:', response.data.data.session);
    return response.data.data.session;
  }
};

export const productsAPI = {
  async getProductInfo(productId) {
    const response = await instance2.get(`p/?product_id=${productId}`);
    return response;
  },

  async getProductInfoBySlug(slug) {
    const response = await instance2.get(`url/?keyword=${slug}`);
    return response;
  },

  async getProductCategories() {
    const response = await instance2.get(`category`);
    return response;
  },

  async getProductsInCategoryById(categoryId) {
    const response = await instance2.get(`product-category/?category_id=${categoryId}`);
    return response;
  },

  async getProductsInCategoryBySlug(slug) {
    const response = await instance2.get(`url/?keyword=${slug}`);
    return response;
  }
};

export const cartAPI = {
  async getCartItems() {
    const response = await instance1.get(`cart`);
    // console.log('cart items:', response.data.data);
    return response.data.data;
  },

  async addItemToCart(product_id, quantity) {
    const response = await instance1.post(`cart`, {
      product_id,
      quantity
    });
    // console.log('cart items added', response.data.data);
    return response.data.data;
  },

  async updateItemQuantity(key, quantity) {
    const response = await instance1.put(`cart`, {
      key,
      quantity
    });
    return response;
  },

  async deleteCartItem(key) {
    const response = await instance1.delete(`cart/${key}`);
    return response;
  },

  async clearCartItems() {
    const response = await instance1.delete(`cart/empty`);
    return response;
  }
};

export const wishlistAPI = {
  async getWishlistItems() {
    const response = await instance1.get(`wishlist`);
    return response.data.data;
  },

  async addItemToWishlist(product_id) {
    const response = await instance1.post(`wishlist/${product_id}`);
    return response.data.data;
  },

  async deleteWishlistItem(id) {
    const response = await instance1.delete(`wishlist/${id}`);
    return response;
  },
};


// export const profileAPI = {
//     async getUserProfile(userId) {
//         const response = await instance.get(`profile/${userId}`);
//         return response.data;
//     },

//     async getUserStatus(userId) {
//         const response = await instance.get(`profile/status/${userId}`);
//         return response.data;
//     },

//     async updateUserStatus(status) {
//         const response = await instance.put(`profile/status`, { status });
//         return response.data;
//     },
// };

// export const authAPI = {
//     async authMe() {
//         const response = await instance.get(`auth/me`);
//         return response.data;
//     },

//     async login(email, password, rememberMe) {
//         const response = await instance.post(`auth/login`, {
//             email,
//             password,
//             rememberMe
//         });
//         return response.data;
//     },

//     async logout() {
//         const response = await instance.delete(`auth/login`);
//         return response.data;
//     }
// };