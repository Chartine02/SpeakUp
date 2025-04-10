import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
