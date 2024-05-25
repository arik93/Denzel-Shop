import React, { useState } from 'react';
import './reset.css';
import AppStyle from './AppStyle.module.scss';
import { ConfigProvider, Layout, Drawer } from 'antd';
import { Route, Routes } from 'react-router-dom';
import HeaderBarContainer from './Components/HeaderBar/HeaderBarContainer';
import HeaderBarControlsContainer from './Components/HeaderBar/HeaderBarControls/HeaderBarControlsContainer';
import MainPageContainer from './Components/Pages/MainPage/MainPageContainer';
import FooterBar from './Components/FooterBar/FooterBar';
import CartPageContainer from './Components/Pages/CartPage/CartPageContainer';
import WishlistPageContainer from './Components/Pages/WishlistPage/WishlistPageContainer';
import PageSwitcherContainer from './Components/Pages/PageSwitcher/PageSwitcherContainer';
import { useMediaQuery } from 'react-responsive';


export default React.memo(function App() {
  const { Header, Footer, Content } = Layout;

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1224px)' });

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showMobileDrawer = () => setIsDrawerVisible(true);
  const closeMobileDrawer = () => setIsDrawerVisible(false);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextBase: "#000000"
        },
        components: {
          Menu: {
            itemBg: "rgb(254, 179, 0)",
            itemHoverBg: "rgb(254, 123, 0)",
            itemSelectedBg: "rgb(254, 123, 0)",
            subMenuItemBg: "rgba(0, 0, 0, 0)",
            itemHoverColor: "white",
            itemSelectedColor: "white",
            groupTitleFontSize: 18,
            borderRadiusLG: "7px",
            colorPrimary: "rgb(254, 123, 0)",
            popupBg: "rgb(254, 179, 0)",
            fontSize: 16,
          },
          Card: {
            colorBgContainer: "rgb(254, 179, 0)",
            headerBg: "rgb(254, 123, 0)",
            colorBorderSecondary: "rgb(99, 99, 99)",
            borderRadiusLG: "7px",
            boxShadowCard: "0px 0px 7px 4px rgba(72, 128, 45, 0.9)",
            headerFontSize: 16
          },
          Descriptions: {
            borderRadiusLG: 7,
            labelBg: "rgba(254, 179, 0, 0.02)",
            colorTextSecondary: "rgba(255, 255, 255)"
          },
          Badge: {
            colorError: "rgb(254, 179, 0)",
            colorBgContainer: "rgb(0, 0, 0)",
            colorBorderBg: "rgb(254, 179, 0)",
            textFontSize: 19
          },
          Tabs: {
            colorBgContainer: "rgb(254, 123, 0)",
            colorBorder: "rgba(217, 217, 217, 0)",
            colorBorderSecondary: "rgba(5, 5, 5, 0)",
            itemSelectedColor: "rgb(255, 255, 255)",
            itemActiveColor: "rgb(255, 255, 255)",
            itemHoverColor: "rgb(255, 255, 255)",
            cardBg: "rgb(254, 179, 0)",
            borderRadiusLG: "7px",
            inkBarColor: "rgb(254, 123, 0)"
          },
          Button: {
            colorPrimary: "rgb(254, 179, 0)",
            colorPrimaryHover: "rgb(254, 123, 0)",
            colorPrimaryActive: "rgb(235, 154, 79)",
            colorPrimaryBorder: "rgba(145, 202, 255, 0)",
            primaryColor: "rgb(0, 0, 0)",
            borderRadius: "7px",
            primaryShadow: "",
          },
          Drawer: {
            colorBgElevated: "rgb(254, 179, 0)"
          },
          Select: {
            optionSelectedColor: "rgba(255, 255, 255, 0.88)",
            optionSelectedBg: "rgb(254, 123, 0)",
            colorPrimaryHover: "rgb(254, 123, 0)",
            borderRadius: 7,
            controlOutline: "rgba(5, 145, 255, 0)",
            colorPrimary: "rgb(254, 123, 0)",
            selectorBg: "rgb(254, 179, 0)",
            colorBgElevated: "rgb(254, 179, 0)",
            colorBorder: "rgba(217, 217, 217, 0)",
            optionActiveBg: "rgba(0, 0, 0, 0.2)"
          }
        }
      }}
    >
      <Layout className={AppStyle.layoutStyle}>
        {isMobileOrTablet && (
          <Drawer
            title="Боковая панель"
            placement="left"
            closable={true}
            onClose={closeMobileDrawer}
            visible={isDrawerVisible}
          >
            <HeaderBarContainer closeMobileDrawer={closeMobileDrawer} />
          </Drawer>
        )}

        <Layout className={AppStyle.layoutStyle}>
          <Header className={AppStyle.headerStyle}>
            {
              isMobileOrTablet
              ? <HeaderBarControlsContainer showMobileDrawer={showMobileDrawer} />
              : <HeaderBarContainer />
            }
          </Header>

          <Content className={AppStyle.contentStyle}>
            <Routes>
              <Route path='/'>
                <Route index element={<MainPageContainer />} />
                <Route path=':productSlug' element={<PageSwitcherContainer />} />
              </Route>

              <Route path="cart">
                <Route index element={<CartPageContainer />} />
              </Route>

              {/* <Route path="wishlist">
                <Route index element={<WishlistPageContainer />} />
              </Route> */}
            </Routes>
          </Content>

          <Footer className={AppStyle.footerStyle}>
            <FooterBar />
          </Footer>
        </Layout>

      </Layout>
    </ConfigProvider>
  );
});
