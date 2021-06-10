import React, { useState } from "react";
import axios from "axios";
import Shops from "./Shops";
import { get_shopsAction } from "../redux/shops/actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// 検索エラーポップ
const ErrorRange = () => {
  toast.error("範囲を指定してください", {
    hideProgressBar: true,
    transition: Zoom,
    draggable: true,
    position: toast.POSITION.TOP_CENTER,
  });
};
const NoneShops = () => {
  toast.error("この辺りにはお店がありません", {
    hideProgressBar: true,
    transition: Zoom,
    draggable: true,
    position: toast.POSITION.TOP_CENTER,
  });
};
// style/css
const Nabvar = styled.div`
  background: #ffe734f7;
  color: #7e7772;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
`;

const Logo = styled.div`
  font-family: "Caveat", cursive;
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`;

const Button = styled.p`
  background-color: #7e7772;
  color: #fff;
  text-align: center;
  padding: 10px 10px;
  border-radius: 10px;
  opacity: 0.7;
  width: 20%;
  transition: all 0.4s;
  &:hover {
    opacity: 1;
    color: #7e7772;
    background-color: #fff;
    cursor: pointer;
  }
`;

const Select = styled.select`
  background-color: #fff;
  color: #7e7772;
  text-align: center;
  padding: 10px 10px;
  border-radius: 10px;
  width: 15%;
  cursor: pointer;
`;
function Search() {
  // range 半径 reload 検索ボタンを押したか
  const [range, setRange] = useState("");
  const [reload, setLeload] = useState(false);
  const dispatch = useDispatch();
  //現在位置取得、非同期処理
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // 現在地よりお店の情報取得
  const getLatLon = async () => {
    let pos = await getCurrentPosition();
    await axios
      .post(
        "/api/v1/search",
        {
          // lat: 緯度,lon: 経度
          loca: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            range: range,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.results.shop);
        console.log(res.data.results);
        // reloadされたか？
        setLeload((prev) => !prev);
        // reduxActionsに情報を渡す
        if (range == "") {
          dispatch(ErrorRange);
        } else if (res.data.results.results_returned == 0) {
          dispatch(NoneShops);
        } else {
          dispatch(
            get_shopsAction({
              id: res.data.results.shop.map((shop) => shop.id),
              name: res.data.results.shop.map((shop) => shop.name),
              logo_image: res.data.results.shop.map((shop) => shop.logo_image),
              photo_pc_m: res.data.results.shop.map((shop) => shop.photo.pc.m),
              access: res.data.results.shop.map((shop) => shop.access),
              shop_length: res.data.results.shop.length,
              address: res.data.results.shop.map((shop) => shop.address),
              url: res.data.results.shop.map((shop) => shop.urls.pc),
              shop_open: res.data.results.shop.map((shop) => shop.open),
            })
          );
        }

        // console.log(shops);
      })
      .catch((e) => e);
  };
  return (
    <>
      <Nabvar>
        <Logo>グルメサーチ</Logo>
        <Button onClick={() => getLatLon()}>お店を検索</Button>
        <Select
          defaultValue={"DEFAULT"}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Choose a range ...
          </option>
          <option value="1">300m圏内</option>
          <option value="2">500m圏内</option>
          <option value="3">1000m圏内</option>
          <option value="4">2000m圏内</option>
          <option value="5">3000m圏内</option>
        </Select>
      </Nabvar>
      <Shops reload={reload} />
    </>
  );
}

export default Search;
