import * as React from "react";

interface TimeLineProps {
  period: string;
  appId: string;
  updateWidget(id: string, period: string): void;
}

const TimeLine: React.StatelessComponent<TimeLineProps> = props => {
  const dateDataArr = [
    ["Год", "year"],
    ["30 Дней", "30days"],
    ["7 дней", "7days"],
    ["Вчера", "yesterday"],
    ["Сегодня", "today"]
  ];

  const dateFilterButtons = dateDataArr.map(buttonData => {
    const [title, data] = buttonData;
    const handleClick = () => props.updateWidget(props.appId, data);
    return (
      <button
        className={props.period === data ? "active" : ""}
        onClick={handleClick}
      >
        {title}
      </button>
    );
  });

  return <div className="monitor-switch">{dateFilterButtons}</div>;
};

export default TimeLine;
