
import { Checkbox, Row, Col, Switch } from 'antd';

export default function({
  checked,
  onChange
}) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      checkedChildren={'只显示工作日'}
      unCheckedChildren={'也显示节假日'}
    />
  );
}