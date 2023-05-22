import {
  DeleteOutlined,
  EditOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { InputRef, Card, Input, Popconfirm } from "antd";
import { useState, useRef, CSSProperties, useEffect } from "react";
import { changeEquipments, removeEquipments } from "../../api/equipment";

export interface IFEquipment {
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

  const handleOnOFF = async () => {
    await changeEquipments({ ...item, status: !item.status });
  };
  const handleDelete = async (id: number) => {
    await removeEquipments(id);
  };
  const handleInput = async (value: string) => {
    if (value !== item.name) {
      await changeEquipments({ ...item, name: value });
    }
    setActiveName(true);
  };

  return (
    <>
      {item.status + ""}
      <div style={{ width: 150, height: 160 }}>
        <div
          style={scroll ? styleCard : { display: "none" }}
          className="flex justify-end items-center p-5"
        >
          <Popconfirm
            title="Delete the equipment"
            description="Are you sure to delete this equipment?"
            onConfirm={() => handleDelete(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-4xl" />
          </Popconfirm>
        </div>
        <Card
          hoverable
          title={
            <>
              <div className="flex justify-between items-center">
                {activeName ? (
                  <span>{item.name}</span>
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
                      setName(item.name);
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
            <PoweroffOutlined
              style={item.status ? { color: "greenyellow" } : { color: "red" }}
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
export default EqCard;
