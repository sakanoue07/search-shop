import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { one_shopAction } from "../redux/shops/actions";
import { push } from "connected-react-router";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// 検索エラー
const ErrorSearch = () => {
  toast.error("これ以上はありません", {
    hideProgressBar: true,
    transition: Zoom,
    draggable: true,
    position: toast.POSITION.TOP_CENTER,
  });
};
// css
const Div = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Img_Photo = styled.img`
  transition: all 0.4s;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Name = styled.h2`
  margin-left: 15px;
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Num = styled.p`
  text-align: right;
  align-items: center;
  margin-bottom: 30px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 0.5px solid #cecece;
  height: 73px;
`;

const Access = styled.p`
  margin-top: 10px;
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
function Shops({ reload }) {
  // loadIndex: 一度に読み込むshop数 isEnpty: buttonのdisable
  const [loadIndex, setLoadIndex] = useState(10);
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch = useDispatch();

  // shops全ての情報の取得
  const shops_id = useSelector((state) => state.ShopsReducer.id);
  const shops_name = useSelector((state) => state.ShopsReducer.name);
  const shops_logo_image = useSelector(
    (state) => state.ShopsReducer.logo_image
  );
  const shops_photo_pc_m = useSelector(
    (state) => state.ShopsReducer.photo_pc_m
  );
  const shops_access = useSelector((state) => state.ShopsReducer.access);
  const shops_length = useSelector((state) => state.ShopsReducer.shop_length);
  const shops_open = useSelector((state) => state.ShopsReducer.shop_open);
  const shops_url = useSelector((state) => state.ShopsReducer.url);
  const shops_address = useSelector((state) => state.ShopsReducer.address);

  // 再検索されるとloadIndex,isEmptyを初期値に戻す
  useEffect(() => {
    console.log(reload);
    setIsEmpty(false);
    setLoadIndex(10);
  }, [reload]);

  // 更に表示ボタン
  const displayMore = () => {
    if (loadIndex < shops_length) {
      if (loadIndex + 10 > shops_length) {
        setIsEmpty(true);
      }
      setLoadIndex(loadIndex + 10);
    } else if (loadIndex > shops_length) {
      setIsEmpty(true);
      dispatch(ErrorSearch);
    }
  };
  return (
    <Div>
      <Num>{shops_length}件あります</Num>
      {(() => {
        let all_shop = [];
        for (let i = 0; i < shops_length; i++) {
          all_shop.push(
            <Grid
              item
              xs={10}
              sm={6}
              md={6}
              key={shops_id[i]}
              style={{
                borderBottom: "1px solid #5a5a5a",
                marginBottom: "20px",
              }}
            >
              <Container>
                <img src={shops_logo_image[i]} alt="shop_logo" />
                <Name
                  onClick={() => {
                    dispatch(
                      one_shopAction({
                        id: shops_id[i],
                        name: shops_name[i],
                        logo_image: shops_logo_image[i],
                        access: shops_access[i],
                        photo_pc_m: shops_photo_pc_m[i],
                        address: shops_address[i],
                        shop_open: shops_open[i],
                        url: shops_url[i],
                      })
                    );
                    dispatch(push("/show"));
                  }}
                >
                  {shops_name[i]}
                </Name>
              </Container>
              <Img_Photo
                src={shops_photo_pc_m[i]}
                alt="shop_photo"
                onClick={() => {
                  dispatch(
                    one_shopAction({
                      id: shops_id[i],
                      name: shops_name[i],
                      logo_image: shops_logo_image[i],
                      access: shops_access[i],
                      photo_pc_m: shops_photo_pc_m[i],
                      address: shops_address[i],
                      shop_open: shops_open[i],
                      url: shops_url[i],
                    })
                  );
                  dispatch(push("/show"));
                }}
              />
              <Access>アクセス情報 : {shops_access[i]}</Access>
            </Grid>
          );
        }
        return (
          <>
            <Grid container spacing={2}>
              {all_shop.slice(0, loadIndex).map((shop) => shop)}
            </Grid>
            {shops_length ? (
              <Button
                disabled={isEmpty ? true : false}
                onClick={displayMore}
                variant="contained"
              >
                さらに表示
              </Button>
            ) : (
              <></>
            )}
          </>
        );
      })()}
    </Div>
  );
}

export default Shops;
