import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
// css
const Header = styled.div`
  background: #ffe734f7;
  font-size: 25px;
  color: #474747;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
`;
const Shop = styled.div`
  border-bottom: 1px solid #5a5a5a;
  width: 90%;
  margin: 0 auto 20px;
`;

const Img_Photo = styled.img`
  width: 30%;
  height: 30%;
  margin-right: 30px;
  -webkit-backface-visibility: hidden;
`;

const Container_P = styled.div`
  display: flex;
`;

const Name = styled.h2`
  margin-left: 15px;
  cursor: pointer;
  transition: all 0.4s;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 0.5px solid #cecece;
  height: 73px;
`;

const Info = styled.p`
  margin-top: 15px;
  font-size: 15px;
  display: flex;
`;
const InfoTag = styled.span`
  width: 25%;
`;
const Ancker = styled.a`
  background-color: #464545;
  color: #fff;
  padding: 7px 7px;
  border-radius: 10px;
  opacity: 0.7;
  transition: all 0.4s;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const Button = styled.p`
  background-color: #ffe734f7;
  color: #1f1e1e;
  text-align: center;
  align-items: center;
  padding: 10px 10px;
  border-radius: 10px;
  opacity: 0.7;
  width: 20%;
  margin: 30px auto;
  transition: all 0.4s;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
function ShopShow() {
  const dispatch = useDispatch();
  // 選択したshop情報
  const shop_name = useSelector((state) => state.OneShopsReducer.name);
  const shop_logo_image = useSelector(
    (state) => state.OneShopsReducer.logo_image
  );
  const shop_photo_pc_m = useSelector(
    (state) => state.OneShopsReducer.photo_pc_m
  );
  const shop_access = useSelector((state) => state.OneShopsReducer.access);
  const shop_open = useSelector((state) => state.OneShopsReducer.shop_open);
  const shop_url = useSelector((state) => state.OneShopsReducer.url);
  const shop_address = useSelector((state) => state.OneShopsReducer.address);
  return (
    <>
      <Header>お店の詳細</Header>
      <Shop>
        <Container>
          <img src={shop_logo_image} alt="shop_logo" />
          <Name>{shop_name}</Name>
        </Container>
        <Container_P>
          <Img_Photo src={shop_photo_pc_m} alt="shop_photo" />
          <div style={{ margin: "auto 10px", width: "90%" }}>
            <Info>
              <InfoTag>アクセス情報</InfoTag> {shop_access}
            </Info>
            <Info>
              <InfoTag>営業時間</InfoTag> {shop_open}
            </Info>
            <Info>
              <InfoTag>住所</InfoTag> {shop_address}
            </Info>
            <Info>
              <InfoTag />
              <Ancker href={shop_url} target="_blank">
                更に詳しく検索
              </Ancker>
            </Info>
          </div>
        </Container_P>
      </Shop>
      <Button onClick={() => dispatch(push("/"))}>一覧に戻る</Button>
    </>
  );
}

export default ShopShow;
