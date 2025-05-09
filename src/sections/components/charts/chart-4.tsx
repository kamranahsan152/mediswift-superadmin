import type { FC } from "react";
import type { ApexOptions } from "apexcharts";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import { useTheme } from "@mui/material/styles";

import { Chart } from "src/components/chart";
import { Scrollbar } from "src/components/scrollbar";

type ChartSeries = {
  name: string;
  data: number[];
}[];

const chartSeries: ChartSeries = [
  {
    name: "Performance",
    data: [10, 5, 11, 20, 13, 28, 18, 4, 13, 12, 13, 5],
  },
];

const useChartOptions = (): any => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false,
    },
    fill: {
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
      type: "gradient",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 6,
      strokeColors: theme.palette.background.default,
      strokeWidth: 3,
    },
    stroke: {
      curve: "smooth",
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: any) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const Chart4: FC = () => {
  const chartOptions = useChartOptions();

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        p: 3,
      }}
    >
      <Card>
        <CardHeader
          action={
            <IconButton>
              <SvgIcon>
                <DotsHorizontalIcon />
              </SvgIcon>
            </IconButton>
          }
          title="Performance Over Time"
        />
        <CardContent>
          <Scrollbar>
            <Box
              sx={{
                height: 375,
                minWidth: 500,
                position: "relative",
              }}
            >
              <Chart
                height={350}
                options={chartOptions}
                series={chartSeries}
                type="area"
              />
            </Box>
          </Scrollbar>
        </CardContent>
      </Card>
    </Box>
  );
};
