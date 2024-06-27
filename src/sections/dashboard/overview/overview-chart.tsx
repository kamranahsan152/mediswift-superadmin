import React, { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { format, eachDayOfInterval } from "date-fns";
import { useGetStatsQuery } from "src/redux/reducer";
import { CircularProgress, Box } from "@mui/material";
import { Container } from "@mui/system";

interface OverViewChartProps {
  startDate: string;
  endDate: string;
}

export const OverViewChartPage: FC<OverViewChartProps> = ({
  startDate,
  endDate,
}) => {
  const theme = useTheme();
  const {
    data: apiData,
    error,
    isLoading,
  } = useGetStatsQuery({ startDate, endDate });

  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<any>({
    chart: {
      events: {
        mounted: (chart: any) => {
          chart.windowResizeHandler();
        },
      },
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [3, 3, 3],
      curve: "smooth",
      dashArray: [0, 0, 0],
    },
    colors: [
      theme.palette.success.main,
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ],
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
      labels: {
        colors: theme.palette.text.primary,
      },
      markers: {
        width: 10,
        height: 10,
      },
    },
    markers: {
      size: 4,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
          fontSize: "12px",
          fontWeight: 600,
        },
        rotate: -45,
      },
      axisBorder: {
        show: true,
        color: theme.palette.divider,
      },
      axisTicks: {
        show: true,
        color: theme.palette.divider,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
          fontSize: "12px",
          fontWeight: 600,
        },
      },
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: (val: string) => `${val} (count)`,
          },
        },
      ],
    },
    grid: {
      show: true,
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
    },
    fill: {
      type: "solid",
      opacity: [0.8, 0.8, 0.8],
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
        data: categories.map((category) => {
          const found = apiData?.users?.find(
            (item: any) => item._id === category
          );
          return found ? found.count : 0;
        }),
      };

      const vendorsSeries = {
        name: "Vendors",
        data: categories.map((category) => {
          const found = apiData?.vendors?.find(
            (item: any) => item._id === category
          );
          return found ? found.count : 0;
        }),
      };

      const ridersSeries = {
        name: "Riders",
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

  if (isLoading || loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="350px"
        >
          <CircularProgress size={40} color="primary" />
        </Box>
      </Container>
    );
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};
