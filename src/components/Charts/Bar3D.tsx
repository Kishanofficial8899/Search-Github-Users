import React from 'react';
import ReactFC from 'react-fusioncharts';

interface Bar3DProps {
  data: Array<any>;
}

const Bar3D: React.FC<Bar3DProps> = ({ data }) => {
  const chartConfigs = {
    type: 'Bar3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Most Forked',
        yAxisName: 'Forked',
        xAxisName: 'Repos',
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
      },
      // Chart Data
      data: data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Bar3D;
