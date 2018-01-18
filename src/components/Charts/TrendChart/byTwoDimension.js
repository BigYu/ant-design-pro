import React from 'react';
import WithReducer from './byDimenstionBase';

export default function(props) {
  const {
    valueField,
    dimensions,
  } = props;
  const [firstDimension, secondDimension] = dimensions;
  const { dimension: firstDimensionKey, fields: fdFields } = firstDimension;
  const { dimension: secondDimensionKey, fields: sdFields } = secondDimension;
  const reducer = function(record) {
    const ret = { Date: record.Date };

    for (const fdField of fdFields) {
      for (const sdField of sdFields) {
        ret[`${fdField}-${sdField}`] = Number((record[valueField].find(i => JSON.parse(i.Dimension)[firstDimensionKey] === fdField && JSON.parse(i.Dimension)[secondDimensionKey] === sdField) || { [valueField]: 0 })[valueField]);
      }
    }

    return ret;
  };
  const fields = [];

  for (const fdField of fdFields) {
    for (const sdField of sdFields) {
      fields.push(`${fdField}-${sdField}`);
    }
  }

  return <WithReducer {...props} reducer={reducer} fields={fields} />;
}