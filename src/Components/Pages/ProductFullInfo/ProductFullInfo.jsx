import React from 'react';
import ProductFullInfoControls from './ProductFullInfoControls/ProductFullInfoControls';
import ProductFullInfoDescription from './ProductFullInfoDescription/ProductFullInfoDescription';
import ProductFullInfoStyle from './ProductFullInfoStyle.module.scss';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import { Divider, Flex, Breadcrumb, Typography, Image } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import './customANTD.css';
import { useMediaQuery } from 'react-responsive';

export default React.memo(function ProductFullInfo(props) {
  const {
    navigate,
    productInfo,
    productCategories,
    cartItems,
    getCartItems,
    addItemToCart,
    getWishlistItems,
    addItemToWishlist
  } = props;

  const { Title } = Typography;

  const findPathToRoot = (array, targetId) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].category_id === targetId) {
        // Если текущий объект имеет нужный ID, возвращаем путь к нему
        return [
          {
            title: <a href={array[i].url}>{array[i].name}</a>
          }
        ];
      } else if (array[i].children) {
        // Если у текущего объекта есть дети, вызываем функцию рекурсивно
        const path = findPathToRoot(array[i].children, targetId);
        if (path) {
          // Если путь найден, добавляем URL текущего объекта к пути и возвращаем его
          return [
            {
              title: <a href={array[i].url}>{array[i].name}</a>
            }
          ].concat(path);
        }
      }
    }
    // Если объект не найден, возвращаем null
    return null;
  };

  const parentCategoryId = productInfo?.categories[0].category_id;
  const breadCrumbs = findPathToRoot(productCategories, parentCategoryId) || [];

  const isMobile = useMediaQuery({ query: '(max-width: 880px)' });

  if (!productInfo) {
    return <div>...Loading</div>
  };

  return (
    <div className={ProductFullInfoStyle.productFullInfoWrapper}>
      <div>
        <Breadcrumb
          items={[
            ...breadCrumbs,
            {
              title: productInfo.description[0].name,
            },
          ]}
        />
      </div>

      <Divider />

      <div className={ProductFullInfoStyle.titleWrapper}>
        <Title>
          {productInfo.description[0].name}
        </Title>
      </div>

      <Flex vertical={isMobile ? true : false}>
        <div className={ProductFullInfoStyle.sliderWrapper}>
          <AwesomeSlider
            bullets={false}
            animation={"cubeAnimation"}
            className={ProductFullInfoStyle.awsBtn}
          >
            {productInfo?.images?.map((image) => {
              return (
                <div key={image.product_image_id}>
                  <Image
                    src={'http://denzel.kz/image/' + image.image}
                    preview={{
                      mask: <ZoomInOutlined />,
                      maskClassName: 'customMask'
                    }}
                  />
                </div>
              )
            })}
          </AwesomeSlider>
        </div>

        <div className={ProductFullInfoStyle.productFullInfoControlsWrapper}>
          <ProductFullInfoControls
            navigate={navigate}
            productInfo={productInfo}
            cartItems={cartItems}
            getCartItems={getCartItems}
            addItemToCart={addItemToCart}
            getWishlistItems={getWishlistItems}
            addItemToWishlist={addItemToWishlist}
          />
        </div>
      </Flex>

      <div className={ProductFullInfoStyle.productFullInfoDescriptionWrapper}>
        <ProductFullInfoDescription
          productInfo={productInfo}
        />
      </div>
    </div>
  )
})
