import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import HeaderBarStyle from './HeaderBarStyle.module.scss';
import './customANTD.css';
import CatalogMenu from './CatalogMenu/CatalogMenu';
import HeaderBarControlsContainer from './HeaderBarControls/HeaderBarControlsContainer';
import { useMediaQuery } from 'react-responsive';

export default React.memo(function HeaderBar(props) {
  const {
    navigate,
    productCategories,
    closeMobileDrawer
  } = props;

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <div className={HeaderBarStyle.headerWrapper}>
      <Menu
        mode={isMobileOrTablet ? 'vertical' : 'horizontal'}
        selectable={false}
        items={[
          {
            label: <span className={HeaderBarStyle.menuItemsText}>Главная</span>,
            icon: <HomeOutlined />,
            key: 'any0',
            onClick: (e) => {
              navigate('/');
              if (isMobileOrTablet) closeMobileDrawer();
            }
          },
          ...(
            isMobileOrTablet
              ? [{
                label: <span className={HeaderBarStyle.menuItemsText}>Каталог</span>,
                icon: <MenuUnfoldOutlined />,
                key: 'any2',
                onClick: (e) => {
                  navigate('/catalog');
                  if (isMobileOrTablet) closeMobileDrawer();
                }
              }]
              : [{
                label: <span className={HeaderBarStyle.menuItemsText}>Каталог</span>,
                icon: <MenuUnfoldOutlined />,
                key: 'any1',
                children: [
                  {
                    label: <CatalogMenu productCategories={productCategories} navigate={navigate} />,
                    key: 'catalogMenu',
                    style: {
                      height: 'fit-content',
                      backgroundColor: 'rgb(254, 179, 0)',
                    }
                  }
                ],
                onTitleClick: (e) => {
                  navigate('/catalog')
                }
              }]
          )
        ]}
        style={{
          alignItems: 'center',
          height: '100%',
          flex: "auto", 
          minWidth: 0
        }}
      />

      {
        isMobileOrTablet 
          ? null
          : <HeaderBarControlsContainer />
      }
    </div>
  )
});
