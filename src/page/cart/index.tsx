import { Button, InputNumber } from "antd";
import { useState } from "react";
import { currencyFormat } from "../../utils/format";
import { DollarOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const Cart = () => {
  return (
    <>
      <div className="p-5">
        <Item />
      </div>
    </>
  );
};
export default Cart;

export interface ItemProductCart {
  id: string;
  name: string;
  quantity: number;
  numberOder: number;
  price: number;
  image?: string;
}
const productCart: ItemProductCart = {
  id: "5",
  name: "Name Product",
  quantity: 80,
  numberOder: 5,
  price: 100000,
  image:
    "https://cdn.britannica.com/41/129641-050-D30CA107/lightbulb-invention-Thomas-Alva-Edison-1879.jpg",
};

const Item = () => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <>
      <div className="flex justify-start items-center">
        <div>
          <img
            style={{
              width: 150,
              height: 150,
              objectFit: "cover",
              borderRadius: 10,
            }}
            src={productCart.image}
          />
        </div>
        <div
          style={{ lineHeight: 3 }}
          className="flex justify-between items-center w-full"
        >
          <div className="ml-10">
            <div className="text-2xl font-bold">{productCart.name}</div>
            <div className="my-5"></div>
            <div>
              <InputNumber
                style={{ width: 200 }}
                min={1}
                max={productCart.quantity}
                addonBefore={
                  <>
                    {quantity >= productCart.quantity ? (
                      <div className="cursor-not-allowed">
                        <PlusOutlined />
                      </div>
                    ) : (
                      <div
                        onClick={() => setQuantity(quantity + 1)}
                        className="cursor-pointer"
                      >
                        <PlusOutlined />
                      </div>
                    )}
                  </>
                }
                addonAfter={
                  <>
                    {quantity <= 1 ? (
                      <div className="cursor-not-allowed">
                        <MinusOutlined />
                      </div>
                    ) : (
                      <div
                        onClick={() => setQuantity(quantity - 1)}
                        className="cursor-pointer"
                      >
                        <MinusOutlined />
                      </div>
                    )}
                  </>
                }
                value={quantity || 1}
                onChange={(value: any) => setQuantity(value)}
              />
            </div>
          </div>
          <div className="text-3xl flex items-center">
            <span className="font-medium mr-5">Price: </span>
            {currencyFormat(productCart.price)}
            <DollarOutlined className="ml-2" />
          </div>
          <div>
            <Button type="primary" danger ghost>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
