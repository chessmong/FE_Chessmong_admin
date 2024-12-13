import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./reset.css";
import "./global.css";
import Layout from "./components/Layout";
import ChessPage from "./pages/ChessPage";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import InputPage from "./pages/InputPage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/chess" element={<ChessPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
