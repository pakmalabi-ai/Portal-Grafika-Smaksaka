import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TechniqueBasics from './pages/TechniqueBasics';
import Placeholder from './pages/Placeholder';
import { PageRoute } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={PageRoute.HOME} element={<Home />} />
          <Route path={PageRoute.TECHNIQUE} element={<TechniqueBasics />} />
          
          {/* Placeholder Pages */}
          <Route path={PageRoute.PAGE_3} element={<Placeholder />} />
          <Route path={PageRoute.PAGE_4} element={<Placeholder />} />
          <Route path={PageRoute.PAGE_5} element={<Placeholder />} />
          <Route path={PageRoute.PAGE_6} element={<Placeholder />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to={PageRoute.HOME} replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;