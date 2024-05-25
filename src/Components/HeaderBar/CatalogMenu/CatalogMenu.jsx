import React from 'react';
import { Menu } from 'antd';
import CatalogMenuStyle from './CatalogMenuStyle.module.scss'
import './customANTD.css';

export default function CatalogMenu(props) {
  const {
    productCategories,
    navigate
  } = props;

  const onItemClickHandler = (childNode, param, id) => {
    navigate(`/${param}`);
  };

  const createSubChild = (subChild) => {
    return {
      label: subChild.name,
      key: subChild.category_id,
      onClick: (e) => {
        onItemClickHandler(subChild, subChild.url, e.key);
        console.log('clicked SubChild', e)
      }
    };
  };
  
  const createChild = (category, child) => {
    return {
      label: child.name,
      key: child.category_id,
      ...(child.children
        ? {
            onTitleClick: (e) => {
              onItemClickHandler(child, category.url, e.key);
              console.log('clicked Child', e)
            },
            children: child.children.map((subChild) => createSubChild(subChild))
          }
        : {
            onClick: (e) => {
              onItemClickHandler(child, child.url, e.key);
              console.log('clicked Child', e)
            },
          })
    };
  };

  const mapProductCategories = productCategories.map((category) => {
    return (
      <Menu
        key={category.category_id}
        selectable={false}
        style={{ boxShadow: 'none', border: 'none', fontWeight: '600' }}
        items={[
          {
            label: category.name,
            key: category.category_id,
            type: 'group',
            children: [
              ...(category.children
                ? category.children.map((child) => createChild(category, child))
                : []
              )
            ]
          }
        ]}
      />
    )
  });

  if (productCategories.length === 0) {
    return <div>...Loading</div>
  }

  return (
    <div className={CatalogMenuStyle.catalogWrapper}>
      {mapProductCategories}
    </div>
  )
}