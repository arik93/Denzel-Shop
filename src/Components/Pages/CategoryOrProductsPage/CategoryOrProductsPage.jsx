import React from 'react';
import CategoryOrProductsPageStyle from './CategoryOrProductsPageStyle.module.scss';
import { Card, Typography } from 'antd';

export default React.memo(function CategoryOrProductsPage(props) {
  const {
    productCategoryInfo,
    productsInCategory,
    navigate
  } = props;

  const onCardClickHandler = (param) => {
    navigate(`/${param}`);
  };

  const convertUrlToName = (url) => {
    url = url.replace(/-/g, ' ');
    let words = url.split(' ');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    url = words.join(' ');

    return url;
  };

  const categoriesMapRender = productsInCategory.map((category) => {
    return (
      <Card.Grid 
        id={category.product_id} 
        className={CategoryOrProductsPageStyle.gridStyle} 
        key={productCategoryInfo.children.length === 0 ? category.product_id : category.category_id} 
        onClick={() => {onCardClickHandler(category.url)}}
      >
        <div>
          <div style={{marginBottom: '15px'}}>
            <Typography.Text italic={true} strong={true}>
              {productCategoryInfo.children.length === 0 ? convertUrlToName(category.url) : category.name}
            </Typography.Text>
          </div>
          
          <img src={'http://denzel.kz/image/' + category.image} alt="" />
        </div>
      </Card.Grid>
    )
  });

  return (
    <div className={CategoryOrProductsPageStyle.catalogWrapper}>
      <Card title={productCategoryInfo.name} className={CategoryOrProductsPageStyle.cardStyle}>
        {categoriesMapRender}
      </Card>
    </div>
  )
});
