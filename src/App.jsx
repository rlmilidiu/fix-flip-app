import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpportunitiesPage from './pages/OpportunitiesPage';
import SelectedOpportunitiesPage from './pages/SelectedOpportunitiesPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/oportunidades" element={<OpportunitiesPage />} />
        <Route path="/resultados" element={<ResultsPage />} />
        <Route path="/oportunidades-selecionadas" element={<SelectedOpportunitiesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

