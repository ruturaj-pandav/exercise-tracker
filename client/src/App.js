import "./App.css";

import Homepage from "./components/Homepage";
import AddExercise from "./components/AddExercise";
import AddUser from "./components/AddUser";
import EditExercise from "./components/EditExercise";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App  py-5 bg-gray-100 h-screen ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-exercise" element={<AddExercise />} />
          <Route path="/edit/:exercise_id" element={<EditExercise />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
