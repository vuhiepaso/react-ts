import { useState } from "react";
import { Col, Image, Row } from "antd";
const ProductDetail = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="container p-16">
        <Row>
          <Col flex={2}>
            <Image
              preview={{ visible: false }}
              width={200}
              src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
              onClick={() => setVisible(true)}
            />

            <div style={{ display: "none" }}>
              <Image.PreviewGroup
                preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
              >
                <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
              </Image.PreviewGroup>
            </div>
          </Col>
          <Col flex={1}>
            <div>Name Product:</div>
            <div>Price: </div>
            <div>Describe: </div>
            <div>Quantity: </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ProductDetail;
