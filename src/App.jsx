import React from 'react';
import './App.css';
import { GlobalStorage } from './GlobalContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  return (
    <GlobalStorage>
      <Header />
      <Main />
      <Footer />
    </GlobalStorage>
  )
}

export default App;