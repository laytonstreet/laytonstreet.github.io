import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './laytonstreet/AppIcons';
import LsNavbar from './laytonstreet/components/LsNavbar';
import ContactUsPage from './laytonstreet/pages/ContactUsPage';
import ErrorPage from './laytonstreet/pages/ErrorPage';
import FaqsPage from './laytonstreet/pages/FaqsPage';
import Home from './laytonstreet/pages/Home';
import MembersPage from './laytonstreet/pages/MembersPage';
import LeaseholdersPage from './laytonstreet/pages/LeaseholdersPage';
import CantFindWhatYoureLookingForToast from './laytonstreet/components/CantFindWhatYoureLookingForToast';
import GroundRentPage from './laytonstreet/pages/GroundRentPage';


export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LsNavbar activeItem="" />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/faqs">
            <FaqsPage/>
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
            <MembersPage/>
          </Route>
          <Route path="/leaseholders">
            <LeaseholdersPage/>
          </Route>
          <Route path="/ground-rent">
            <GroundRentPage/>
          </Route>
          <Route path="*">
            <ErrorPage code={404} />
          </Route>
        </Switch>
        <CantFindWhatYoureLookingForToast/>
      </div>
      {/* <NotificationsContainer /> */}
    </BrowserRouter>
  );
}
