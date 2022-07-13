import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
                  <Toaster    position="top-right"
/>

      <BrowserRouter>
      
      <Routes>
      <Route path="/" element={<Dashboard/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
