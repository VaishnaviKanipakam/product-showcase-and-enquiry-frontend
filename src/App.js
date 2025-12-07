import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductDetailPage from "./components/ProductDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/product/:id" element={<ProductDetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
