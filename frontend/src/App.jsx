import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CWLDashboard from './pages/CWLDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cwl/:clanTag" element={<CWLDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
