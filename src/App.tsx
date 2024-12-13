import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessPage from "./pages/ChessPage";
import Layout from "./components/Layout";
import "./reset.css";
import "./global.css";
import Auth from "./components/Auth";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ChessPage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
}
