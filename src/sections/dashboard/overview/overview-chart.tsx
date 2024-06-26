import React, { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { useGetStatsQuery } from "src/redux/reducer";

interface OverViewChartProps {
  startDate: string;
  endDate: string;
}

export const OverViewChartPage: FC<OverViewChartProps> = ({
  startDate,
  endDate,
}) => {
  console.log(startDate, endDate);

  const theme = useTheme();
  const {
    data: apiData,
    error,
    isLoading,
  } = useGetStatsQuery({ startDate, endDate });
  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<any>({
    chart: {
      events: {
        mounted: (chart: any) => {
          chart.windowResizeHandler();
        },
      },
      height: 305,
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.15,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [3, 3, 3],
      curve: "smooth",
      dashArray: [0, 8],
    },
    colors: ["rgb(74, 119, 240)", "#fdc530", theme.palette.secondary.main], // Example colors based on MUI theme
    title: {
      align: "left",
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        color: theme.palette.text.secondary,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      fontWeight: 600,
      fontSize: "12px",
      tooltipHoverFormatter: function (
        val: string,
        opts: {
          w: {
            globals: { series: { [x: string]: { [x: string]: string } } };
          };
          seriesIndex: string | number;
          dataPointIndex: string | number;
        }
      ) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ""
        );
      },
      labels: {
        colors: theme.palette.text.primary,
      },
      markers: {
        width: 9,
        height: 9,
        strokeWidth: 0,
        radius: 12,
        offsetX: 0,
        offsetY: 0,
      },
    },
    markers: {
      discrete: [],
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [], // Will be populated dynamically based on fetched data
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
          fontSize: "11px",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-label",
        },
        rotate: -90,
      },
      axisBorder: {
        show: false,
        color: "rgba(119, 119, 142, 0.05)",
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
        borderType: "solid",
        color: "rgba(119, 119, 142, 0.05)",
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
          fontSize: "11px",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val: string) {
              return val + " (count)";
            },
          },
        },
      ],
    },
    grid: {
      show: true,
      borderColor: "rgba(119, 119, 142, 0.1)",
      strokeDashArray: 4,
    },
    fill: {
      type: ["gradient", "solid"],
      opacity: [0.05, 1],
      gradient: {
        inverseColors: false,
        shade: "dark",
        type: "vertical",
        opacityFrom: 0.3,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
  });

  useEffect(() => {
    if (apiData) {
      const categories = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
      }).map((date) => format(date, "yyyy-MM-dd"));

      const usersSeries = {
        name: "Users",
        type: "line",
        data: categories.map((category) => {
          const found = apiData?.users?.find(
            (item: any) => item._id === category
          );
          return found ? found.count : 0;
        }),
      };

      const vendorsSeries = {
        name: "Vendors",
        type: "line",
        data: categories.map((category) => {
          const found = apiData?.vendors?.find(
            (item: any) => item._id === category
          );
          return found ? found.count : 0;
        }),
      };

      const ridersSeries = {
        name: "Riders",
        type: "line",
        data: categories.map((category) => {
          const found = apiData?.riders?.find(
            (item: any) => item._id === category
          );
          return found ? found.count : 0;
        }),
      };

      setSeries([usersSeries, vendorsSeries, ridersSeries]);
      setOptions((prevOptions: any) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories,
        },
      }));
    }
  }, [apiData, startDate, endDate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </>
  );
};
