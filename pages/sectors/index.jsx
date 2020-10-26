
import React from "react";
import  Sector from "./Sector";
import SectorProvider  from "./SectorContext";

function App() {
  return (
      <SectorProvider>
        <Sector />
      </SectorProvider>
  );
}

export default App;
