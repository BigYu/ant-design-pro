import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, View, Facet } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import { Checkbox, Row, Col, Switch } from 'antd';
import G2 from '@antv/g2';
import autoHeight from '../autoHeight';
import { isWorkday } from '../../../utils/utils';
import WorkdaySwitch from '../WorkdaySwitch';

const eachView = (view, facet) => {
  const { colValue, data } = facet;

  if (colValue === 'Revenue') {
    view.source(data, {
      Revenue: {
        alias: '营业额'
      },
      UserCount: {
        alias: '客户数量'
      }
    });
    view.axis('Revenue', {
      title: {
        autoRotate: false,
        offset: -10,
        position: 'end',
        textStyle: {
          textAlign: 'start'
        }
      }
    });
    view.axis('Event', false);
    view.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    view.line().position('Date*Revenue').color('#4472c4');
    view.line().position('Date*UserCount').color('#ed7d31');
    view.interval().position('Date*Event').color('#255e91');
  } else if (colValue === 'WeatherPM25') {
    view.source(data, {
      WeatherPM25: {
        alias: 'PM2.5'
      },
      WeatherAvgTemperature: {
        alias: '平均温度'
      }
    });
    view.axis('WeatherPM25', {
      title: {
        autoRotate: false,
        offset: -10,
        position: 'end',
        textStyle: {
          textAlign: 'start'
        }
      }
    });
    view.area().position('Date*WeatherPM25').color('#a5a5a5');
    view.line().position('Date*WeatherAvgTemperature').color('#ffc000');
  }
};
@autoHeight()
export default class TrendChartByWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignoreWeekend: true,
    };
    this.onChangeIgnoreWeekend = this.onChangeIgnoreWeekend.bind(this);
  }

  onChangeIgnoreWeekend(ignoreWeekend) {
    this.setState({
      ignoreWeekend,
    });
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const {
      data = [],
      events,
    } = this.props;

    if (data.length === 0) return;

    if (this.chartContainer) {
      if (this.chartContainer.firstChild) {
        this.chartContainer.removeChild(this.chartContainer.firstChild);
      }
      const chart = new G2.Chart({
        container: this.chartContainer,
        forceFit: true,
        height: 400,
        padding: [ 20, 80 ],
        animate: false
      });
      chart.source(this.chartDv, {
        Date: {
          type: 'time',
          tickCount: 10,
          mask: 'M/DD H:mm'
        }
      });
      chart.facet('mirror', {
        fields: [ 'type' ],
        showTitle: false, // 显示标题
        padding: [ 0, 0, 40, 0],
        eachView
      });
      chart.render();
    }
  }

  render() {
    const {
      data = [],
      events,
    } = this.props;

    // const endDate = new Date(data[data.length - 1].Date);
    // const defaultStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const ds = this.ds = new DataSet();

    const chartDv = this.chartDv = ds.createView();
    chartDv.source(data)
      .transform({
        type: 'map',
        callback(obj) {
          obj.Revenue = Number(obj.Revenue);
          obj.UserCount = Number(obj.UserCount);
          obj.WeatherPM25 = Number(obj.WeatherPM25);
          obj.WeatherAvgTemperature = Number(obj.WeatherAvgTemperature);
          obj.Event = ((new Date(obj.Date) - 1) % 23 === 3) ? 1 : 0;
          return obj;
        }
      })
      // .transform({
      //   type: 'fold',
      //   fields: [ 'Revenue', 'UserCount', 'WeatherPM25', 'WeatherAvgTemperature' ],
      //   key: 'type',
      //   value: 'value',
      //   retains: [ 'Revenue', 'UserCount', 'WeatherPM25', 'WeatherAvgTemperature', 'Date' ]
      // })
      .transform({
        type: 'fold',
        fields: [ 'Revenue', 'WeatherPM25' ],
        key: 'type',
        value: 'value',
        retains: [ 'Revenue', 'UserCount', 'WeatherPM25', 'WeatherAvgTemperature', 'Event', 'Date' ]
      });

    if (this.state.ignoreWeekend) {
      chartDv.transform({
        type: 'filter',
        callback: (item) => {
          const date = new Date(item.Date);
          return isWorkday(date);
        }
      })
    }
    // const cols = {
    //   Date: {
    //     type: 'time',
    //     tickCount: 10,
    //     mask: 'M/DD H:mm'
    //   }
    // }
    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <div>
        <Row type='flex' justify='space-between' style={{ margin: '10px 60px' }}>
          <WorkdaySwitch
            checked={this.state.ignoreWeekend}
            onChange={this.onChangeIgnoreWeekend}
          />
        </Row>
        <div ref={(div) => { this.chartContainer = div; }}></div>
        {/* <Chart height={400} data={chartDv} scale={{
            Date: { type: 'time' },
            Revenue: { type: 'linear'},
            WeatherPM25: { type: 'linear', alias: 'PM2.5' },
          }} forceFit padding={[ 20, 80 ]}>
          <Facet type="mirror" fields={[ 'type' ]} showTitle={false} padding={[ 0, 0, 40, 0]} eachView={eachView}/>
        </Chart> */}
      </div>
    );
  }
}
