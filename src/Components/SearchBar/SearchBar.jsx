import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Flex } from 'antd';


export default React.memo(function SearchBar(props) {
  const handleOnSearch = (string, results) => {

  };

  const handleOnSelect = (item) => {

  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  };

  // const handleOnFocus = () => {
  //   console.log('Focused')
  // };

  // const handleOnHover = (result) => {
  // };

  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ]

  return (
    <Flex justify='center'>
      <div style={{ width: '500px' }}>
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          formatResult={formatResult}
          // onHover={handleOnHover}
          // onFocus={handleOnFocus}
          styling={{
            borderRadius: '7px',
            backgroundColor: 'rgb(254, 179, 0)',
            border: '2px solid rgb(254, 123, 0)',
            hoverBackgroundColor: "rgb(254, 123, 0)",
            iconColor: "white",
            lineColor: "rgb(254, 123, 0)",
          }}
        />
      </div>
    </Flex>
  )
})
