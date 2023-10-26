import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ListArticles from "../pages/ListArticles";
import DetailArticle from "../pages/DetailArticle";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate path="/articles" replace={true} />}
          />
          <Route path="/articles" element={<ListArticles />} />
          <Route path="/articles/:id" element={<DetailArticle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
