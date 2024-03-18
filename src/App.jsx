import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Countries from "./routes/Countries";
import CountriesSingle from "./routes/CountriesSingle";
import Home from "./routes/Home";
import Root from "./routes/Root";
import store from "./store/store";
import { Provider } from "react-redux";
import Favourites from "./routes/favourites";
import Register from "./routes/Register";
import Login from "./routes/Login";


function App() {

  return (
    <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Routes>
            <Route path="/" element={<Root/>}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login/>}/>
           <Route path="register" element={<Register />} />
            <Route 
            path="/countries" 
            element={
            <ProtectedRoute>
              <Countries/>
              </ProtectedRoute>
            }/>
  <Route
path="/favourites"
element={
<ProtectedRoute>
<Favourites />
</ProtectedRoute>
}
/>
<Route
path="/countries/:single"
element={
<ProtectedRoute>
<CountriesSingle />
</ProtectedRoute>
}
/>
            </Route>
          </Routes>
        </Router>
    </LocalizationProvider>
    </Provider>
  );
}

export default App;
