import { Tabs } from "antd";
import React from "react";
import Goat from "./Goat";
import Hades from "./Hades";

const items = [
  { label: "Hades", key: "hades", children: <Hades /> }, // remember to pass the key prop
  { label: "Goat", key: "goat", children: <Goat /> },
];

const TableApp = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default TableApp;
