// お店検索アクション get,remove
export const GET_SHOPS = "GET_SHOPS";
export const get_shopsAction = (Shops) => {
  return {
    type: "GET_SHOPS",
    payload: {
      id: Shops.id,
      name: Shops.name,
      logo_image: Shops.logo_image,
      photo_pc_m: Shops.photo_pc_m,
      access: Shops.access,
      shop_length: Shops.shop_length,
      address: Shops.address,
      shop_open: Shops.shop_open,
      url: Shops.url,
    },
  };
};

export const REMOVE_SHOPS = "REMOVE_SHOPS";
export const remove_shopsAction = () => {
  return {
    type: "REMOVE_SHOPS",
  };
};

// お店詳細 get,remove
export const ONE_SHOP = "ONE_SHOP";
export const one_shopAction = (oneShop) => {
  return {
    type: "ONE_SHOP",
    payload: {
      id: oneShop.id,
      name: oneShop.name,
      logo_image: oneShop.logo_image,
      access: oneShop.access,
      photo_pc_m: oneShop.photo_pc_m,
      address: oneShop.address,
      shop_open: oneShop.shop_open,
      url: oneShop.url,
    },
  };
};

export const REMOVE_ONE_SHOP = "REMOVE_ONE_SHOP";
export const remove_oneShopAction = () => {
  return {
    type: "REMOVE_ONE_SHOP",
  };
};
