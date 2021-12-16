import { Home } from "./pages/home";
import Modal from "react-modal";

Modal.setAppElement("#root");
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
