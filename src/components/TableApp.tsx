import { Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BestAskList from "./BestAskList";
import BestBidList from "./BestBidList";

interface ResponseData {
  _id: string;
  collectionName: string;
  collectionImage: string;
  bestAskRes: {
    tensor: number;
    hades: number;
    goat: number;
    eden: number;
  };
  bestBidRes: {
    tensor: number;
    hades: number;
    goat: number;
    eden: number;
  };
}

const TableApp = () => {
  const [bestAskList, setBestAskList] = useState([
    {
      _id: "",
      collectionImage: "",
      collectionName: "",
      tensor: 0,
      hades: 0,
      goat: 0,
      eden: 0,
    },
  ]);
  const [bestBidList, setBestBidList] = useState([
    {
      _id: "",
      collectionImage: "",
      collectionName: "",
      tensor: 0,
      hades: 0,
      goat: 0,
      eden: 0,
    },
  ]);

  useEffect(() => {
    const getDataTable = async () => {
      const { data } = await axios.get("http://localhost:3005/getTable");
      if (data) {
        const bestAskListTmp = data.map((item: ResponseData) => {
          const tmp = item.bestAskRes;
          return {
            _id: item._id,
            collectionImage: item.collectionImage,
            collectionName: item.collectionName,
            tensor: tmp.tensor,
            hades: tmp.hades,
            goat: tmp.goat,
            eden: tmp.eden,
            lowestAsk: Math.min(tmp.tensor, tmp.hades, tmp.goat, tmp.eden),
            highestAsk: Math.max(tmp.tensor, tmp.hades, tmp.goat, tmp.eden),
          };
        });
        if (bestAskListTmp.length > 0) {
          setBestAskList(bestAskListTmp);
        }
        const bestBidListTmp = data.map((item: ResponseData) => {
          const tmp = item.bestBidRes;
          return {
            _id: item._id,
            collectionImage: item.collectionImage,
            collectionName: item.collectionName,
            tensor: tmp.tensor,
            hades: tmp.hades,
            goat: tmp.goat,
            eden: tmp.eden,
            lowestBid: Math.min(tmp.tensor, tmp.hades, tmp.goat, tmp.eden),
            highestBid: Math.max(tmp.tensor, tmp.hades, tmp.goat, tmp.eden),
          };
        });
        if (bestBidListTmp.length > 0) {
          setBestBidList(bestBidListTmp);
        }
        console.log(bestAskListTmp, bestBidListTmp);
      }
    };
    getDataTable();
  }, []);

  const items = [
    {
      label: "Best Ask",
      key: "BestAsk",
      children: <BestAskList bestAskList={bestAskList} />,
    },
    {
      label: "Best Bid",
      key: "BestBid",
      children: <BestBidList bestBidList={bestBidList} />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="2" items={items} />
    </div>
  );
};

export default TableApp;
