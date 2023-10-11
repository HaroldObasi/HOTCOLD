import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
