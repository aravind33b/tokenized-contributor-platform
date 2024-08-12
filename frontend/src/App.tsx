import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClaimPortal from './components/claimPortal';
import Project from './components/newProject';
import Navbar from './components/navbar';
import { config } from './components/config';
import './App.css';
import { NavLink } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className='app-container'>
            <Navbar />
            <div className='main-content'>
              <div className='left-menu'>
                <ul>
                  <li><NavLink to="/" exact activeClassName="active">Dashboard</NavLink></li>
                  <li><NavLink to="/project" activeClassName="active">New Project</NavLink></li>
                  <li><NavLink to="/transactions" activeClassName="active">Transactions</NavLink></li>
                  <li><NavLink to="/allocations" activeClassName="active">Allocations</NavLink></li>
                  <li><NavLink to="/stakeholders" activeClassName="active">Stakeholders</NavLink></li>

                </ul>
              </div>
              <div className='right-content'>
                <Routes>
                  <Route path='/' element={<ClaimPortal />} />
                  <Route path='/project' element={<Project />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
