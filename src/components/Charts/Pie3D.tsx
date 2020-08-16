import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

interface Pie3DProps {
  data: Array<any>;
}

const Pie3D: React.FC<Pie3DProps> = ({ data }) => {
  const chartConfigs = {
    type: 'pie3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Languages',
        theme: 'fusion',
        decimals: 0,
        pieRadius: '40%',
      },

      // Chart Data
      data: data,
    },
  };
  return (
    <div>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default Pie3D;
