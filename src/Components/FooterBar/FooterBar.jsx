import React from 'react';
import { Flex, Divider } from 'antd';
import './customANTD.css';

export default function FooterBar() {
  return (
    <div>
      <Flex justify={'space-between'}>
        <div>О компании</div>

        <div>
          <div>Физические лица</div>
          <div>Юридические лица</div>
        </div>

        <div>
          <div>Информация</div>
          <div>Сервис</div>
        </div>

        <div>Контакты</div>
      </Flex>
      <Divider />
      <div>
        <div>
          Информация на сайте otvertka.kz не является публичной офертой. Характеристики и внешний вид может отличаться от данных на сайте. Вся информация размещенная на сайте является собственностью ТОО "Отвертка.kz". Копирование и публикация на прочих ресурсах допускается только с письменного разрешения ТОО "Отвертка.kz"
        </div>
        <div>
          ТОО "Отвертка.kz" - otvertka.kz © 2013 - {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}
