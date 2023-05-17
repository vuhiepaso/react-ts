import { Button, Empty, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { currencyFormat } from "../../utils/format";
import {
  MinusOutlined,
  PicLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { removeCart, updateQuantity } from "../../store/sliceProductCart";
import { checkPayment } from "../../api/pay";

const NUM_AC = "1903827*******";

const Cart = () => {
  const carSate = useSelector((state: RootState) => state).card;
  const [total, setTotal] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [codeBill, setCodeBill] = useState("");
  useEffect(() => {
    const totalM = carSate.products.reduce(
      (accumulator, currentValue: ItemProductCart) =>
        accumulator + currentValue.price * currentValue.numberOder,
      0
    );
    setTotal(totalM);
  }, [carSate.products]);
  const handlePay = () => {
    setModalOpen(true);
    const code = "MDH" + Math.floor(Math.random() * 9999999);
    setCodeBill(code);
  };
  const handleCheckPayment = async () => {
    const data = await checkPayment(NUM_AC);
    if (data.message === "success") {
      alert("ok");
    } else {
      alert("fall");
    }
  };
  return (
    <>
      <div style={{ minHeight: 600 }} className="px-5 pt-5">
        <div className="my-10 text-3xl font-bold flex items-center">
          <PicLeftOutlined /> <div className="ml-3">List product in cart</div>
        </div>
        {carSate.products.length ? (
          <div>
            {carSate.products.map((product) => (
              <div key={product.id} className="mb-2">
                <Item {...product} />
              </div>
            ))}
            <div className="mt-10 flex justify-between ">
              <Button
                onClick={() => handlePay()}
                style={{ maxWidth: 380 }}
                type="primary"
                block
              >
                Pay
              </Button>
              <div className="text-3xl flex items-center">
                <span className="font-medium mr-5">Total: </span>
                {currencyFormat(total)} VND
              </div>
            </div>
          </div>
        ) : (
          <Empty className="mt-28" />
        )}
      </div>
      <Modal
        title={codeBill}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={
          <>
            <Button onClick={() => handleCheckPayment()} type="primary">
              Check Payment
            </Button>
          </>
        }
      >
        <img
          src={`https://img.vietqr.io/image/techcombank-${NUM_AC}-print.png?amount=${total}000&addInfo=${codeBill}&accountName=MY EARTH`}
          alt=""
        />
      </Modal>
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
  url: string;
}
const Item = ({ ...productCart }: ItemProductCart) => {
  const [quantity, setQuantity] = useState<number>(productCart.numberOder);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (value: number) => {
    setQuantity(value || 1);
    const data = { ...productCart, numberOder: value || 1 };
    dispatch(updateQuantity(data));
  };
  const handleRemove = () => {
    dispatch(removeCart(productCart));
  };
  return (
    <>
      <div className="flex justify-start items-center">
        <div>
          <Link to={`/${productCart.url}`}>
            <img
              style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: 10,
              }}
              src={productCart.image}
            />
          </Link>
        </div>
        <div
          style={{ lineHeight: 3 }}
          className="flex justify-between items-center w-full"
        >
          <div className="ml-10">
            <Link to={productCart.url}>
              <div className="text-2xl font-bold">{productCart.name}</div>
            </Link>
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
                        onClick={() => handleUpdateQuantity(quantity + 1)}
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
                        onClick={() => handleUpdateQuantity(quantity - 1)}
                        className="cursor-pointer"
                      >
                        <MinusOutlined />
                      </div>
                    )}
                  </>
                }
                value={quantity}
                onChange={(value: any) => handleUpdateQuantity(value)}
              />
            </div>
          </div>
          <div className="text-3xl flex items-center">
            <span className="font-medium mr-5">Price: </span>
            {currencyFormat(productCart.price * productCart.numberOder)} VND
          </div>
          <div>
            <Button onClick={() => handleRemove()} type="primary" danger ghost>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};