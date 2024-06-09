import { lazy, Suspense, useEffect, useState } from "react";
import type { RouteObject } from "react-router";
import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";

import { Layout as AuthLayout } from "src/layouts/auth/classic-layout";

import { Layout as MarketingLayout } from "src/layouts/marketing";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { paths } from "src/paths";

const Error401Page = lazy(() => import("src/pages/401"));
const Error404Page = lazy(() => import("src/pages/404"));
const Error500Page = lazy(() => import("src/pages/500"));

const PrivateRoute = lazy(() => import("src/redux/PrivateRoute"));
const PublicRoute = lazy(() => import("src/redux/PublicRoute"));

const HomePage = lazy(() => import("src/pages/index"));
const AdminListPage = lazy(() => import("src/pages/dashboard/admin/list"));
const AdminDetailPage = lazy(() => import("src/pages/dashboard/admin/detail"));
const AdminCreateForm = lazy(() => import("src/pages/dashboard/admin/create"));
const CustomerListTable = lazy(
  () => import("src/pages/dashboard/customers/list")
);
const VendorDetailPage = lazy(
  () => import("src/pages/dashboard/vendor/details")
);
const VendorListTable = lazy(() => import("src/pages/dashboard/vendor/list"));
const VendorShopDetail = lazy(() => import("src/pages/dashboard/vendor/shop"));
const VendorShopProduct = lazy(
  () => import("src/pages/dashboard/vendor/productlist")
);

const ShopListTable = lazy(() => import("src/pages/dashboard/shop/list"));
const ShopDetailPage = lazy(() => import("src/pages/dashboard/shop/detail"));

const RiderListTable = lazy(() => import("src/pages/dashboard/riders/list"));
const RiderDetailPage = lazy(() => import("src/pages/dashboard/riders/detail"));
const RiderCreatePage = lazy(() => import("src/pages/dashboard/riders/create"));
const CustomerDetailPage = lazy(
  () => import("src/pages/dashboard/customers/details")
);

// Product
const ProductListPage = lazy(() => import("src/pages/dashboard/products/list"));
const PaymentListPage = lazy(() => import("src/pages/dashboard/payments/list"));
const WalletPage = lazy(() => import("src/pages/dashboard/payments/wallet"));
const CancelPage = lazy(() => import("src/pages/canceled"));
const SuccessPage = lazy(() => import("src/pages/status"));
// const PaymentDetailPage = lazy(() => import("src/pages/dashboard/payments/detaiil"));

const AccountPage = lazy(() => import("src/pages/dashboard/account"));
const EcommercePage = lazy(() => import("src/pages/dashboard/ecommerce"));
const LoginPage = lazy(() => import("src/pages/auth/login"));
const PaymentPage = lazy(() => import("src/pages/paymentgateway"));
export const routes: RouteObject[] = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "auth",
    element: <PublicRoute />,
    children: [
      {
        path: "jwt",
        element: (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    path: "paymentgateway",
    element: <PaymentPage />,
  },
  {
    path: "success",
    element: <SuccessPage />,
  },
  {
    path: "cancel",
    element: <CancelPage />,
  },
  {
    path: "401",
    element: <Error401Page />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "500",
    element: <Error500Page />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
];

const dashboardRoutes: RouteObject = {
  path: "superadmin",
  element: (
    <>
      <PrivateRoute requiredRole="super-admin">
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </PrivateRoute>
    </>
  ),
  children: [
    {
      index: true,
      element: <EcommercePage />,
    },
    {
      path: "admins",
      children: [
        {
          index: true,
          element: <AdminListPage />,
        },
        {
          path: ":id",
          element: <AdminDetailPage />,
        },
        {
          path: "create",
          element: <AdminCreateForm />,
        },
      ],
    },
    {
      path: "customers",
      children: [
        {
          index: true,
          element: <CustomerListTable />,
        },
        {
          path: ":id",
          element: <CustomerDetailPage />,
        },
      ],
    },
    {
      path: "vendors",
      children: [
        {
          index: true,
          element: <VendorListTable />,
        },
        {
          path: ":id",
          element: <VendorDetailPage />,
        },
        {
          path: "shop-details",
          children: [
            {
              path: ":id",
              element: <VendorShopDetail />,
            },
            {
              path: "product-list/:id",
              element: <VendorShopProduct />,
            },
          ],
        },
      ],
    },
    {
      path: "shops",
      children: [
        {
          index: true,
          element: <ShopListTable />,
        },
        {
          path: ":id",
          element: <ShopDetailPage />,
        },
      ],
    },
    {
      path: "riders",
      children: [
        {
          index: true,
          element: <RiderListTable />,
        },
        {
          path: ":id",
          element: <RiderDetailPage />,
        },
        {
          path: "create-rider",
          element: <RiderCreatePage />,
        },
      ],
    },
    {
      path: "products",
      children: [
        {
          index: true,
          element: <ProductListPage />,
        },
      ],
    },
    {
      path: "payments",
      children: [
        {
          path: "list",
          element: <PaymentListPage />,
        },
        {
          path: "wallet",
          element: <WalletPage />,
        },
      ],
    },
    {
      path: "account",
      element: <AccountPage />,
    },
  ],
};
routes.push(dashboardRoutes);
