import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData } from "../data/mockData";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { groupBy } from 'lodash';
const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/projet`); // Replace 'API_ENDPOINT' with your actual API endpoint
      const data = response.data.data;
      const groupedData = groupBy(data, 'nom_projet');

      // Prepare data for the chart
const chartData = Object.keys(groupedData).map((key) => {
    return {
      id: key,
      data: groupedData[key].map((item) => ({
        x: new Date(item.createdAt),
        y: item.cout, // Use the individual revenu_total value
      })),
    };
  });
      console.log(JSON.stringify(chartData));
      setChartData(chartData)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [])
  return (
    <ResponsiveLine
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
          },
        },
      }}
      curve="catmullRom"
      data={chartData}
      colors={{ scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'time', format: '%Y-%m-%dT%H:%M:%S.%LZ' }}
      yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}

      xFormat="time:%Y-%m-%dT%H:%M:%S.%LZ"

      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%Y-%m-%d',
        tickValues: 'every 1 month',
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Revenu",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={!isDashboard}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
