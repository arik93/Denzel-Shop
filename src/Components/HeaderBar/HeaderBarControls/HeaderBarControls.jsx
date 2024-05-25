import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Select, Flex, Badge, ConfigProvider, Button } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, HeartOutlined, MenuOutlined } from '@ant-design/icons';
import HeaderBarControlsStyle from './HeaderBarControlsStyle.module.scss';
import './../customANTD.css';
import SearchBarContainer from './../../SearchBar/SearchBarContainer';
import { useMediaQuery } from 'react-responsive';

export default function HeaderBarControls(props) {
  const {
    navigate,
    cartItemsQuantity,
    wishlistItemsQuantity,
    showMobileDrawer
  } = props;

  const [open, setOpen] = useState(false);

  const [cartBounce, setCartBounce] = useState(false);
  const [wishlistBounce, setWishlistBounce] = useState(false);

  useEffect(() => {
    if (cartItemsQuantity > 0) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 4000);
    }

    if (wishlistItemsQuantity > 0) {
      setWishlistBounce(true);
      setTimeout(() => setWishlistBounce(false), 4000);
    }
  }, [cartItemsQuantity, wishlistItemsQuantity]);

  const selectRef = useRef();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <ConfigProvider
      theme={{
        components: {
          Badge: {
            colorError: "rgb(254, 179, 0, 0)",
            colorErrorHover: "rgb(254, 179, 0, 0)",
            colorBgContainer: "rgb(254, 123, 0)",
            colorBorderBg: "rgb(254, 179, 0, 0)",
            textFontSize: 15,
          },
          Button: {
            colorPrimaryHover: "rgb(254, 179, 0)",
            colorPrimaryActive: "rgb(235, 154, 79, 0)",
          }
        },
      }}
    >
      <div className={HeaderBarControlsStyle.headerBarControlsWrapper}>
        {
          isMobileOrTablet
            ? <div className={HeaderBarControlsStyle.topButtonsWrapper}>
              <Button
                style={{ top: '4px' }}
                type='primary'
                icon={<MenuOutlined style={{ fontSize: '20px' }} />}
                onClick={showMobileDrawer}
              />
            </div>
            : null
        }
        <Flex gap="small" align="center" justify={'space-between'}>
          <div className={`${HeaderBarControlsStyle.topButtonsWrapper} ${cartBounce ? HeaderBarControlsStyle.bounce : ''}`}>
            <Button
              style={{ top: '4px' }}
              type='primary'
              icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
              onClick={() => { navigate('/cart') }}
            />
            <Badge
              overflowCount={999}
              count={cartItemsQuantity}
              offset={[-12, -25]}
            />
          </div>
          {/* <div className={`${HeaderBarControlsStyle.topButtonsWrapper} ${wishlistBounce ? HeaderBarControlsStyle.bounce : ''}`}>
            <Button
              style={{ top: '4px' }}
              type='primary'
              icon={<HeartOutlined style={{ fontSize: '20px' }} />}
              onClick={() => { navigate('/wishlist') }}
            />
            <Badge
              overflowCount={999}
              count={wishlistItemsQuantity}
              offset={[-12, -25]}
            />
          </div> */}
          <div className={HeaderBarControlsStyle.topButtonsWrapper}>
            <Button
              style={{ top: '4px' }}
              type='primary'
              icon={<SearchOutlined style={{ fontSize: '20px' }} />}
              onClick={showDrawer}
            />
          </div>

          <Select
            ref={selectRef}
            defaultValue={1}
            onChange={handleChange}
            options={[
              {
                value: 1,
                label: 'RU',
              },
              {
                value: 2,
                label: 'EN',
              },
              {
                value: 3,
                label: 'KZ',
              }
            ]}
          />
        </Flex>

        <Drawer
          title={<SearchBarContainer />}
          placement={'top'}
          // closable={false}
          onClose={onClose}
          open={open}
        >
          <p>Some content...</p>
          <p>Some content...</p>
          <p>Some content...</p>
        </Drawer>
      </div>
    </ConfigProvider>
  )
}
