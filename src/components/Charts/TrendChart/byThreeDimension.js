import React from 'react';
import WithReducer from './byDimenstionBase';

export default function(props) {
  const {
    valueField,
    dimensions,
  } = props;
  const [firstDimension, secondDimension, thirdDimension] = dimensions;
  const { dimension: firstDimensionKey, fields: fdFields } = firstDimension;
  const { dimension: secondDimensionKey, fields: sdFields } = secondDimension;
  const { dimension: thirdDimensionKey, fields: tdFields } = thirdDimension;
  const reducer = function(record) {
    const ret = { Date: record.Date };

    for (const fdField of fdFields) {
      for (const sdField of sdFields) {
        for (const tdField of tdFields) {
          ret[`${fdField}-${sdField}-${tdField}`] = Number((record[valueField].find(i => JSON.parse(i.Dimension)[firstDimensionKey] === fdField && JSON.parse(i.Dimension)[secondDimensionKey] === sdField && JSON.parse(i.Dimension)[thirdDimensionKey] === tdField) || { [valueField]: 0 })[valueField]);
        }
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

  for (const fdField of fdFields) {
    for (const sdField of sdFields) {
      for (const tdField of tdFields) {
        fields.push(`${fdField}-${sdField}-${tdField}`);
      }
    }
  }

  return <WithReducer {...props} reducer={reducer} fields={fields} />;
}