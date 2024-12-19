import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import DetailPage from "./pages/detail";
import CreatePage from "./pages/create";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
