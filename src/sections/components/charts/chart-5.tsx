import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ApexOptions } from "apexcharts";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { Chart } from "src/components/chart";
import { useMounted } from "src/hooks/use-mounted";
import { getRandomInt } from "src/utils/get-random-int";
import { wait } from "src/utils/wait";

interface Page {
  pathname: string;
  views: number;
}

const pages: Page[] = [
  {
    pathname: "/projects",
    views: 24,
  },
  {
    pathname: "/chat",
    views: 21,
  },
  {
    pathname: "/cart",
    views: 15,
  },
  {
    pathname: "/checkout",
    views: 8,
  },
];

type ChartSeries = {
  name: string;
  data: (number | null)[];
}[];

const initialState: (number | null)[] = [
  163, 166, 161, 159, 99, 163, 173, 166, 167, 183, 176, 172,
];

const useChartSeries = (): ChartSeries => {
  const isMounted = useMounted();
  const intervalRef = useRef<any>(undefined);
  const [data, setData] = useState<(number | null)[]>(initialState);
  const tickRate = 3000;
  const delay = 500;

  const handleTick = useCallback(
    async (value: number) => {
      if (isMounted()) {
        setData((prevState) => {
          const newData = [...prevState];

          // Remove the first value and add a null value to keep the same bar length

          newData.shift();
          newData.push(null);

          return newData;
        });
      }

      await wait(delay);

      if (isMounted()) {
        setData((prevState) => {
          const newData = [...prevState];

          newData.pop();
          newData.push(value);

          return newData;
        });
      }
    },
    [isMounted]
  );

  const subscribe = useMemo(
    () =>
      (handler: any): (() => void) => {
        intervalRef.current = setInterval(() => {
          const value = getRandomInt(100, 200);
          handler(value);
        }, tickRate);

        return (): void => {
          clearInterval(intervalRef.current);
        };
      },
    []
  );

  useEffect(
    () => subscribe(handleTick),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subscribe]
  );

  return [
    {
      name: "Events",
      data,
    },
  ];
};

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
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40",
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
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [""],
      labels: {
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

export const Chart5: FC = () => {
  const chartSeries = useChartSeries();
  const chartOptions = useChartOptions();

  const pageViewsNow = useMemo((): number => {
    const { data } = chartSeries[0];
    const currentValue = data[data.length - 1];

    if (currentValue === null) {
      return data[data.length - 2] || 0;
    }

    return data[data.length - 1] || 0;
  }, [chartSeries]);

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
          <CardHeader
            action={<Typography variant="h6">{pageViewsNow}</Typography>}
            subheader="Page views per second"
            title="Active users"
          />
          <Chart
            height={200}
            options={chartOptions}
            series={chartSeries}
            type="bar"
          />
          <List>
            {pages.map((page) => (
              <ListItem divider key={page.pathname}>
                <ListItemText
                  primary={page.pathname}
                  primaryTypographyProps={{
                    variant: "body2",
                  }}
                />
                <Typography color="text.secondary" variant="subtitle2">
                  {page.views}
                </Typography>
              </ListItem>
            ))}
          </List>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              endIcon={
                <SvgIcon>
                  <ArrowRightIcon />
                </SvgIcon>
              }
              size="small"
            >
              See All
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
};
