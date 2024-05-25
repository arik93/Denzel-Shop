import React, { useState, useEffect } from 'react';
import ProductFullInfoControlsStyle from './ProductFullInfoControlsStyle.module.scss';
import { Divider, Button, Flex, Badge, Descriptions, Rate } from 'antd';
import { MinusOutlined, PlusOutlined, HeartOutlined, ControlOutlined, ShoppingCartOutlined, CheckOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

export default function ProductFullInfoControls(props) {
  const {
    navigate,
    productInfo,
    cartItems,
    getCartItems,
    addItemToCart,
    getWishlistItems,
    addItemToWishlist
  } = props;

  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(Number(productInfo.minimum));

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    let newCount = count - 1;
    if (newCount < 1) {
      newCount = 1;
    }
    setCount(newCount);
  };
  
  useEffect(() => {
    setIsProcessing(true);
    getCartItems().then(() => {
      setIsProcessing(false);
    });
    setCount(Number(productInfo.minimum));
  }, [productInfo.minimum]);

  const onAddItemToWishlistClick = async (product_id) => {
    setLoading(true);
    await addItemToWishlist(product_id);
    getWishlistItems();
    setLoading(false);
  }
  
  const onAddItemClick = async (product_id, quantity) => {
    setLoading(true);
    await addItemToCart(product_id, quantity);
    getCartItems();
    setLoading(false);
  };

  const productAddedToCart = cartItems.find((item) => {
    return Number(item.product_id) === Number(productInfo.product_id);
  });

  const items = productInfo.attributes.map((attribute) => {
    return {
      label: attribute.text,
      children: attribute.text
    }
  });

  const ButtonGroup = Button.Group;

  const renderCartButton = () => {
    if (isProcessing) {
      return "...Loading";
    };

    if (productInfo.stock_status_id !== "7") {
      return (
        <Button disabled={true} type="primary" className={ProductFullInfoControlsStyle.addToCartBtn}>
          Нет в наличии
        </Button>
      );
    };

    if (!productAddedToCart) {
      return (
        <ButtonGroup>
          <ButtonGroup>
            <Button
              disabled={count <= Number(productInfo.minimum)}
              onClick={decrease}
              icon={<MinusOutlined />}
              className={ProductFullInfoControlsStyle.buttonMinus}
            />
            <div className={ProductFullInfoControlsStyle.badgeWrapper}>
              <Badge overflowCount={999} count={count} offset={[0, 0]} />
            </div>
            <Button
              onClick={increase}
              icon={<PlusOutlined />}
              className={ProductFullInfoControlsStyle.buttonPlus}
            />
          </ButtonGroup>

          <Button
            disabled={productInfo.stock_status_id !== "7"}
            onClick={() => { onAddItemClick(productInfo.product_id, count) }}
            className={ProductFullInfoControlsStyle.addToCartBtn}
            type="primary"
            icon={<ShoppingCartOutlined />}
          >
            {!loading ? "В корзину" : "Добавляем"}
          </Button>
        </ButtonGroup>
      );
    };

    return (
      <Button
        onClick={() => { navigate('/cart') }}
        className={ProductFullInfoControlsStyle.addToCartBtn}
        type="primary"
        icon={<CheckOutlined />}
      >
        В корзине
      </Button>
    );
  };

  const isMiniMobile = useMediaQuery({ query: '(max-width: 440px)' });

  return (
    <div className={ProductFullInfoControlsStyle.controlsWrapper}>
      <Flex 
        align="center" 
        justify="space-between" 
        vertical={isMiniMobile ? true : false} 
        gap={isMiniMobile ? 'middle' : 'small'}
      >
        <div className={ProductFullInfoControlsStyle.topControlButtonsWrapper}> 
          <Button 
            onClick={() => {
              onAddItemToWishlistClick(productInfo.product_id)
            }} 
            type="primary" 
            icon={<HeartOutlined />}
          >
            В избранное
          </Button>

          <Button type="primary" icon={<ControlOutlined />}>
            Сравнить
          </Button>
        </div>

        <Rate allowHalf defaultValue={2.5} />
      </Flex>

      <Divider />

      <Descriptions
        title="Характеристики"
        bordered
        column={1}
        // column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={items}
      />

      <Divider />

      <Flex gap="small" wrap="wrap" align='center' justify='space-between'>
        <div style={{ fontWeight: '600', fontSize: '16px', lineHeight: '1.5' }}>
          Цена: {Math.round(productInfo.price)}
        </div>

        {renderCartButton()}
      </Flex>
    </div>
  )
}
