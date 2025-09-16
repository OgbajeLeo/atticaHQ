import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

function App() {
  return (
    <AdminAuthProvider>
      <AppRoutes />
    </AdminAuthProvider>
  );
}
export default App;
