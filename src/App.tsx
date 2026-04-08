import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Message from './pages/Message';
import About from './pages/About';
import People from './pages/People';
import Recruit from './pages/Recruit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="message" element={<Message />} />
          <Route path="about" element={<About />} />
          <Route path="people" element={<People />} />
          <Route path="recruit" element={<Recruit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
