import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import HomePage from "./pages/HomePage";
import CreateCategoryForm from "./pages/categories/CreateCategory";
import CategoryList from "./pages/categories/CategoryList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signin" element={<SignInForm />} />
        <Route exact path="/signup" element={<SignUpForm />} />
        <Route exact path="/add-cat" element={<CreateCategoryForm />} />
        <Route exact path="/categories" element={<CategoryList />} />
      </Routes>
    </div>
  );
}

export default App;
