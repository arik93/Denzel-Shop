import React from 'react';
import WishlistStyle from './WishlistStyle.module.scss';
import { Divider, Card, Flex, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

export default React.memo(function WishlistPage(props) {
  const {
    wishlistItems,
    getWishlistItems,
    deleteWishlistItem,
    navigate
  } = props;

  const navigateToProductPage = (id) => {
    navigate(`/${id}`);
  };

  const deleteItem = async (id) => {
    await deleteWishlistItem(id);
    getWishlistItems();
  };

  const renderWishlistItems = wishlistItems.map((product, index) => {
    return (
      <div key={product.product_id}>
        <Flex align={"center"} justify={"space-between"}>
          <div
            style={{ display: 'flex', alignItems: 'center', flexGrow: 1, width: '15%' }} 
            onClick={() => {navigateToProductPage(product.product_id)}}
          >
            <img style={{ width: '25%', marginRight: '15px' }} src={product.thumb} alt="" />
            <div className={WishlistStyle.productName}>
              {product.name}
            </div>
          </div>

          <div style={{ flexGrow: 1, width: '15%' }}>
            Цена: {product.total}
          </div>

          <Button 
            type='primary' 
            icon={<CloseCircleOutlined />} 
            onClick={() => {deleteItem(product.key)}}
          />
        </Flex>

        {index < wishlistItems.length - 1 && <Divider />}
      </div>
    )
  });

  return (
    <div className={WishlistStyle.cardWrapper}>
      <Card
        title="Избранное"
        style={{ width: '100%' }}
      >
        {renderWishlistItems}
      </Card>
    </div>
  )
})
