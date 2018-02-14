import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, array, object } from '@storybook/addon-knobs';
import Title from '../src/components/Title';
import RoundButton from '../src/components/RoundButton';
import PieGraphAndList from '../src/components/PieGraphAndList';
import '../src/scss/main.scss';

const stories = storiesOf('Графики', module);
stories.addDecorator(withKnobs);

storiesOf('Заголовки', module).add('Test', () => <Title text="Заголовкок тестовый" />);

storiesOf('Кнопки', module).add('Round', () => (
  <RoundButton>
    <a href="/">Ссылка в виде кнопки</a>
  </RoundButton>
));

stories.add('Круговой график со списком', () => {
  const title = text('Заголовок', 'Список должников');
  const data = object('Строка', { x: 'Должник 1', y: 1000 });
  const data1 = object('Строка', { x: 'Должник 2', y: 1300 });
  const data2 = object('Строка', { x: 'Должник 3', y: 1560 });
  const data3 = object('Строка', { x: 'Должник 4', y: 800 });
  const graphData = array('Данные', [data, data1, data2, data3]);
  const colors = array('Цвета', ['red', 'green', 'blue', 'yellow']);
  const currency = boolean('Показывать знак валюты?', true);
  return (
    <PieGraphAndList
      title={title}
      graphData={graphData}
      colors={colors}
      currency={currency}
      last={false}
    />
  );
});
