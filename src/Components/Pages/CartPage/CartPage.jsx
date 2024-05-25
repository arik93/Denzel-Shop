import React, { useState, useEffect } from 'react';
import CartPageStyle from './CartPageStyle.module.scss';
import { Divider, Card, Flex, Button, Badge } from 'antd';
import { MinusOutlined, PlusOutlined, CloseCircleOutlined, ClearOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

export default React.memo(function CartPage(props) {
  const {
    cartItems,
    getCartItems,
    updateItemQuantity,
    deleteCartItem,
    clearCartItems,
    navigate
  } = props;

  const ButtonGroup = Button.Group;

  const [counts, setCounts] = useState({});

  useEffect(() => {
    const initialCounts = cartItems.reduce((acc, product) => {
      return {
        ...acc,
        [product.key]: Number(product.quantity),
      }
    }, {});

    setCounts(initialCounts);
  }, [cartItems]);

  const navigateToProductPage = (url) => {
    let convertedUrl = convertNameToUrl(url);
    navigate(`/${convertedUrl}`);
  };

  const convertNameToUrl = (name) => {
    let words = name.split(' ');
    words = words.map(word => word.toLowerCase());
    let url = words.join('-');

    return url;
  };

  const increase = async (key) => {
    const newQuantity = counts[key] + 1;
    await updateItemQuantity(key, newQuantity);
    await getCartItems();
    setCounts(prevCounts => {
      return {
        ...prevCounts,
        [key]: newQuantity,
      }
    });
  };

  const decrease = async (key) => {
    const newQuantity = Math.max(counts[key] - 1, 0);
    await updateItemQuantity(key, newQuantity);
    await getCartItems();
    setCounts(prevCounts => {
      return {
        ...prevCounts,
        [key]: newQuantity,
      }
    });
  };

  const deleteItem = async (key) => {
    await deleteCartItem(key);
    getCartItems();
  };

  const deleteAllItems = async () => {
    await clearCartItems();
    getCartItems();
  };

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const renderCartItems = cartItems.map((product, index) => {
    return (
      <div key={product.product_id}>
        <Button
          className={CartPageStyle.deleteBtnStyle}
          type='primary'
          icon={<CloseCircleOutlined />}
          onClick={() => { deleteItem(product.key) }}
        />

        <Flex 
          align={"center"} 
          justify={"space-between"} 
          vertical={isMobile && 'column'}
        >
          <Flex
            align={"center"}
            className={CartPageStyle.innerFlexElement}
            onClick={() => { navigateToProductPage(product.name) }}
          >
            <img style={{ width: '35%', marginRight: '15px' }} src={product.thumb} alt="" />
            <div className={CartPageStyle.productName}>
              {product.name}
            </div>
          </Flex>

          <ButtonGroup className={CartPageStyle.innerFlexElement} >
            <Button
              onClick={() => { decrease(product.key) }}
              icon={<MinusOutlined />}
              className={CartPageStyle.buttonMinus}
            />
            <div className={CartPageStyle.badgeWrapper}>
              <Badge overflowCount={999} count={counts[product.key]} offset={[0, 0]} />
            </div>
            <Button
              onClick={() => { increase(product.key) }}
              icon={<PlusOutlined />}
              className={CartPageStyle.buttonPlus}
            />
          </ButtonGroup>

          <div className={CartPageStyle.innerFlexElement}>
            Цена: {product.total}
          </div>
        </Flex>
        {index < cartItems.length - 1 && <Divider />}
      </div>
    )
  });

  return (
    <div className={CartPageStyle.cardWrapper}>
      <Card
        title="Товары в корзине"
        style={{ width: '100%' }}
        extra={
          <Button
            type='primary'
            icon={<ClearOutlined />}
            onClick={() => { deleteAllItems() }}
          >
            Очистить
          </Button>
        }
      >
        {renderCartItems}
      </Card>
    </div>
  )
})
