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
      ignoreWeekend: false,
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
      .transform({
        type: 'map',
        callback(item) {
          const value = Number(item[field]);
          const avgValue = Number(item[`Avg${field}`]);
          return {
            Date: item.Date,
            value,
            avgValue,
            aboveAvgValue: value >= avgValue ? value : null,
            belowAvgValue: (value < avgValue && value !== 0) ? value : null,
            diff: Math.log((Math.abs(value - avgValue) / avgValue) * 100 + 10) * 5 + 2
          };
        }
      });

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
            value: { type: 'linear', min: 0, max: this.props.max, alias: this.props.alias },
            avgValue: { type: 'linear', min: 0, max: this.props.max, alias: `平均${this.props.alias}` },
            aboveAvgValue: { type: 'linear', min: 0, max: this.props.max, alias: this.props.alias },
            belowAvgValue: { type: 'linear', min: 0, max: this.props.max, alias: this.props.alias },
            diff: { alias: this.props.alias },
          }}
          padding={[60, 140]}
          forceFit
        >
          <Axis name="Date" />
          <Axis name="value" title={{}} label={{formatter: val => numeral(val).format('0,0')}} />
          <Axis name="avgValue" visible={false} />
          <Axis name="aboveAvgValue" visible={false} />
          <Axis name="belowAvgValue" visible={false} />
          <Tooltip />
          <Geom type="line" position="Date*value" size={2} color="#4472c4" />
          {/* <Geom type="point" position="Date*value" size={4} color="#4472c4" /> */}
          <Geom
            type="point"
            position="Date*aboveAvgValue"
            shape="circle"
            size={['diff', [2, 12]]}
            color='#70AD47'
            tooltip='aboveAvgValue'
          />
          <Geom
            type="point"
            position="Date*belowAvgValue"
            shape="diamond"
            size={['diff', [2, 12]]}
            color='#ED7D31'
            tooltip='belowAvgValue'
          />
          <Geom type="line" position="Date*avgValue" size={2} color="#ed7d31" />
        </Chart>
      </Card>
    );
  }
}
