import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './laytonstreet/AppIcons';
import LsNavbar from './laytonstreet/components/LsNavbar';
import ContactUsPage from './laytonstreet/pages/ContactUsPage';
import ErrorPage from './laytonstreet/pages/ErrorPage';
import FaqsPage from './laytonstreet/pages/FaqsPage';
import GroundRentPage from './laytonstreet/pages/GroundRentPage';
import Home from './laytonstreet/pages/Home';
import MembersPage from './laytonstreet/pages/MembersPage';
import LeaseExtensionCalculatorPage from './laytonstreet/pages/LeaseExtensionCalculatorPage';


export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LsNavbar activeItem="" />
        <Switch>
          <Route exact path="/">
            {''.length > 0 ? <Home/> : <ErrorPage code={501} />}
          </Route>
          <Route path="/faqs">
          {''.length > 0 ? <FaqsPage/> : <ErrorPage code={501} />}
          </Route>
          <Route path="/contact-us">
            <ContactUsPage/>
          </Route>
          <Route path="/news">
            <ErrorPage code={501} />
          </Route>
          <Route path="/maintenance">
            <ErrorPage code={501} />
          </Route>
          <Route path="/members">
            {''.length > 0 ? <MembersPage/> : <ErrorPage code={501} />}
          </Route>
          <Route path="/ground-rent">
            {''.length > 0 ? <GroundRentPage/> : <ErrorPage code={501} />}
          </Route>
          <Route path="/lease-extension-calculator">
            <LeaseExtensionCalculatorPage/>
          </Route>
          <Route path="*">
            <ErrorPage code={404} />
          </Route>
        </Switch>
      </div>
      {/* <NotificationsContainer /> */}
    </BrowserRouter>
  );
}
