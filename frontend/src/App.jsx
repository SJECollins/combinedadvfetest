import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/signin" element={<SignInForm />} />
        <Route exact path="/signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
