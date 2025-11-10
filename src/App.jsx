import Routeee from "./Routes/Routeee";
import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/FilterContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FilterProvider>
          <Routeee />
        </FilterProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
