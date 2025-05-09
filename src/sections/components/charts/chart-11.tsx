import type { FC } from "react";
import numeral from "numeral";
import type { ApexOptions } from "apexcharts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { Chart } from "src/components/chart";

type ChartSeries = {
  name: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

const chartSeries: ChartSeries = [
  {
    name: "Sales",
    data: [
      {
        x: "Email",
        y: 37530,
      },
      {
        x: "Facebook",
        y: 90590,
      },
      {
        x: "GDN",
        y: 52717,
      },
      {
        x: "Instagram",
        y: 62935,
      },
      {
        x: "Google Ads Search",
        y: 13219,
      },
    ],
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
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.success.main,
    ],
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
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "45",
        distributed: true,
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      y: {
        formatter: (value: number): string => numeral(value).format("$0,0.00"),
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };
};

export const Chart11: FC = () => {
  const chartOptions = useChartOptions();

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Card>
          <CardHeader title="Incremental Sales" />
          <CardContent>
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="bar"
            />
            <Stack direction="row" flexWrap="wrap" spacing={3} sx={{ mt: 3 }}>
              {chartSeries[0].data.map((item, index) => (
                <Stack
                  key={item.x}
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    p: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: chartOptions.colors![index],
                      borderRadius: "50%",
                      height: 8,
                      width: 8,
                    }}
                  />
                  <Typography variant="subtitle2">{item.x}</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
