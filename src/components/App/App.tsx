import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Article from "../Article/Article";
import NotFound from "../NotFound/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/news" replace />} />

      <Route path="news">
        <Route index element={<Home />} />
        <Route path=":id" element={<Article />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
