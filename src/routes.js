// import Buttons from "views/Components/Buttons.js";
// import Calendar from "views/Calendar/Calendar.js";
// import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
// import ErrorPage from "views/Pages/ErrorPage.js";
// import ExtendedForms from "views/Forms/ExtendedForms.js";
// import ExtendedTables from "views/Tables/ExtendedTables.js";
// import FullScreenMap from "views/Maps/FullScreenMap.js";
// import GoogleMaps from "views/Maps/GoogleMaps.js";
// import GridSystem from "views/Components/GridSystem.js";
// import Icons from "views/Components/Icons.js";
// import LockScreenPage from "views/Pages/LockScreenPage.js";
// import LoginPage from "views/Pages/LoginPage.js";
// import Notifications from "views/Components/Notifications.js";
// import Panels from "views/Components/Panels.js";
// import PricingPage from "views/Pages/PricingPage.js";
// import RTLSupport from "views/Pages/RTLSupport.js";
// import ReactTables from "views/Tables/ReactTables.js";
// import RegisterPage from "views/Pages/RegisterPage.js";
// import RegularForms from "views/Forms/RegularForms.js";
// import RegularTables from "views/Tables/RegularTables.js";
// import SweetAlert from "views/Components/SweetAlert.js";
// import TimelinePage from "views/Pages/Timeline.js";
// import Typography from "views/Components/Typography.js";
// import UserProfile from "views/Pages/UserProfile.js";
// import ValidationForms from "views/Forms/ValidationForms.js";
// import VectorMap from "views/Maps/VectorMap.js";
// import Widgets from "views/Widgets/Widgets.js";
// import Wizard from "views/Forms/Wizard.js";

// @material-ui/icons
// import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AmpStoriesIcon from "@material-ui/icons/AmpStories";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import PaymentIcon from "@material-ui/icons/Payment";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

//Okolele Component
import AdminProfile from "./views/Admin/AdminProfile.js";
import CreateAdmin from "./views/Admin/CreateAdmin.js";
import AdminManagement from "./views/Admin/AdminManagement.js";
import VoucherList from "./views/Voucher/VoucherList.js";
import CreateVoucher from "./views/Voucher/CreateVoucher.js";
import AppPrivacy from "views/AppPrivacy/AppPrivacy.js";
import SlideList from "views/Slide/SlideList.js";
import NotificationComponent from "views/OkoleleNotifications/NotificationComponent.js";
import CreateSlide from "views/Slide/CreateSlide.js";
import AddCity from "views/Resources/AddCity.js";
import ProductCommission from "views/Commission/ProductCommission.js";
import CommissionAdjustment from "views/Commission/CommissionAdjustment.js";
import About from "views/Resources/About.js";
import AboutUpdate from "views/Resources/AboutUpdate.js";
import UpdateContacts from "views/Resources/UpdateContacts.js";
import GlobalProductCommission from "views/Resources/GlobalProductCommission.js";
import CreateProducts from "views/ProductManagement/CreateProducts.js";
import UpdateProducts from "views/ProductManagement/UpdateProducts.js";
import ReviewManagement from "views/OkoleleVideoReviews/ReviewManagement.js";
import UpdateStock from "views/OkoleleInventory/UpdateStock.js";
import CustomerOrderList from "views/OkoleleOrderMgmt/CustomerOrderList.js";
import CustomerList from "views/OkoleleCustomer/CustomerList.js";
import CustomerTransectionList from "views/OkoleleCustomer/CustomerTransectionList.js";
import OrderDetails from "views/OkoleleOrderMgmt/OrderDetails.js";
import UpdateOrderStatus from "views/OkoleleOrderMgmt/UpdateOrderStatus.js";
import CustomerDetails from "views/OkoleleCustomer/CustomerDetails.js";
import UpdateCustomerDetails from "views/OkoleleCustomer/UpdateCustomerDetails.js";
import ProductList from "views/ProductManagement/ProductList.js";
import ProductDetails from "views/ProductManagement/ProductDetails.js";
import TransectionHistory from "views/OkoleleBilling/TransectionHistory.js";
import CreateVideoReview from "views/OkoleleVideoReviews/CreateVideoReview.js";
import UpdateVideoReview from "views/OkoleleVideoReviews/UpdateVideoReview.js";
import SendNotification from "views/UserNotifications/SendNotification.js";
import UserNotifications from "views/UserNotifications/UserNotifications.js";
import UpdateNotificaton from "views/UserNotifications/UpdateNotificaton.js";
import AreaManagement from "views/Resources/AreaManagement.js";

var dashRoutes = [
  // ###################### Admin ######################
  {
    collapse: true,
    name: "Admin",
    // rtlName: "صفحات",
    icon: AccountCircleIcon,
    state: "pageCollapse",
    views: [
      {
        path: "/admin-profile",
        name: "My Profile",
        rtlName: "تيالجدول الزمني",
        mini: "MP",
        rtlMini: "تي",
        component: AdminProfile,
        layout: "/admin",
      },
      {
        path: "/create-admin",
        name: "Create Admin",
        rtlName: "تيالجدول الزمني",
        mini: "CA",
        rtlMini: "تي",
        component: CreateAdmin,
        layout: "/admin",
      },
      {
        path: "/admin-management",
        name: "Admin Management",
        rtlName: "تيالجدول الزمني",
        mini: "AM",
        rtlMini: "تي",
        component: AdminManagement,
        layout: "/admin",
      },
    ],
  },
  // ###################### Dashboard ######################
  {
    path: "/dashboard",
    name: "Dashboard",
    // rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
  },
  // ###################### Notification Management ######################
  // {
  //   collapse: true,
  //   name: "Notifications",
  //   icon: NotificationsActiveIcon,
  //   state: "notificationCollapse",
  //   views: [
  //     {
  //       path: "/all-notification",
  //       name: "All Notifications",
  //       mini: "AN",
  //       component: NotificationComponent,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // ###################### Payment Management ######################
  // {
  //   collapse: true,
  //   name: "Payments",
  //   icon: AccountBalanceWalletIcon,
  //   state: "paymentCollapse",
  //   views: [
  //     {
  //       path: "/payments",
  //       name: "payments",
  //       mini: "P",
  //       component: Payments,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // ###################### User Management ######################
  {
    collapse: true,
    name: "Customer Manag...",
    rtlName: "صفحات",
    icon: SupervisedUserCircleIcon,
    state: "customerCollapse",
    views: [
      {
        path: "/customer-list",
        name: "Customer List",
        mini: "CL",
        component: CustomerList,
        layout: "/admin",
      },
      {
        path: "/customer-details",
        name: "Customer Details",
        mini: "CD",
        component: CustomerDetails,
        layout: "/admin",
      },
      {
        path: "/update-customer",
        name: "Update Customer",
        mini: "UC",
        component: UpdateCustomerDetails,
        layout: "/admin",
      },
      {
        path: "/user-transection-list",
        name: "Transection List",
        mini: "TL",
        component: CustomerTransectionList,
        layout: "/admin",
      },
    ],
  },
  // ###################### Transection ######################
  {
    collapse: true,
    name: "Customer Transection",
    rtlName: "صفحات",
    icon: PaymentIcon,
    state: "customerTransection",
    views: [
      {
        path: "/transection-history",
        name: "Transection History",
        mini: "TH",
        component: TransectionHistory,
        layout: "/admin",
      },
    ],
  },
  // ###################### Cart Management ######################
  {
    collapse: true,
    name: "Cart Manag...",
    rtlName: "صفحات",
    icon: AddShoppingCartIcon,
    state: "cartCollapse",
    views: [
      {
        path: "/user-order-list",
        name: "Cart Items",
        mini: "CI",
        component: CustomerOrderList,
        layout: "/admin",
      },
    ],
  },
  // ###################### Order Management ######################
  {
    collapse: true,
    name: "Order Manag...",
    rtlName: "صفحات",
    icon: ShoppingCartIcon,
    state: "orderCollapse",
    views: [
      {
        path: "/user-order-list",
        name: "Order List",
        mini: "OL",
        component: CustomerOrderList,
        layout: "/admin",
      },
      {
        path: "/order-details",
        name: "Order Details",
        mini: "OD",
        component: OrderDetails,
        layout: "/admin",
      },
      {
        path: "/update-orderStatus",
        name: "Update Status",
        mini: "US",
        component: UpdateOrderStatus,
        layout: "/admin",
      },
    ],
  },
  // ###################### Product Management ######################
  {
    collapse: true,
    name: "Product Manag...",
    // rtlName: "صفحات",
    icon: CardGiftcardIcon,
    state: "productCollapse",
    views: [
      {
        path: "/create-products",
        name: "Create Products",
        mini: "CP",
        component: CreateProducts,
        layout: "/admin",
      },
      {
        path: "/product-list",
        name: "Product List",
        mini: "PL",
        component: ProductList,
        layout: "/admin",
      },
      {
        path: "/update-products",
        name: "Update Products",
        mini: "UP",
        component: UpdateProducts,
        layout: "/admin",
      },
      {
        path: "/product-details",
        name: "Product Details",
        mini: "PD",
        component: ProductDetails,
        layout: "/admin",
      },
    ],
  },
  // ###################### User Notifications ######################
  {
    collapse: true,
    name: "User Notifications",
    rtlName: "صفحات",
    icon: CircleNotificationsIcon,
    state: "userNotificationCollapse",
    views: [
      {
        path: "/user-notifications",
        name: "User Notifications",
        mini: "UN",
        component: UserNotifications,
        layout: "/admin",
      },
      {
        path: "/send-notification",
        name: "Send A Notification",
        mini: "SN",
        component: SendNotification,
        layout: "/admin",
      },
      {
        path: "/update-notification",
        name: "Update Notification",
        mini: "UaN",
        component: UpdateNotificaton,
        layout: "/admin",
      },
    ],
  },
  // ###################### Inventory Management ######################
  {
    collapse: true,
    name: "Inventory Manag...",
    // rtlName: "صفحات",
    icon: InventoryIcon,
    state: "inventoryCollapse",
    views: [
      {
        path: "/update-stock",
        name: "Update Stock",
        mini: "US",
        component: UpdateStock,
        layout: "/admin",
      },
    ],
  },

  // ###################### Voucher Management ######################
  // {
  //   collapse: true,
  //   name: "Voucher Management",
  //   rtlName: "صفحات",
  //   icon: LocalOfferIcon,
  //   state: "voucherCollapse",
  //   views: [
  //     {
  //       path: "/create-voucher",
  //       name: "Create Voucher",
  //       mini: "CV",
  //       component: CreateVoucher,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/voucher-list",
  //       name: "Voucher List",
  //       mini: "VL",
  //       component: VoucherList,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // ###################### Slide Management ######################
  // {
  //   collapse: true,
  //   name: "Slide Management",
  //   rtlName: "صفحات",
  //   icon: AmpStoriesIcon,
  //   state: "slideCollapse",
  //   views: [
  //     {
  //       path: "/create-slide",
  //       name: "Create Slide",
  //       mini: "C S",
  //       component: CreateSlide,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/slide-list",
  //       name: "Slide List",
  //       mini: "S L",
  //       component: SlideList,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // ###################### Privacy Policy Management ######################
  // {
  //   collapse: true,
  //   name: "App Privacy",
  //   icon: LockIcon,
  //   state: "privacyPolicyCollapse",
  //   views: [
  //     {
  //       path: "/privacy-setting",
  //       name: "Privacy Setting",
  //       mini: "PS",
  //       component: AppPrivacy,
  //       layout: "/admin"
  //     }
  //   ]
  // },
  // ###################### Product Commission Management ######################
  // {
  //   collapse: true,
  //   name: "Commission Manag...",
  //   icon: PaymentIcon,
  //   state: "commissionCollapse",
  //   views: [
  //     {
  //       path: "/product-commission",
  //       name: "Product Commission",
  //       mini: "PC",
  //       component: ProductCommission,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/commission-adjustment",
  //       name: "Commission Adjustment",
  //       mini: "CA",
  //       component: CommissionAdjustment,
  //       layout: "/admin"
  //     },
  //   ]
  // },
  // ###################### Resources ######################
  {
    collapse: true,
    name: "Resources",
    icon: TrackChangesIcon,
    state: "resourcesCollapse",
    views: [
      {
        path: "/review-management",
        name: "Review Mgmt",
        mini: "RM",
        component: ReviewManagement,
        layout: "/admin",
      },
      {
        path: "/create-review",
        name: "Create Review",
        mini: "CR",
        component: CreateVideoReview,
        layout: "/admin",
      },
      {
        path: "/update-review",
        name: "Update Review",
        mini: "UR",
        component: UpdateVideoReview,
        layout: "/admin",
      },
      {
        path: "/area-management",
        name: "+ City/Area",
        mini: "CA",
        component: AreaManagement,
        layout: "/admin",
      },
      // {
      //   path: "/about",
      //   name: "About",
      //   mini: "A",
      //   component: About,
      //   layout: "/admin"
      // },
      // {
      //   path: "/updateabout",
      //   name: "Update About",
      //   mini: "UA",
      //   component: AboutUpdate,
      //   layout: "/admin"
      // },
      // {
      //   path: "/privacy-setting",
      //   name: "Privacy Setting",
      //   mini: "PS",
      //   component: AppPrivacy,
      //   layout: "/admin"
      // },
      // {
      //   path: "/add-city",
      //   name: "Add City",
      //   mini: "PS",
      //   component: AddCity,
      //   layout: "/admin"
      // },
      // {
      //   path: "/update-contacts",
      //   name: "Update Contacts",
      //   mini: "UC",
      //   component: UpdateContacts,
      //   layout: "/admin"
      // },
    ],
  },
  // ###################### About ######################
  // {
  //   collapse: true,
  //   name: "About",
  //   icon: AcUnitIcon,
  //   state: "aboutCollapse",
  //   views: [
  //     {
  //       path: "/about",
  //       name: "About",
  //       mini: "A",
  //       component: About,
  //       layout: "/admin"
  //     },
  //     {
  //       path: "/updateabout",
  //       name: "Update About",
  //       mini: "UA",
  //       component: AboutUpdate,
  //       layout: "/admin"
  //     },
  //   ]
  // },
];
export default dashRoutes;
