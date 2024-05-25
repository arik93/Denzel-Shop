import React from 'react';
import Cookies from 'js-cookie';
import App from './App';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useEffect, useState } from 'react';
import { getSession, setSession } from './Redux/Reducers/AppReducer';
import { getProductCategories } from './Redux/Reducers/ProductsReducer';
import { getCartItems } from './Redux/Reducers/CartReducer';
import { getWishlistItems } from './Redux/Reducers/WishlistReducer';

function AppContainer(props) {
  const {
    getSession,
    setSession,

    getProductCategories,
    getCartItems,
    getWishlistItems
  } = props;

  const [sessionKey, setSessionKey] = useState(null);

  const [isSessionSet, setIsSessionSet] = useState(false);

  useEffect(() => {
    const existingSessionKey = Cookies.get('session_key');

    if (existingSessionKey) {
      setSessionKey(existingSessionKey);
      setSession(true);
      setIsSessionSet(true);
    } else {
      (async () => {
        const newSessionKey = await getSession();
        Cookies.set('session_key', newSessionKey, { expires: 7 });
        setSessionKey(newSessionKey);
        setSession(true);
        setIsSessionSet(true);
      })();
    };
  }, [sessionKey]);

  useEffect(() => {
    if (isSessionSet) {
      getProductCategories();
      getCartItems();
      getWishlistItems();
    }
  }, [isSessionSet]);

  return (
    <App

    />
  )
}

const mapStateToProps = (state) => {
  return {

  }
};

export default compose(
  connect(
    mapStateToProps,
    {
      getSession,
      setSession,
      getProductCategories,
      getCartItems,
      getWishlistItems
    }
  )
)(AppContainer);
