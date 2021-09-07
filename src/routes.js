import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import LockIcon from '@material-ui/icons/Lock';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import PaymentIcon from '@material-ui/icons/Payment';
import AcUnitIcon from '@material-ui/icons/AcUnit';


//Ghorwali Component
import AdminProfile from './views/Admin/AdminProfile.js'
import CreateAdmin from './views/Admin/CreateAdmin.js'
import AdminManagement from './views/Admin/AdminManagement.js'
import CreateVendor from './views/Vendor/CreateVendor.js'
import VendorList from './views/Vendor/VendorList.js'
import SponsorVendor from './views/Vendor/SponsorVendor.js'
import VoucherList from './views/Voucher/VoucherList.js'
import CreateVoucher from './views/Voucher/CreateVoucher.js'
import AppPrivacy from "views/AppPrivacy/AppPrivacy.js";
// import CreatePlan from "views/Subscription/CreatePlan.js";
// import PlanList from "views/Subscription/PlanList.js";
import SubscriptionPlan from "views/Subscription/SubscriptionPlan.js";
import SlideList from "views/Slide/SlideList.js";
import NotificationComponent from "views/GwNotifications/NotificationComponent.js"
import RiderList from "views/Rider/RiderList.js";
import CreateRider from "views/Rider/CreateRider.js";
import VendorProducts from "views/Vendor/VendorProducts.js";
import VendorBalanceAdjust from "views/Vendor/VendorBalanceAdjust.js";
import RiderBalanceAdjust from "views/Rider/RiderBalanceAdjust.js";
import RiderTransectionList from "views/Rider/RiderTransectionList.js";
import VendorTransectionList from "views/Vendor/VendorTransectionList.js";
import CustomerList from "views/Customer/CustomerList.js";
import CustomerTransectionList from "views/Customer/CustomerTransectionList.js";
import CustomerOrderList from "views/Customer/CustomerOrderList.js";
import CreateSlide from "views/Slide/CreateSlide.js";
import Payments from "views/Payments/Payments.js";
import AddCity from "views/Resources/AddCity.js";
import ProductCommission from "views/Commission/ProductCommission.js";
import CommissionAdjustment from "views/Commission/CommissionAdjustment.js";
import About from "views/Resources/About.js";
import AboutUpdate from "views/Resources/AboutUpdate.js";
import UpdateContacts from "views/Resources/UpdateContacts.js";
import GlobalProductCommission from "views/Resources/GlobalProductCommission.js";




var dashRoutes = [
  // ###################### Admin ######################
  {
    collapse: true,
    name: "Admin",
    rtlName: "صفحات",
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
        layout: "/admin"
      },
      {
        path: "/create-admin",
        name: "Create Admin",
        rtlName: "تيالجدول الزمني",
        mini: "CA",
        rtlMini: "تي",
        component: CreateAdmin,
        layout: "/admin"
      },
      {
        path: "/admin-management",
        name: "Admin Management",
        rtlName: "تيالجدول الزمني",
        mini: "AM",
        rtlMini: "تي",
        component: AdminManagement,
        layout: "/admin"
      }
    ]
  },
  // ###################### Dashboard ######################
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  // ###################### Notification Management ######################
  {
    collapse: true,
    name: "Notifications",
    icon: NotificationsActiveIcon,
    state: "notificationCollapse",
    views: [
      {
        path: "/all-notification",
        name: "All Notifications",
        mini: "AN",
        component: NotificationComponent,
        layout: "/admin"
      }
    ]
  },
  // ###################### Payment Management ######################
  {
    collapse: true,
    name: "Payments",
    icon: AccountBalanceWalletIcon,
    state: "paymentCollapse",
    views: [
      {
        path: "/payments",
        name: "payments",
        mini: "P",
        component: Payments,
        layout: "/admin"
      }
    ]
  },
  // ###################### Vendor Management ######################
  {
    collapse: true,
    name: "Vendor Management",
    rtlName: "صفحات",
    icon: RestaurantMenuIcon,
    state: "vendorCollapse",
    views: [
      // {
      //   path: "/create-vendor",
      //   name: "Add Vendor",
      //   mini: "AV",
      //   component: CreateVendor,
      //   layout: "/admin"
      // },
      {
        path: "/vendor-list",
        name: "Vendor List",
        mini: "VL",
        component: VendorList,
        layout: "/admin"
      },
      // {
      //   path: "/sponsor-vendor",
      //   name: "Sponsor Vendor",
      //   mini: "SV",
      //   component: SponsorVendor,
      //   layout: "/admin"
      // },
      {
        path: "/vendor-products",
        name: "Vendor Products",
        mini: "VP",
        component: VendorProducts,
        layout: "/admin"
      },
      {
        path: "/vendor-balance-adjustment",
        name: "Adjust Balance",
        mini: "AB",
        component: VendorBalanceAdjust,
        layout: "/admin"
      },
      {
        path: "/vendor-transection-list",
        name: "Transection List",
        mini: "TL",
        component: VendorTransectionList,
        layout: "/admin"
      }
    ]
  },
  // ###################### Rider Management ######################
  {
    collapse: true,
    name: "Rider Management",
    rtlName: "صفحات",
    icon: DirectionsBikeIcon,
    state: "riderCollapse",
    views: [
      // {
      //   path: "/create-rider",
      //   name: "Add Rider",
      //   mini: "AR",
      //   component: CreateRider,
      //   layout: "/admin"
      // },
      {
        path: "/rider-list",
        name: "Rider List",
        mini: "RL",
        component: RiderList,
        layout: "/admin"
      },
      {
        path: "/rider-balance-adjust",
        name: "Adjust Balance",
        mini: "AB",
        component: RiderBalanceAdjust,
        layout: "/admin"
      },
      {
        path: "/rider-transection-list",
        name: "Transection List",
        mini: "TL",
        component: RiderTransectionList,
        layout: "/admin"
      }
    ]
  },
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
        mini: "UL",
        component: CustomerList,
        layout: "/admin"
      },
      {
        path: "/user-transection-list",
        name: "Transection List",
        mini: "TL",
        component: CustomerTransectionList,
        layout: "/admin"
      },
      {
        path: "/user-order-list",
        name: "Order List",
        mini: "OL",
        component: CustomerOrderList,
        layout: "/admin"
      }
    ]
  },
  // ###################### Voucher Management ######################
  {
    collapse: true,
    name: "Voucher Management",
    rtlName: "صفحات",
    icon: LocalOfferIcon,
    state: "voucherCollapse",
    views: [
      {
        path: "/create-voucher",
        name: "Create Voucher",
        mini: "CV",
        component: CreateVoucher,
        layout: "/admin"
      },
      {
        path: "/voucher-list",
        name: "Voucher List",
        mini: "VL",
        component: VoucherList,
        layout: "/admin"
      }
    ]
  },
  // ###################### Slide Management ######################
  {
    collapse: true,
    name: "Slide Management",
    rtlName: "صفحات",
    icon: AmpStoriesIcon,
    state: "slideCollapse",
    views: [
      {
        path: "/create-slide",
        name: "Create Slide",
        mini: "C S",
        component: CreateSlide,
        layout: "/admin"
      },
      {
        path: "/slide-list",
        name: "Slide List",
        mini: "S L",
        component: SlideList,
        layout: "/admin"
      }
    ]
  },
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
  // ###################### Subscription Plan Management ######################
  {
    collapse: true,
    name: "Subscription Plan",
    icon: CardMembershipIcon,
    state: "subscriptionPlanCollapse",
    views: [
      // {
      //   path: "/create-plan",
      //   name: "Add Plan",
      //   mini: "AP",
      //   component: CreatePlan,
      //   layout: "/admin"
      // },
      {
        path: "/subscription-plan",
        name: "Subscription Plan",
        mini: "SP",
        component: SubscriptionPlan,
        layout: "/admin"
      },
    ]
  },
  // ###################### Product Commission Management ######################
  {
    collapse: true,
    name: "Commission Manag...",
    icon: PaymentIcon,
    state: "commissionCollapse",
    views: [
      {
        path: "/product-commission",
        name: "Product Commission",
        mini: "PC",
        component: ProductCommission,
        layout: "/admin"
      },
      {
        path: "/commission-adjustment",
        name: "Commission Adjustment",
        mini: "CA",
        component: CommissionAdjustment,
        layout: "/admin"
      },
    ]
  },
  // ###################### Resources ######################
  {
    collapse: true,
    name: "Resources",
    icon: TrackChangesIcon,
    state: "resourcesCollapse",
    views: [
      {
        path: "/global-pc",
        name: "Global PC",
        mini: "GPC",
        component: GlobalProductCommission,
        layout: "/admin"
      },
      {
        path: "/about",
        name: "About",
        mini: "A",
        component: About,
        layout: "/admin"
      },
      {
        path: "/updateabout",
        name: "Update About",
        mini: "UA",
        component: AboutUpdate,
        layout: "/admin"
      },
      {
        path: "/privacy-setting",
        name: "Privacy Setting",
        mini: "PS",
        component: AppPrivacy,
        layout: "/admin"
      },
      {
        path: "/add-city",
        name: "Add City",
        mini: "PS",
        component: AddCity,
        layout: "/admin"
      },
      {
        path: "/update-contacts",
        name: "Update Contacts",
        mini: "UC",
        component: UpdateContacts,
        layout: "/admin"
      },
    ]
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





  // ###################### Pages ######################
  {
    collapse: true,
    name: "Pages",
    rtlName: "صفحات",
    icon: Image,
    state: "pageCollapse",
    views: [
      {
        path: "/pricing-page",
        name: "Pricing Page",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: PricingPage,
        layout: "/auth"
      },

      {
        path: "/rtl-support-page",
        name: "RTL Support",
        rtlName: "صودعم رتل",
        mini: "RS",
        rtlMini: "صو",
        component: RTLSupport,
        layout: "/rtl"
      },
      {
        path: "/timeline-page",
        name: "Timeline Page",
        rtlName: "تيالجدول الزمني",
        mini: "T",
        rtlMini: "تي",
        component: TimelinePage,
        layout: "/admin"
      },
      {
        path: "/login-page",
        name: "Login Page",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: LoginPage,
        layout: "/auth"
      },
      {
        path: "/register-page",
        name: "Register Page",
        rtlName: "تسجيل",
        mini: "R",
        rtlMini: "صع",
        component: RegisterPage,
        layout: "/auth"
      },
      {
        path: "/lock-screen-page",
        name: "Lock Screen Page",
        rtlName: "اقفل الشاشة",
        mini: "LS",
        rtlMini: "هذاع",
        component: LockScreenPage,
        layout: "/auth"
      },
      {
        path: "/user-page",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "UP",
        rtlMini: "شع",
        component: UserProfile,
        layout: "/admin"
      },
      {
        path: "/error-page",
        name: "Error Page",
        rtlName: "صفحة الخطأ",
        mini: "E",
        rtlMini: "البريد",
        component: ErrorPage,
        layout: "/auth"
      }
    ]
  },
  {
    collapse: true,
    name: "Components",
    rtlName: "المكونات",
    icon: Apps,
    state: "componentsCollapse",
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        rtlName: "انهيار متعدد المستويات",
        mini: "MC",
        rtlMini: "ر",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            rtlName: "وصفت",
            mini: "B",
            rtlMini: "ب",
            component: Buttons,
            layout: "/admin"
          }
        ]
      },
      {
        path: "/buttons",
        name: "Buttons",
        rtlName: "وصفت",
        mini: "B",
        rtlMini: "ب",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/grid-system",
        name: "Grid System",
        rtlName: "نظام الشبكة",
        mini: "GS",
        rtlMini: "زو",
        component: GridSystem,
        layout: "/admin"
      },
      {
        path: "/panels",
        name: "Panels",
        rtlName: "لوحات",
        mini: "P",
        rtlMini: "ع",
        component: Panels,
        layout: "/admin"
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        rtlName: "الحلو تنبيه",
        mini: "SA",
        rtlMini: "ومن",
        component: SweetAlert,
        layout: "/admin"
      },
      {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        mini: "N",
        rtlMini: "ن",
        component: Notifications,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        mini: "I",
        rtlMini: "و",
        component: Icons,
        layout: "/admin"
      },
      {
        path: "/typography",
        name: "Typography",
        rtlName: "طباعة",
        mini: "T",
        rtlMini: "ر",
        component: Typography,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    rtlName: "إستمارات",
    icon: "content_paste",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "نماذج موسعة",
        mini: "EF",
        rtlMini: "هوو",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "نماذج التحقق من الصحة",
        mini: "VF",
        rtlMini: "تو",
        component: ValidationForms,
        layout: "/admin"
      },
      {
        path: "/wizard",
        name: "Wizard",
        rtlName: "ساحر",
        mini: "W",
        rtlMini: "ث",
        component: Wizard,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    rtlName: "الجداول",
    icon: GridOn,
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        rtlName: "طاولات عادية",
        mini: "RT",
        rtlMini: "صر",
        component: RegularTables,
        layout: "/admin"
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        rtlName: "جداول ممتدة",
        mini: "ET",
        rtlMini: "هور",
        component: ExtendedTables,
        layout: "/admin"
      },
      {
        path: "/react-tables",
        name: "React Tables",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ReactTables,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Maps",
    rtlName: "خرائط",
    icon: Place,
    state: "mapsCollapse",
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        rtlName: "خرائط جوجل",
        mini: "GM",
        rtlMini: "زم",
        component: GoogleMaps,
        layout: "/admin"
      },
      {
        path: "/full-screen-maps",
        name: "Full Screen Map",
        rtlName: "خريطة كاملة الشاشة",
        mini: "FSM",
        rtlMini: "ووم",
        component: FullScreenMap,
        layout: "/admin"
      },
      {
        path: "/vector-maps",
        name: "Vector Map",
        rtlName: "خريطة المتجه",
        mini: "VM",
        rtlMini: "تم",
        component: VectorMap,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/widgets",
    name: "Widgets",
    rtlName: "الحاجيات",
    icon: WidgetsIcon,
    component: Widgets,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "الرسوم البيانية",
    icon: Timeline,
    component: Charts,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "التقويم",
    icon: DateRange,
    component: Calendar,
    layout: "/admin"
  }


];
export default dashRoutes;
