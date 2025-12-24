//      Final Project
import MainLayout from "./FINALprojects/Client/Styling/MainLayout";
import AppRoutes from "./AppRoutes";
import useAuthBootstrap from "./useAuthBootstrap";

function App() {
  const { loading } = useAuthBootstrap();

  if (loading) return <h1>Loading...</h1>;

  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}

export default App;















