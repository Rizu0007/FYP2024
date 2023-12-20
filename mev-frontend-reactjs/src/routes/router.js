import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import MainLayout from "../layouts/main";
import BotHome from "../pages/bot-home";
import BotLayout from "../layouts/bot";
import Stop from "../pages/comsatShop";
import Deposit from "../pages/WalletProfile";
import Withdraw from "../pages/ComsatCoin";
import Settings from "../pages/settings";
import Buy from "../pages/buy";
import Terms from "../pages/terms-of-use";
import Privacy from "../pages/privacy-policy";
import Login from "../components/login";
import Register from "../components/register";
import Auth from "../layouts/auth"; // import TestApp from "../pages/test";
import Profile from "../components/profile/index";
import CreateWallet from "../components/Wallet";
import Create from "../components/Create";
import Password from "../components/password";
import WalletHome from "../components/UserWallet";
import PinVerification from "../components/PinVerification";
import UserProfile from "../components/security";
import General from "../components/Genenral";
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
        
      {
        path: "auth/wallet",
        element: <CreateWallet />,
      },

      {
        path: "auth/password",
        element: <Password />,
      },
      {
        path: "auth/walletHome",
        element: <WalletHome />,
      },
      {
        path: "auth/settings",
        element: <Settings />,
      },
      {
        path: "auth/Pinverf",
        element: <PinVerification />,
      },
      
      {
        path: "auth/bot/deposit",
        element: <Deposit />,
      },
      
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "auth/Pinverf",
        element: <PinVerification />,
      },
      {
        path: "/Bcreate",
        element: <CreateWallet />,
      },
      {
        path: "/seedcreate",
        element: <Create />,
      },
    
      {
        path: "/profile",
        element: <Profile />,
      },
      
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/buy",
        element: <Buy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy-policy",
        element: <Privacy />,
      },
    ],
  },
  {
    path: "/bot",
    element: <BotLayout />,
    children: [
      {
        path: "/bot",
        element: <BotHome />,
      },
      {
        path: "/bot/stop",
        element: <Stop />,
      },
      {
        path: "/bot/deposit",
        element: <Deposit />,
      },
      {
        path: "/bot/withdraw",
        element: <Withdraw />,
      },
      {
        path: "auth/Pinverf",
        element: <PinVerification />,
      },
    
      {
        path: "/bot/profile",
        element: <Profile />,
      },
    
        {
          path:'/bot/general',
          element:<General/>
          },
      
    ],
  },
]);

export default router;
