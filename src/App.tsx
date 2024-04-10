import "./styles/variables.css";
import AppRoutes from "./Routes/AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import { LanguageProvider } from "./Contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { LandmarkProvider } from "./Contexts/LandmarkContext";
export default function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <LanguageProvider>
          <LandmarkProvider>
            <AppRoutes />
          </LandmarkProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
    
  );
}
