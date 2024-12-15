import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "./states/authState";
import "./reset.css";
import "./global.css";
import Layout from "./components/Layout";
import ChessPage from "./pages/ChessPage";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import InputPage from "./pages/InputPage";

export default function App() {
  const auth = useRecoilValue(authState);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* 인증이 필요 없는 페이지 */}
          <Route path="/auth" element={<AuthPage />} />
          {/* 인증이 필요한 페이지 */}
          <Route path="/" element={auth.isLoggedIn ? <InputPage /> : <Navigate to="/auth" />} />
          <Route
            path="/chess"
            element={auth.isLoggedIn ? <ChessPage /> : <Navigate to="/auth" />}
          />
          <Route path="/list" element={auth.isLoggedIn ? <ListPage /> : <Navigate to="/auth" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
