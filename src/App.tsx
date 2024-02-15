import React from "react";
import "./App.css";
import AppWrapper from "./components/AppWrapper";
import AppLayout from "./components/AppLayout";
import AppInitialisations from "./components/AppInitialisations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppWrapper>
          <AppInitialisations>
            <AppLayout />
          </AppInitialisations>
        </AppWrapper>
      </QueryClientProvider>
    </>
  );
}

export default App;
