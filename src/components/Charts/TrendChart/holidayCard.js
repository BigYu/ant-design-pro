import React from 'react';
import { Row, Col, Card, Switch } from 'antd';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import numeral from 'numeral';
import autoHeight from '../autoHeight';
import { isWorkday } from '../../../utils/utils';
import WorkdaySwitch from '../WorkdaySwitch';

function isWorkdayData(item) {
  const date = new Date(item.Date);
  return isWorkday(date);
}

@autoHeight()
export default class HolidayCard extends React.Component {
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

  render() {
    const {
      data = [],
      field,
    } = this.props;

    if (data.length === 0) return null;
    data.sort((item1, item2) => new Date(item1.Date) - new Date(item2.Date));

    const ds = this.ds = new DataSet();

    const chartDv = this.ds.createView()
      .source(data)
      // .transform({
      //   type: 'fold',
      //   key: 'key',
      //   value: 'value',
      //   fields: [field, `Avg${field}`]
      // });

    if (this.state.ignoreWeekend) {
      chartDv.transform({
        type: 'filter',
        callback: isWorkdayData
      })
    }

    // https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/other/rain-and-flow
    // comparing with Wheather? PM25 & Temprature
    return (
      <Card
        className={this.props.styles.offlineCard}
        title={this.props.title}
        bordered={false}
        bodyStyle={{ padding: '0', marginTop: 16 }}
        style={{ marginBottom: 24 }}
      >
        <Row type='flex' justify='space-between' style={{ margin: '10px 60px' }}>
          <WorkdaySwitch
            checked={this.state.ignoreWeekend}
            onChange={this.onChangeIgnoreWeekend}
          />
        </Row>
        <Chart
          height={400}
          data={chartDv}
          scale={{
            Date: { type: 'time', min: data[0].Date, max: data[data.length-1].Date },
            // value: { type: 'linear', min: 0, max: this.props.max },
            [field]: { type: 'linear', min: 0, max: this.props.max, alias: this.props.alias },
            [`Avg${field}`]: { type: 'linear', min: 0, max: this.props.max, alias: `平均${this.props.alias}` },
          }}
          padding={[60, 140]}
          forceFit
        >
          <Axis name="Date" />
          {/* <Axis name="value" title={{}} label={{formatter: val => numeral(val).format('0,0')}} /> */}
          <Axis name={field} title={{}} label={{formatter: val => numeral(val).format('0,0')}} />
          <Axis name={`Avg${field}`} visible={false} />
          <Tooltip />
          <Legend position="right" />
          <Geom type="line" position={`Date*${field}`} size={2} color="#4472c4" />
          <Geom type="point" position={`Date*${field}`} size={4} color="#4472c4" />
          <Geom type="area" position={`Date*Avg${field}`} size={2} color="#ed7d31" />
        </Chart>
      </Card>
    );
  }
}
