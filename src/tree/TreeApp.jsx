import React from "react";
import Tree from "./Tree";
import data from "./data";

function TreeApp() {
  return <Tree data={data} width={600} height={500} />;
}

export default TreeApp;
