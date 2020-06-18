import React from 'react';
import './App.css';
import Router from './Router'
import { Layout } from 'antd';
import Header from './header'
function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Router />
        {/* <Footer /> */}
      </Layout>
    </div>
  );
}

export default App;
