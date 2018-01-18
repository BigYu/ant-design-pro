import React from 'react';
import WithReducer from './byDimenstionBase';

export default function(props) {
  const {
    data = [],
    valueField,
    dimensions,
  } = props;
  const firstDimension = dimensions[0];
  const { dimension, fields } = firstDimension;
  const reducer = record => fields.reduce((memo, field) => Object.assign({}, memo, { [field]: Number((record[valueField].find(i => JSON.parse(i.Dimension)[dimension] === field) || { [valueField]: 0 })[valueField]) }), { Date: record.Date });

  return <WithReducer { ...props} reducer={reducer} />;
}