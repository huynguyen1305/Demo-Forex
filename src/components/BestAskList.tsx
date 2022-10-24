import { Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";

interface ResponsetType {
  _id: string;
  collectionImage: string;
  collectionName: string;
  tensor: number;
  hades: number;
  goat: number;
  eden: number;
  lowestAsk: number;
  highestAsk: number;
}

const columns: ColumnsType<ResponsetType> = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
    render: (a, b, c) => {
      return <div key={c}>{c + 1}</div>;
    },
  },
  {
    title: "Collection Name",
    dataIndex: "collectionName",
    key: "collectionName",
    render: (textName, record) => {
      return (
        <div style={{ display: "flex", alignItems: "center" }} key={textName}>
          <div style={{ width: "50px", height: "50px", marginRight: "1rem" }}>
            <img
              src={record.collectionImage}
              alt="collection"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          </div>
          <strong>{textName}</strong>
        </div>
      );
    },
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.collectionName.localeCompare(b.collectionName),
  },
  {
    title: "Tensor",
    dataIndex: "tensor",
    key: "tensor",
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.tensor - b.tensor,
    render: (item, record) => {
      console.log(item, record);
      return (
        <div
          className={`${item === record.highestAsk && "isHighAsk"} ${
            item === record.lowestAsk && "isLowAsk"
          }`}
        >
          {item === 0 ? "-" : item}
        </div>
      );
    },
  },
  {
    title: "Hades",
    key: "hades",
    dataIndex: "hades",
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.hades - b.hades,
    render: (item, record) => {
      console.log(item, record);
      return (
        <div
          className={`${item === record.highestAsk && "isHighAsk"} ${
            item === record.lowestAsk && "isLowAsk"
          }`}
        >
          {item === 0 ? "-" : item}
        </div>
      );
    },
  },
  {
    title: "Goat",
    dataIndex: "goat",
    key: "goat",
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.goat - b.goat,
    render: (item, record) => {
      console.log(item, record);
      return (
        <div
          className={`${item === record.highestAsk && "isHighAsk"} ${
            item === record.lowestAsk && "isLowAsk"
          }`}
        >
          {item === 0 ? "-" : item}
        </div>
      );
    },
  },

  {
    title: "Eden",
    key: "eden",
    dataIndex: "eden",
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.eden - b.eden,
    render: (item, record) => {
      console.log(item, record);
      return (
        <div
          className={`${item === record.highestAsk && "isHighAsk"} ${
            item === record.lowestAsk && "isLowAsk"
          }`}
        >
          {item === 0 ? "-" : item}
        </div>
      );
    },
  },
];

function BestAskList({ bestAskList }: any) {
  const [rows, setRows] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const handleChange = (e: any) => {
    console.log(rows, searchList);
    if (e.target.value === "") {
      return setSearchList(rows);
    } else if (rows.length > 0) {
      const searchList = rows.filter((item: any) =>
        item.collectionName.toLowerCase().includes(e.target.value)
      );
      setSearchList(searchList);
    }
  };

  useEffect(() => {
    if (bestAskList) {
      setRows(bestAskList);
      setSearchList(bestAskList);
    }
  }, [bestAskList]);

  return (
    <div style={{ padding: "1rem" }}>
      <Input onChange={handleChange} placeholder="Search by Collection Name" />
      <br />
      <br />
      <Table dataSource={searchList} columns={columns}></Table>
    </div>
  );
}

export default BestAskList;
