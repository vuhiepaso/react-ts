import {
  Button,
  Col,
  Empty,
  InputNumber,
  Modal,
  Row,
  Steps,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { currencyFormat } from "../../utils/format";
import {
  FileDoneOutlined,
  MinusOutlined,
  PicLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  removeAll,
  removeCart,
  updateQuantity,
} from "../../store/sliceProductCart";
import { checkPayment } from "../../api/pay";

const NUM_AC = "1903827*******";
const localBill = JSON.parse(
  localStorage.getItem("listBill") + "" || ""
) as infoBill[];
const Cart = () => {
  const carSate = useSelector((state: RootState) => state).card;
  const [total, setTotal] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenBill, setModalOpenBill] = useState(false);
  const [codeBill, setCodeBill] = useState("");
  const [listBill, setListBill] = useState(localBill || ([] as infoBill[]));
  const dispatch = useAppDispatch();
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

  const ondOrder = () => {
    setModalOpenBill(true);
    const code = "MDH" + Math.floor(Math.random() * 9999999);
    setCodeBill(code);
  };

  const handleOrder = (paid?: boolean) => {
    const data = billList();
    const listNamePr = [] as string[];
    data.forEach((e: any) => listNamePr.push(e.name));
    const listValue: infoBill[] = [
      {
        code: codeBill,
        total,
        status: paid ? "Paid" : "Unpaid",
        products: listNamePr,
        current: 0,
      },
      ...listBill,
    ];
    setListBill(listValue);
    if (listValue.length > 4) {
      listValue.pop();
    }
    localStorage.setItem("listBill", JSON.stringify(listValue));
    //   API Order
    dispatch(removeAll());
  };

  const handleCheckPayment = async () => {
    const data = await checkPayment(NUM_AC);
    if (data.message === "success") {
      handleOrder(true);
      alert("ok");
    } else {
      alert("fail");
    }
  };
  const billList = () => {
    const list: any = [];
    carSate.products.forEach((prd, index) => {
      list.push({
        ...prd,
        key: "cl" + index,
        price: currencyFormat(prd.price),
        intoMoney: (
          <>
            <div>
              {currencyFormat(prd.price)} x {prd.numberOder}
              {" ="}{" "}
              <span className="font-bold">
                {currencyFormat(prd.price * prd.numberOder) + " VND"}
              </span>
            </div>
            <div></div>
          </>
        ),
      });
    });
    return list;
  };
  return (
    <>
      <div style={{ minHeight: 600 }} className="px-5 pt-5">
        <Row className="mt-10 ">
          <Col flex={4}>
            <div className="text-3xl mb-12 font-bold flex items-center">
              <PicLeftOutlined />{" "}
              <div className="ml-3">List product in cart</div>
            </div>
            {carSate.products.length ? (
              <div>
                {carSate.products.map((product) => (
                  <div key={product.id} className="mb-2">
                    <Item {...product} />
                  </div>
                ))}
                <div className="mt-10 flex justify-between ">
                  <div className="w-1/2">
                    <div className="mb-2">
                      <Button
                        onClick={() => handlePay()}
                        style={{ maxWidth: 200 }}
                        type="primary"
                        block
                      >
                        Pay now
                      </Button>
                    </div>
                    <Button
                      onClick={() => ondOrder()}
                      style={{ maxWidth: 200 }}
                      type="primary"
                      block
                    >
                      Order
                    </Button>
                  </div>

                  <div className="text-2xl flex items-center">
                    <span className="font-medium mr-5">Total: </span>
                    {currencyFormat(total)} VND
                  </div>
                </div>
              </div>
            ) : (
              <Empty className="mt-28" />
            )}
          </Col>
          <Col flex={1}>
            <div className="pl-20">
              <div className="text-3xl font-bold mb-20 flex items-center">
                <FileDoneOutlined /> Status Order
              </div>
              {listBill.length ? (
                listBill.map((bill, index) => (
                  <ItemStatusBill
                    key={"bill" + index}
                    {...bill}
                    // current={index} ///test
                  />
                ))
              ) : (
                <Empty className="mt-28" />
              )}
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        title={"Code: " + codeBill}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        width={800}
        footer={
          <>
            <Button onClick={() => handleCheckPayment()} type="primary">
              Check Payment
            </Button>
          </>
        }
      >
        <Row>
          <Col span={12}>
            <div className="py-5">
              <Table
                footer={() => (
                  <>
                    <div className="text-xl">
                      Total: {currencyFormat(total)} VND
                    </div>
                  </>
                )}
                pagination={false}
                dataSource={billList()}
                columns={[
                  {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Unit Price(VND) x Quantity",
                    dataIndex: "intoMoney",
                    key: "intoMoney",
                  },
                ]}
              />
            </div>
          </Col>
          <Col span={12}>
            <img
              src={`https://img.vietqr.io/image/techcombank-${NUM_AC}-print.png?amount=${total}000&addInfo=${codeBill}&accountName=MY EARTH`}
              alt=""
            />
          </Col>
        </Row>
      </Modal>
      <Modal
        title={"Code: " + codeBill}
        open={isModalOpenBill}
        onCancel={() => setModalOpenBill(false)}
        footer={
          <>
            <Button
              onClick={() => {
                handleOrder(), setModalOpenBill(false);
              }}
              type="primary"
            >
              Order
            </Button>
          </>
        }
      >
        <div className="py-5">
          <Table
            footer={() => (
              <>
                <div className="text-xl">
                  Total: {currencyFormat(total)} VND
                </div>
              </>
            )}
            pagination={false}
            dataSource={billList()}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Unit Price(VND)  x  Quantity",
                dataIndex: "intoMoney",
                key: "intoMoney",
              },
            ]}
          />
        </div>
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
            <div className=" my-1 text-xl flex items-center">
              <span className="font-medium mr-5">Price: </span>
              {currencyFormat(productCart.price * productCart.numberOder)} VND
            </div>
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

interface infoBill {
  code: string;
  total: number;
  status: "Paid" | "Unpaid";
  products: string[];
  current: number | undefined;
}
const ItemStatusBill = ({ ...infoBill }: infoBill) => {
  return (
    <>
      <div className="text-xl font-bold my-2 ">
        <Tooltip
          placement="top"
          title={
            <>
              <div>Code: {infoBill.code}</div>
              <div>Total: {currencyFormat(infoBill.total)} </div>
              <div>Status: {infoBill.status}</div>
              <div>
                Product: {infoBill.products.map((product) => product + " ")}
              </div>
            </>
          }
        >
          Bill: {infoBill.products[0]}
        </Tooltip>
      </div>

      <Steps
        current={infoBill.current}
        items={[
          {
            title: "Store",
            description: "Waiting for order confirmation",
          },
          {
            title: "Delivery",
            description: "Staff is on the way to transport",
          },
          {
            title: "Finished",
          },
        ]}
      />
    </>
  );
};
