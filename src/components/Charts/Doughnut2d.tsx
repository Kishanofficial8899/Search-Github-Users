import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

interface Doughnut2dProps {
  data: Array<any>;
}

const Doughnut2d: React.FC<Doughnut2dProps> = ({ data }) => {
  const chartConfigs = {
    type: 'Doughnut2d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Stars Per Language',
        decimals: 0,
        doughnutRadius: '40%',
        showPercentValues: 0,
        theme: 'candy',
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

export default Doughnut2d;
