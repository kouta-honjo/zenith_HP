import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Vision from './pages/Vision';
import TopMessage from './pages/TopMessage';
import Business from './pages/Business';
import ThreeR from './pages/ThreeR';
import Projects from './pages/Projects';
import Staff from './pages/Staff';
import Data from './pages/Data';
import RecruitInfo from './pages/RecruitInfo';
import Benefits from './pages/Benefits';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vision" element={<Vision />} />
          <Route path="top-message" element={<TopMessage />} />
          <Route path="business" element={<Business />} />
          <Route path="3r" element={<ThreeR />} />
          <Route path="projects" element={<Projects />} />
          <Route path="staff" element={<Staff />} />
          <Route path="data" element={<Data />} />
          <Route path="recruit" element={<RecruitInfo />} />
          <Route path="benefits" element={<Benefits />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
