import React from "react";
import { SectorContext } from "./SectorContext";

const Sector = () => {
  const { result, loading, error } = React.useContext(SectorContext);
  return (
    <div>
      <b>BRANSCHER</b> {error && <p>Error Loading..</p>}
      <p>key: {process.env.BD_API_KEY}</p>
      {loading && "loading.."}
      <ol>
        {result &&
          result.sectors.map((sector) => (
            <li key={sector.id}>{sector.name}</li>
          ))}
      </ol>
    </div>
  );
}

export default Sector