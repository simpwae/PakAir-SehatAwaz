import Routeee from "./Routes/Routeee";
import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <Routeee />
      </FilterProvider>
    </AuthProvider>
  );
}

export default App;
