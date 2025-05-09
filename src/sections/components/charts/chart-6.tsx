import type { FC } from "react";
import type { ApexOptions } from "apexcharts";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import { alpha } from "@mui/system/colorManipulator";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import { useTheme } from "@mui/material/styles";

import { Chart } from "src/components/chart";
import { Scrollbar } from "src/components/scrollbar";

type ChartSeries = {
  name: string;
  data: (number | null)[];
}[];

const chartSeries: ChartSeries = [
  {
    name: "This year",
    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
  },
  {
    name: "Last year",
    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
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
    },
    colors: ["#00ab57", alpha("#00ab57", 0.25)],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
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
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "20px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
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

export const Chart6: FC = () => {
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
          title="Financial Stats"
        />
        <Scrollbar>
          <Box
            sx={{
              minWidth: 700,
              px: 2,
            }}
          >
            <Chart
              height={375}
              options={chartOptions}
              series={chartSeries}
              type="bar"
            />
          </Box>
        </Scrollbar>
      </Card>
    </Box>
  );
};
