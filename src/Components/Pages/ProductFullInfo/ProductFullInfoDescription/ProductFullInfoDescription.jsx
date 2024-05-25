import React from 'react';
import ProductFullInfoDescriptionStyle from './ProductFullInfoDescriptionStyle.module.scss';
import { Tabs } from 'antd';
import { ReadOutlined, BarChartOutlined, CommentOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import '../customANTD.css';

export default React.memo(function ProductFullInfoDescription(props) {
  const {
    productInfo
  } = props;

  const items = [
    {
      key: '1',
      label: 'Описание',
      children: <DescriptionSection description={productInfo.description[0].description} />,
      icon: <ReadOutlined />
    },
    {
      key: '2',
      label: 'Характеристики',
      children: <CharacteristicSection />,
      icon: <BarChartOutlined />
    },
    {
      key: '3',
      label: 'Отзывы',
      children: <ReviewSection />,
      icon: <CommentOutlined />
    },
  ];
  
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Tabs
      type={isMobile ? 'line' : 'card'} 
      tabPosition={isMobile ? 'left' : 'top'}
      items={items}
      // onChange={onChange}
    />
  )
})

const DescriptionSection = (props) => {
  const {
    description
  } = props

  return (
    <div className={ProductFullInfoDescriptionStyle.descriptionText}>
      {description}
    </div>
  )
}
const CharacteristicSection = () => {
  return (
    <div className={ProductFullInfoDescriptionStyle.descriptionText}>
      Максимальный диаметр сверления (дерево), мм
      20
      Максимальный диаметр сверления (металл), мм
      10
      Частота вращения шпинделя, об/мин
      0-400/0-1600
      Максимальный крутящий момент, Н·м
      40
      Диаметр патрона, мм
      13
      Тип патрона
      быстрозажимной одномуфтовый металлический
      Наличие реверса
      да
      Максимальный диаметр сверления (бетон), мм
      6
      Номинальная мощность, Вт
      300
      Длина кабеля, м
      3
      Легкий доступ к угольным щеткам
      да
      Электронная регулировка частоты вращения
      есть
      Напряжение, В
      230
      Гарантия
      3 года
      Вес, кг
      1,83
      Длина в упаковке, мм
      255
      Ширина в упаковке, мм
      235
      Высота в упаковке, мм
      75
      Тип упаковки
      коробка
      Страна производства
      Китай
      Страна бренда
      Германия
      Комплектация
      Дрель-шуруповерт - 1 шт, руководство по эксплуатации с гарантийным талоном - 1 шт
    </div>
  )
}
const ReviewSection = () => {
  return (
    <div className={ProductFullInfoDescriptionStyle.descriptionText}>
      Отзывы
    </div>
  )
}
