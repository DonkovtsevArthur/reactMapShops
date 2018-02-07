import * as React from 'react';
import * as UI from 'material-ui';
import { WidgetsProps } from '../../containers/Widgets';
import Widget from '../../containers/Widget';

const TabsHeaders: React.StatelessComponent<WidgetsProps> = (props) => {
  const tabs = props.widgetConfigs;
  return (
    <UI.Tabs>
      {
        tabs.map((tab) => (
          <UI.Tab
            key={tab.appId}
            label={tab.dataSourceConfig[0].items.filter(item => item.name === tab.index)[0].alias}
          >
            <Widget
              {...props.widgets[tab.appId]}
              appId={tab.appId}
              getData={props.getData}
              updateWidget={props.updateWidget}
              period={tab.period}
            />
          </UI.Tab>
        ))
      }
    </UI.Tabs>
  );
};

export default TabsHeaders;
