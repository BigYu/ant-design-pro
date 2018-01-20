import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slider';
import numeral from 'numeral';
import autoHeight from '../autoHeight';
import { Checkbox, Row, Col, Switch } from 'antd';
const CheckboxGroup = Checkbox.Group;

const dimensions = ['Branch', 'CardType', 'DinningPeriod'];
const dimensionFields = {
  Branch: ['中餐厅', '自助餐厅', '粤菜餐厅', '微餐厅晚餐1', '员工餐厅'],
  CardType: ['员工卡', '访客卡'],
  DinningPeriod: ['早餐', '晚餐', '午餐'],
}
const dimensionOptions = [{
  label: '餐厅',
  value: 'Branch'
}, {
  label: '卡片类型',
  value: 'CardType'
}, {
  label: '就餐时间',
  value: 'DinningPeriod'
}];

const aggregateTransform = DataSet.getTransform('aggregate');
DataSet.registerTransform('byDimension', (dv, {
  getDimensions,
}) => {
  const dimensions = getDimensions();
  aggregateTransform(dv, {
    fields: ['value'],
    operations: ['sum'],
    as: ['value'],
    groupBy: ['Date', ...dimensions],
  })
  dv.rows = dv.rows.map((row) => {
    row.name = dimensions.map((dim) => row[dim]).join('-');
    return row;
  })
});
DataSet.registerTransform('flatten', (dv, {
  valueField,
}) => {
  dv.rows = [].concat(...dv.rows.map((row) => {
    return row[valueField].map((subRow) => {
      const { Branch, CardType, DinningPeriod } = JSON.parse(subRow.Dimension);
      return {
        value: Number(subRow[valueField]),
        Date: row.Date,
        Branch, CardType, DinningPeriod
      }
    })
  }));
});

@autoHeight()
export default class TrendChartByDimension extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ignoreWeekend: true,
    };

    this.onChangeRange = this.onChangeRange.bind(this);
    this.onChangeDimensions = this.onChangeDimensions.bind(this);
    this.onChangeIgnoreWeekend = this.onChangeIgnoreWeekend.bind(this);
  }

  onChangeRange({ startValue, endValue }) {
    this.ds.setState('start', new Date(startValue).getTime());
    this.ds.setState('end', new Date(endValue).getTime());
  }

  onChangeDimensions(dimensions) {
    this.ds.setState('dimensions', dimensions);
  }

  onChangeIgnoreWeekend(e) {
    const ignoreWeekend = typeof e === 'boolean' ? e : e.target.checked
    this.setState({
      ignoreWeekend,
    });
  }

  render() {
    const {
      data = [],
      reducer,
      fields,
      valueField,
    } = this.props;

    if (data.length === 0) return null;

    data.sort((item1, item2) => new Date(item1.Date) - new Date(item2.Date));
    const endDate = new Date(data[data.length - 1].Date);
    const defaultStartDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const ds = this.ds = new DataSet({
      state: {
        start: defaultStartDate.getTime(),
        end: endDate.getTime(),
        dimensions,
      }
    });
    const originDv = ds.createView('origin');


    originDv.source(data.slice())
      .transform({
        type: 'flatten',
        valueField,
      })
      .transform({
        type: 'byDimension',
        getDimensions: () => {
          return ds.state.dimensions;
        }
      });
    if (this.state.ignoreWeekend) {

      originDv.transform({
        type: 'filter',
        callback: (item) => {
          const date = new Date(item.Date);
          const day = date.getDay();
          return day !== 0 && day !== 6;
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
          <CheckboxGroup options={dimensionOptions} defaultValue={dimensions} onChange={this.onChangeDimensions} />
          <Switch
            checked={this.state.ignoreWeekend}
            onChange={this.onChangeIgnoreWeekend}
            checkedChildren={'忽略周末'}
            unCheckedChildren={'显示周末'}
          />
        </Row>
        <Chart
          height={400}
          data={chartDv}
          padding={[60, 140]}
          scale={{
            Date: { type: 'time' },
            value: { alias: valueField },
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
