import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  boolean,
  array,
  object,
  number
} from "@storybook/addon-knobs";
import backgrounds from "@storybook/addon-backgrounds";
import Title from "../src/components/Title";
import RoundButton from "../src/components/RoundButton";
import PieGraphAndList from "../src/components/PieGraphAndList";
import Line from "../src/components/Line";
import Bar from "../src/components/Bar";
import Counter from "../src/components/Counter";
import "../src/scss/main.scss";
import ElementWindow from "../src/components/ElementWindow";
import HorizontalContainer from "../src/components/HorizontalContainer";
import VerticalContainer from "../src/components/VerticalContainer";
import Input from "../src/components/Input";

const stories = storiesOf("Графики", module);
stories.addDecorator(withKnobs);

const COLORS = [
  "#984DF7",
  "#3F63FC",
  "#459AFF",
  "#45D2FF",
  "#10C499",
  "#68E37C",
  "#C6ED72",
  "#FFD585",
  "#FFAE66",
  "#FF6969",
  "#E3E6FA"
];

storiesOf("Цвета", module).add("Цветовая палитра", () => {
  return (
    <ElementWindow>
      <VerticalContainer
        style={{
          justifyContent: "center"
        }}
      >
        {COLORS.map((color, i) => (
          <p
            key={i}
            style={{
              backgroundColor: color,
              height: "100px",
              marginBottom: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {color}
          </p>
        ))}
      </VerticalContainer>
    </ElementWindow>
  );
});

storiesOf("Заголовки", module).add("Заголовки", () => (
  <Title text="Заголовкок тестовый" />
));

storiesOf("Кнопки", module).add("Круглая кнопка", () => (
  <RoundButton>
    <a href="/">Ссылка в виде кнопки</a>
  </RoundButton>
));

stories.add("Круговой график со списком", () => {
  const title = text("Заголовок", "Список должников");
  const data = object("Строка", [
    { x: "Должник 1", y: 1000 },
    { x: "Должник 2", y: 1300 },
    { x: "Должник 3", y: 1560 },
    { x: "Должник 4", y: 800 }
  ]);
  const colors = array("Цвета", COLORS);
  const currency = boolean("Показывать знак валюты?", true);
  return (
    <PieGraphAndList
      title={title}
      graphData={data}
      colors={colors}
      currency={currency}
      last={false}
    />
  );
});

stories.add("Линейный график", () => {
  const title = text("Заголовок", "Выручка");
  const data = object("Данные", [
    { x: "10.01.2018", y: 1000, y1: 900 },
    { x: "11.01.2018", y: 1200, y1: 1300 },
    { x: "12.01.2018", y: 1700, y1: 1900 },
    { x: "13.01.2018", y: 500, y1: 400 },
    { x: "14.01.2018", y: 700, y1: 980 },
    { x: "15.01.2018", y: 1700, y1: 2180 },
    { x: "16.01.2018", y: 1100, y1: 180 }
  ]);
  return <Line graphData={data} title={title} />;
});

stories.add("Бары", () => {
  const title = text("Заголовок", "Выручка");
  const data = object("Данные", [
    { x: "10.01.2018", y: 1000, y1: 900 },
    { x: "11.01.2018", y: 1200, y1: 1300 },
    { x: "12.01.2018", y: 1700, y1: 1900 },
    { x: "13.01.2018", y: 500, y1: 400 },
    { x: "14.01.2018", y: 700, y1: 980 },
    { x: "15.01.2018", y: 1700, y1: 2180 },
    { x: "16.01.2018", y: 1100, y1: 180 }
  ]);
  return <Bar graphData={data} title={title} currency />;
});

stories
  .addDecorator(
    backgrounds([{ name: "По умолчанию", value: "#F7F8FB", default: true }])
  )
  .add("Счетчик", () => {
    const title = text("Заголовок", "Выручка");
    const value = number("Текущий период", 1000);
    const prev = number("Предыдущий в процентах", 20);
    const width = number("Ширина в процентах", 16.666666667);
    const margin = number("Отступы в пикселях", 10);
    return (
      <HorizontalContainer>
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
        <Counter
          title={title}
          value={value}
          prev={prev}
          currency
          width={width}
          margin={margin}
        />
      </HorizontalContainer>
    );
  });

storiesOf("Forms", module).add("Input's", () => {
  class InputWithGetter extends React.Component {
    state = { value: "" };

    handleInputChange = ({ value }) => {
      this.setState({ value });
    };

    render() {
      const { value } = this.state;
      return (
        <div>
          <Input
            pattern="\d{1,}"
            settings="isNumbers"
            placeholder="Отправляем число наружу"
            onChange={this.handleInputChange}
          />
          <p>Значение input'a: {value}</p>
        </div>
      );
    }
  }

  return (
    <div className="demo-container-inputs">
      <Input
        placeholder="Иванов Иван Иванович"
        pattern="[A-zА-я]{2,}[\ ][A-zА-я]{2,}[\ ][A-zА-я]{2,}"
        settings="isLetter"
        required
      />
      <Input
        type="email"
        placeholder="ivanovii@mail.ru"
        pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
      />
      <Input
        placeholder="8 900 000 0000"
        pattern="\d{1}[\ ]\d{3}[\ ]\d{3}[\ ]\d{4}"
        settings="isPhone"
        // data-settings={JSON.stringify({ isPhone: true })}
        required
      />
      <Input
        placeholder="5200 0000 000"
        pattern="\d{4}[\ ]\d{4}[\ ]\d{3}"
        settings="isInn"
      />
      <Input
        placeholder="ivanovivan.ru"
        pattern="^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$"
      />
      <Input placeholder="Любое число" pattern="\d{1,}" settings="isNumbers" />
      <Input placeholder="Любой текст" />
      <InputWithGetter />
    </div>
  );
});
