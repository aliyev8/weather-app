import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import Cities from "./pages/Cities";
import City from "./pages/City";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Cities />} />
          <Route path=":city" element={<City />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
