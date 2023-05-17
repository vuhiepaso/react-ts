import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Card, Input, InputRef } from "antd";
import { CSSProperties, useRef, useState } from "react";

const Equipment = () => {
  return (
    <>
      <div className="p-5">
        <EqCard id={2} name="Equipment" status={false} />
      </div>
    </>
  );
};

export default Equipment;
interface IFEquipment {
  id: number;
  id_user?: number;
  name: string;
  isActive?: boolean;
  status: boolean;
}
const EqCard = ({ ...item }: IFEquipment) => {
  const [scroll, setScroll] = useState(false);
  const [activeName, setActiveName] = useState(true);
  const inputRef = useRef<InputRef>(null);

  const [name, setName] = useState(item.name);
  const [status, setStatus] = useState(item.status);

  const handleOnOFF = () => {
    setStatus(!status);
    console.log("s", status);
  };
  const handleDelete = (id: number) => {
    console.log("id", id);
  };
  const handleInput = (value: any) => {
    setActiveName(true);
    console.log(value);
  };

  return (
    <>
      <div style={{ width: 150, height: 160 }}>
        <div
          style={scroll ? styleCard : { display: "none" }}
          className="flex justify-end items-center p-5"
        >
          <DeleteOutlined
            onClick={() => {
              handleDelete(item.id);
            }}
            className="text-4xl"
          />
        </div>
        <Card
          hoverable
          title={
            <>
              <div className="flex justify-between items-center">
                {activeName ? (
                  <span>{name}</span>
                ) : (
                  <Input
                    onBlur={({ target }) => handleInput(target.value)}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Name "
                    value={name}
                    ref={inputRef}
                  />
                )}

                {activeName && (
                  <EditOutlined
                    onClick={() => {
                      setActiveName(false);
                      setTimeout(() => {
                        inputRef.current!.focus({
                          cursor: "all",
                        });
                      }, 0);
                    }}
                  />
                )}
              </div>
            </>
          }
          bordered={false}
          style={{ width: 150, height: 160 }}
        >
          <div onClick={() => setScroll(!scroll)}>
            {scroll ? (
              <CaretLeftOutlined className="absolute z-10 right-0" />
            ) : (
              <CaretRightOutlined className="absolute z-10 right-0" />
            )}
          </div>

          <div className="flex justify-between items-end">
            <LoginOutlined
              style={status ? { color: "greenyellow" } : { color: "red" }}
              onClick={() => handleOnOFF()}
              className="text-5xl"
            />
            <div>ID: {item.id}</div>
          </div>
        </Card>
      </div>
    </>
  );
};

const styleCard: CSSProperties = {
  backgroundColor: "rgb(204 204 204 / 20%)",
  position: "absolute",
  borderRadius: 8,
  color: "red",
  width: 220,
  height: "inherit",
  // zIndex: 20,
};
