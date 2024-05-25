import React from 'react';
import CatalogPageStyle from './CatalogPageStyle.module.scss';
import { Card, Typography } from 'antd';

export default React.memo(function CatalogPage(props) {
  const {
    productCategories,
    navigate
  } = props;

  const onCardClickHandler = async(param) => {
    navigate(`/${param}`);
  };

  const categoriesMapRender = productCategories.map((category) => {
    return (
      <Card.Grid 
        id={category.category_id} 
        className={CatalogPageStyle.gridStyle} 
        key={category.category_id} 
        onClick={() => {onCardClickHandler(category.url)}}
      >
        <div>
          <div style={{marginBottom: '15px'}}>
            <Typography.Text italic={true} strong={true}>
              {category.name}
            </Typography.Text>
          </div>

          <img src={'http://denzel.kz/image/' + category.image} alt="" />
        </div>
      </Card.Grid>
    )
  });

  return (
    <div className={CatalogPageStyle.catalogWrapper}>
      <Card title="Категории" className={CatalogPageStyle.cardStyle}>
        {categoriesMapRender}
      </Card>
    </div>
  )
});
