import { Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

// const abc = {
//   marketPubkey: "68N1rdhstxvAipxwe1MVHBWAd8YaKiMtRUTfnv9zPCH5",
//   collectionName: "FRAKT",
//   collectionImage:
//     "https://bucketeer-669fb267-3d5e-4f8d-bb42-c31b566a3619.s3.amazonaws.com/public/market_images/frakt.png",
//   listingsAmount: 74,
//   floorPrice: "2.805",
//   bestoffer: "2.590",
//   offerTVL: "133.543",
//   nftValidationAdapter: "8UqgA1hBBCv4i6xyXLBSopRkzqwkGpqvzMUyGLyKk4vy",
// };

// const bcd = {
//   address: "BiwemBos3Su9QcNUiwkZMbSKi7m959t5oVpmPnM9Z3SH",
//   name: "Lifinity Flares",
//   symbol: "FLARES",
//   image: "https://arweave.net/JUJQbnuSMSRWs0zsbMQOVBI2AEZsZpynPOO-vpkjlYo",
//   authentic: true,
//   hyperspaceProjectId: "lifinity",
//   listings: 1,
//   floorPrice: "13837000000",
//   globalFloorPrice: "9177272070",
//   bestOffer: "9900000",
//   offerTvl: "10000000",
//   volume: "51753000000",
// };

interface ResponsetType {
  listings: number;
  collectionImage: string;
  collectionName: string;
  floorPrice: number;
  bestOffer: number;
  offerTvl: number;
  marketPubkey: string;
}

const columns: ColumnsType<ResponsetType> = [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Collection Name",
    dataIndex: "collectionName",
    key: "collectionName",
    render: (textName, record) => {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
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
    title: "Listing",
    dataIndex: "listings",
    key: "listings",
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.listings - b.listings,
  },
  {
    title: "Floor Price",
    key: "floorPrice",
    dataIndex: "floorPrice",
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.floorPrice - b.floorPrice,
  },
  {
    title: "Best Offer",
    dataIndex: "bestOffer",
    key: "bestOffer",
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.bestOffer - b.bestOffer,
  },

  {
    title: "Offer Tvl",
    key: "offerTvl",
    dataIndex: "offerTvl",
    sortDirections: ["descend", "ascend"],
    sorter: (a, b) => a.offerTvl - b.offerTvl,
  },
];

const Goat = () => {
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
    const fetchDataGoat = async () => {
      const response = await axios.get(
        "https://corsanywhere.herokuapp.com/https://goatswap.xyz/api/trpc/collectionMetas.all",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response) {
        const filterList = response.data.result.data.json.map(
          (item: any, idx: number) => ({
            no: idx + 1,
            listings: item.listings,
            collectionImage: item.image,
            collectionName: item.name,
            floorPrice: Number(item.floorPrice?.replace(".", "")) / 1000 || 0,
            bestOffer: Number(item.bestOffer?.replace(".", "")) / 1000 || 0,
            offerTvl: Number(item.offerTvl?.replace(".", "")) / 1000 || 0,
            marketPubkey: item.address,
          })
        );
        console.log(response);
        setRows(filterList);
        setSearchList(filterList);
      }
    };
    fetchDataGoat();
  }, []);
  return (
    <div style={{ padding: "1rem" }}>
      <Input onChange={handleChange} placeholder="Search by Collection Name" />
      <br />
      <br />
      <Table dataSource={searchList} columns={columns}></Table>
    </div>
  );
};

export default Goat;
