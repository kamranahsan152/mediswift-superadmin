/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SvgIcon from "@mui/material/SvgIcon";
import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";
import ShoppingBag03Icon from "src/icons/untitled-ui/duocolor/shopping-bag-03";
import Truck01Icon from "src/icons/untitled-ui/duocolor/truck-01";
import CreditCard from "src/icons/untitled-ui/duocolor/credit-card-01";
import Users03Icon from "src/icons/untitled-ui/duocolor/users-03";
import Shopingproduct from "src/icons/untitled-ui/duocolor/shopping-cart-01";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";
export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.superadmin.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },

          {
            title: t(tokens.nav.account),
            path: paths.superadmin.account,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
        ],
      },
      {
        subheader: t(tokens.nav.concepts),
        items: [
          // {
          //   title: t(tokens.nav.admins),
          //   path: paths.superadmin.admins.list,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <Users03Icon />
          //     </SvgIcon>
          //   ),
          //   items: [
          //     {
          //       title: t(tokens.nav.list),
          //       path: paths.superadmin.admins.list,
          //     },
          //   ],
          // },
          {
            title: t(tokens.nav.customers),
            path: paths.superadmin.customers.index,
            icon: (
              <SvgIcon fontSize="small">
                <Users03Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.list),
                path: paths.superadmin.customers.index,
              },
            ],
          },
          {
            title: t(tokens.nav.vendors),
            path: paths.superadmin.vendors.index,
            icon: (
              <SvgIcon fontSize="small">
                <Users03Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.list),
                path: paths.superadmin.vendors.index,
              },
            ],
          },
          {
            title: t(tokens.nav.shops),
            path: paths.superadmin.shops.list,
            icon: (
              <SvgIcon fontSize="small">
                <ShoppingBag03Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.list),
                path: paths.superadmin.shops.list,
              },
            ],
          },
          {
            title: t(tokens.nav.productList),
            path: paths.superadmin.products.index,
            icon: (
              <SvgIcon fontSize="small">
                <Shopingproduct />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.list),
                path: paths.superadmin.products.index,
              },
            ],
          },
          {
            title: t(tokens.nav.riders),
            icon: (
              <SvgIcon fontSize="small">
                <Truck01Icon />
              </SvgIcon>
            ),
            path: paths.superadmin.riders.list,
            items: [
              {
                title: t(tokens.nav.list),
                path: paths.superadmin.riders.list,
              },
              {
                title: t(tokens.nav.create),
                path: paths.superadmin.riders.create,
              },
            ],
          },
          {
            title: t(tokens.nav.payments),
            icon: (
              <SvgIcon fontSize="small">
                <CreditCard />
              </SvgIcon>
            ),
            path: paths.superadmin.payments.list,
            items: [
              {
                title: "List",
                path: paths.superadmin.payments.list,
              },
              {
                title: "Wallet",
                path: paths.superadmin.payments.wallet,
              },
            ],
          },
        ],
      },
    ];
  }, [t]);
};
