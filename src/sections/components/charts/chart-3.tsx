import type { FC } from "react";
import type { ApexOptions } from "apexcharts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { Chart } from "src/components/chart";

type ChartSeries = number[];

const chartSeries: ChartSeries = [83];

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
    colors: [theme.palette.primary.main],
    fill: {
      opacity: 1,
      type: "solid",
    },
    labels: ["System Health"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
          },
          value: {
            color: theme.palette.text.secondary,
          },
        },
        hollow: {
          size: "60%",
        },
        track: {
          background: theme.palette.background.default,
        },
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };
};

export const Chart3: FC = () => {
  const chartOptions = useChartOptions();

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Chart
              height={300}
              options={chartOptions}
              series={chartSeries}
              type="radialBar"
            />
            <Typography
              align="center"
              color="text.secondary"
              component="p"
              variant="caption"
            >
              This shouldn&apos;t be bellow 80%
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
