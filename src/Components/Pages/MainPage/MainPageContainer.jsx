import React from 'react'
import MainPage from './MainPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useEffect } from 'react';

function MainPageContainer(props) {
  const {

  } = props;

  useEffect(() => {
    
  }, []);

  return (
    <MainPage
      
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
      
    }
  )
)(MainPageContainer);