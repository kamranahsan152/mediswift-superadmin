import type { FC } from "react";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { paths } from "src/paths";

interface Overview {
  count: number;
  title: string;
  svgName: string;
}

export const OverviewPage: FC<Overview> = (props) => {
  const { count, title, svgName } = props;

  const getPath = (title: string) => {
    switch (title.toLowerCase()) {
      case "customers":
        return paths.superadmin.customers.index;
      case "riders":
        return paths.superadmin.riders.list;
      case "vendors":
        return paths.superadmin.vendors.index;
      case "admins":
        return paths.superadmin.admins.list;
      case "products":
        return paths.superadmin.products.index;
      default:
        return "#";
    }
  };

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <div>
          <img src={`/assets/iconly/${svgName}.svg`} width={48} />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="text.secondary" variant="body2">
            Total {title}
          </Typography>
          <Typography color="text.primary" variant="h4">
            {count}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          href={getPath(title)}
        >
          See all {title}
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewPage.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  svgName: PropTypes.string.isRequired,
};
