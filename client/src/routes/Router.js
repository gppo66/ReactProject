import React, { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppNavBar from '../components/AppNavbar';

const MyRouter = () => (
  <Fragment>
    <AppNavBar />
    <Header />
    <h1>Hello Body</h1>
    <Footer />
  </Fragment>
);

export default MyRouter;
