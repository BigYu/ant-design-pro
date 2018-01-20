
import { Checkbox, Row, Col, Switch } from 'antd';

export default function({
  checked,
  onChange
}) {
  return (
    <Switch
      checked={this.state.ignoreWeekend}
      onChange={this.onChangeIgnoreWeekend}
      checkedChildren={'忽略周末'}
      unCheckedChildren={'显示周末'}
    />
  );
}