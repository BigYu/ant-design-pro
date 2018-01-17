import React from 'react';
import { getTemplate } from '../../services/sedexo-api';

export default class SodexoDashboard extends React.PureComponent {
  render() {
    const template = getTemplate();
    return <h1>{template}</h1>;
  }
}
