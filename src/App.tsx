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
          <Route path="/ground-rent">
            <GroundRentPage/>
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
