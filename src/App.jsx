import Routeee from "./Routes/Routeee";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routeee />
    </AuthProvider>
  );
}

export default App;
