import React from 'react';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import { compose } from 'redux';

function SearchBarContainer(props) {
  return (
    <SearchBar />
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
)(SearchBarContainer);
