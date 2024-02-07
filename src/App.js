import { useLoadToken } from "./hooks/use-load-token";
import { Routes } from "./config/routes";

function App() {
  useLoadToken();

  return <Routes />;
}

export default App;
