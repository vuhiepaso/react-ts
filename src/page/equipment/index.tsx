import { useEffect, useState } from "react";
import EqCard, { IFEquipment } from "./EqCard";
import { GetEquipments } from "../../api/equipment";
import { Row, Col } from "antd";
import { socket } from "../../api/socketIO";

const Equipment = () => {
  const [equipment, setEquipment] = useState([] as IFEquipment[]);
  useEffect(() => {
    const rq_equipment = async () => {
      const { data: eqmList } = await GetEquipments();
      setEquipment(eqmList.data);
    };
    rq_equipment();
  }, []);
  useEffect(() => {
    function onConnect() {
      console.log("onConnect");
    }

    function onDisconnect() {
      console.log("onDisconnect");
    }

    function onEvents(value: any) {
      setEquipment(value.data);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("onEvents", onEvents);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("onEvents", onEvents);
    };
  }, []);

  return (
    <>
      <div>hiep</div>
      <Row justify="space-between">
        {equipment &&
          equipment.map((item) => (
            <Col className="my-5" key={item.id} span={4}>
              <div className="m-auto w-fit">
                <EqCard {...item} />
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Equipment;
