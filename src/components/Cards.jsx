import React from "react";
import Card from "./Card";

function Cards({ allHouses }) {
  return (
    <div className="ml-3 lg:ml-20 mt-5 mr-3 lg:mr-20 grid-col-2 mb-20">
      <div className="flex justify-center w-full lg:justify-between">
        <div layout className=" cards flex flex-wrap w-full  ">
          {allHouses.map((house, i) => (
            <Card key={i} house={house} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
