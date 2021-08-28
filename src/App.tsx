import 'bootstrap/dist/css/bootstrap.css';
import { getUserInfo, isLoggedIn, verifyLogin } from 'laytonstreet/api/LaytonStreetApi';
import UnitRouting from 'laytonstreet/pages/units/UnitsPage';
import { UserInfo } from 'laytonstreet/types/LaytonStreetTypes';
import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import './laytonstreet/AppIcons';
import LsNavbar from './laytonstreet/components/LsNavbar';
import { GlobalPublicContext, GlobalPublicContextType, loadGlobalPublicContext } from './laytonstreet/contexts/GlobalPublicContext';
import { UserContext } from './laytonstreet/contexts/UserContext';
import AboutUsPage from './laytonstreet/pages/ContactUsPage';
import ErrorPage from './laytonstreet/pages/ErrorPage';
import FaqsPage from './laytonstreet/pages/FaqsPage';
import GroundRentPage from './laytonstreet/pages/GroundRentPage';
import Home from './laytonstreet/pages/Home';
import LeaseExtensionCalculatorPage from './laytonstreet/pages/LeaseExtensionCalculatorPage';
import LoggedOutPage from './laytonstreet/pages/LoggedOutPage';
import MembersPage from './laytonstreet/pages/MembersPage';

window.onerror = (message, url, lineNo, columnNo, error) => {};
window.onunhandledrejection = (event) => {};

export default function App() {
  const [globalPublicContext, setGlobalPublicContext] = React.useState<GlobalPublicContextType>();
  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  React.useEffect(() => {
    loadGlobalPublicContext().then(setGlobalPublicContext);
    const userInfo = getUserInfo();
    setUserInfo(userInfo ?? undefined);
  }, []);
  if (!globalPublicContext) {
    return <></>;
  }
  function Login() {
    const [error, setError] = React.useState<number>();
    const [redirectUri, setRedirectUri] = React.useState<string>();
    const params = new URLSearchParams(useLocation().search);
    const code = params.get("code");
    const state = params.get("state");

    React.useEffect(() => {
      code && state && !isLoggedIn() && verifyLogin(code, state)
        .then(({ userInfo, redirectUri }) => {
          setRedirectUri(redirectUri);
          setUserInfo(userInfo);
        })
        .catch(() => setError(401))
    }, []);
    if (error) {
      return <ErrorPage code={error} />
    }
    if (redirectUri && redirectUri != window.location.href) {
      console.log(`Redirecting to [${redirectUri}]`);
      return <Navigate to={redirectUri.replace(window.origin, "")} />
    }
    return <></>;
  }
  return (
    <GlobalPublicContext.Provider value={globalPublicContext}>
      <UserContext.Provider value={userInfo}>
        <BrowserRouter>
          <div className="App">
            <LsNavbar activeItem="" onLogin={setUserInfo} onLogout={() => setUserInfo(undefined)} />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<LoggedOutPage/>}/>
              <Route path="/faqs" element={<FaqsPage/>}/>
              <Route path="/about-us" element={<AboutUsPage/>}/>
              <Route path="/news">
                <ErrorPage code={501} />
              </Route>
              <Route path="/members/*" element={<MembersPage/>}/>
              <Route path="/units/*" element={<UnitRouting/>}/>
              <Route path="/ground-rent">
                {''.length > 0 ? <GroundRentPage/> : <ErrorPage code={501} />}
              </Route>
              <Route path="/lease-extension-calculator">
                <LeaseExtensionCalculatorPage/>
              </Route>
              <Route path="*">
                <ErrorPage code={404} />
              </Route>
            </Routes>
          </div>
          {/* <NotificationsContainer /> */}
        </BrowserRouter>
      </UserContext.Provider>
    </GlobalPublicContext.Provider>
  );
}
