import React from "react";
import ReactDOM from "react-dom/client";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import App from "./App";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(

  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </DndProvider>
  </React.StrictMode>
);
