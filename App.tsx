import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';
import ConverterActivity from './components/pages/ConverterActivity';
import GeoGebraActivity from './components/pages/GeoGebraActivity';
import PadletActivity from './components/pages/PadletActivity';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/converter" element={<ConverterActivity />} />
            <Route path="/geogebra" element={<GeoGebraActivity />} />
            <Route path="/padlet" element={<PadletActivity />} />
          </Routes>
        </main>
        <footer className="text-center p-4 text-slate-500 text-sm">
          <p>멋진 수학 수업 경험을 위해 만들어졌습니다.</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;