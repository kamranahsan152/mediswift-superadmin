export const paths = {
  index: "/",
  checkout: "/checkout",
  contact: "/contact",
  pricing: "/pricing",
  auth: {
    login: "/auth/jwt/login",
    register: "/auth/jwt/register",
  },

  BASE_URL: process.env.REACT_APP_BASE_URL,
  success: "/success",
  cancel: "/cancel",

  superadmin: {
    index: "/superadmin/",
    account: "/superadmin/account",
    blank: "/superadmin/blank",
    //All Customers
    customers: {
      index: "/superadmin/customers",
      details: "/superadmin/customers/:id",
    },
    //All Vendors
    vendors: {
      index: "/superadmin/vendors",
      details: "/superadmin/vendors/:id",
      shops: "/superadmin/vendors/shop-details/:id",
      productlist: "/superadmin/vendors/shop-details/product-list/:id",
      createproduct: "/superadmin/vendors/shop-details/create-product/:id",
    },
    //All Shop
    shops: {
      list: "/superadmin/shops",
      detail: "/superadmin/shops/:id",
    },
    //all admin
    admins: {
      list: "/superadmin/admins",
      details: "/superadmin/admins/:id",
      create: "/superadmin/admins/create",
    },
    //Rider
    riders: {
      list: "/superadmin/riders",
      create: "/superadmin/riders/create-rider",
      detail: "/superadmin/riders/:id",
    },
    paymentgateway: "/paymentgateway",
    //payments
    payments: {
      list: "/superadmin/payments/list",
      wallet: "/superadmin/payments/wallet",
    },
    orders: {
      index: "/superadmin/orders/",
      deliver: "/superadmin/orders/delivertorider",
      details: "/superadmin/orders/:orderId",
    },
    //products
    products: {
      index: "/superadmin/products",
      create: "/superadmin/products/create",
    },
  },
  components: {
    index: "/components",
    dataDisplay: {
      detailLists: "/components/data-display/detail-lists",
      tables: "/components/data-display/tables",
      quickStats: "/components/data-display/quick-stats",
    },
    lists: {
      groupedLists: "/components/lists/grouped-lists",
      gridLists: "/components/lists/grid-lists",
    },
    forms: "/components/forms",
    modals: "/components/modals",
    charts: "/components/charts",
    buttons: "/components/buttons",
    typography: "/components/typography",
    colors: "/components/colors",
    inputs: "/components/inputs",
  },
  docs: "https://material-kit-pro-react-docs.devias.io",
  notAuthorized: "/401",
  notFound: "/404",
  serverError: "/500",
};
