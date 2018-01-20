import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import numeral from 'numeral';
import autoHeight from '../autoHeight';
import { Checkbox, Row, Col, Switch } from 'antd';
const CheckboxGroup = Checkbox.Group;
import { isWorkday } from '../../../utils/utils';
import WorkdaySwitch from '../WorkdaySwitch';

DataSet.registerTransform('flattenSKU', (dv) => {
  dv.rows = [].concat(...dv.rows.map((row) => {
    return row.Revenue.map((subRow) => {
      const { SKU } = JSON.parse(subRow.Dimension);
      return {
        value: Number(subRow.Revenue),
        Date: row.Date,
        name: SKU
      }
    })
  }));
});

@autoHeight()
export default class TopSKUTrendChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ignoreWeekend: true,
    };

    this.onChangeRange = this.onChangeRange.bind(this);
    this.onChangeIgnoreWeekend = this.onChangeIgnoreWeekend.bind(this);
  }

  onChangeRange({ startValue, endValue }) {
    this.ds.setState('start', new Date(startValue).getTime());
    this.ds.setState('end', new Date(endValue).getTime());
  }

  onChangeIgnoreWeekend(ignoreWeekend) {
    this.setState({
      ignoreWeekend,
    });
  }

  render() {
    const {
      data = [],
      reducer,
      fields,
    } = this.props;

    if (data.length === 0) return null;

    data.sort((item1, item2) => new Date(item1.Date) - new Date(item2.Date));
    const endDate = new Date(data[data.length - 1].Date);
    const defaultStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const ds = this.ds = new DataSet({
      state: {
        start: defaultStartDate.getTime(),
        end: endDate.getTime(),
      }
    });
    const originDv = ds.createView('origin');


    originDv.source(data.slice())
      .transform({
        type: 'flattenSKU',
      });
    if (this.state.ignoreWeekend) {

      originDv.transform({
        type: 'filter',
        callback: (item) => {
          const date = new Date(item.Date);
          return isWorkday(date);
        }
      })
    }

    const chartDv = ds.createView();

    chartDv.source(originDv)
      .transform({
        type: 'filter',
        callback(obj) {
          const time = new Date(obj.Date).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= ds.state.start && time <= ds.state.end;
        },
      });

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
        <Chart
          height={400}
          data={chartDv}
          padding={[60, 140]}
          scale={{
            Date: { type: 'time' },
            value: { alias: '营业额' },
          }}
          forceFit>
          <Axis name="Date" />
          <Axis name="value" title={{}} label={{formatter: val => numeral(val).format('0,0')}} />
          <Tooltip />
          <Legend position="top" />
          <Geom type="areaStack" position="Date*value" size={2} color="name" />
        </Chart>
        <div>
          <Slider
            width='auto'
            height={26}
            start={ds.state.start}
            end={ds.state.end}
            xAxis="Date"
            yAxis="value"
            scales={{Date:{type: 'time',tickCount: 10, mask:'M/DD' }}}
            data={originDv}
            backgroundChart={{type: 'line'}}
            onChange={this.onChangeRange}
            padding={[60, 140]}
          />
        </div>
      </div>
    );
  }
}
