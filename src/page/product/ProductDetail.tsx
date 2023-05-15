import { useRef, useState } from "react";
import { Button, Carousel, Col, Image, InputNumber, Row } from "antd";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { currencyFormat } from "../../utils/format";
export interface IFProductDetail {
  id?: any;
  nameProduct: string;
  price?: number;
  quantity?: number;
  describe?: string;
  images?: string[];
}
const productDataTest: IFProductDetail = {
  id: "555",
  nameProduct: "This is Name Product",
  price: 10000,
  quantity: 20,
  describe: "Is describe  ",
  images: [
    "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
  ],
};
const ProductDetail = () => {
  const [visible, setVisible] = useState(false);
  const refCarousel = useRef<CarouselRef>(null);
  const [quantity, setQuantity] = useState(0);
  const [productData, setProductData] =
    useState<IFProductDetail>(productDataTest);

  const image = productData.images ? productData.images[0] : "";
  const [imageDefault, setImageDefault] = useState(image);

  const handleAddToCart = () => {
    const data = { ...productData, quantity };
    console.log("data", data);
  };

  return (
    <>
      <div className="container p-16">
        <Row>
          <Col>
            <Image
              style={{ width: 500, height: 500, objectFit: "cover" }}
              preview={{ visible: false }}
              src={imageDefault}
              onClick={() => setVisible(true)}
            />

            <div style={{ display: "none" }}>
              <Image.PreviewGroup
                preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
              >
                {productData.images?.map((url: string, index) => (
                  <Image key={"image" + index} src={url} />
                ))}
              </Image.PreviewGroup>
            </div>

            <div style={{ width: 500 }}>
              <Carousel
                ref={refCarousel}
                autoplay
                dots={false}
                infinite={true}
                slidesToShow={3}
                slidesToScroll={1}
                arrows={true}
                afterChange={(currentSlide) => {
                  setImageDefault(
                    productData.images ? productData.images[currentSlide] : ""
                  );
                }}
                nextArrow={
                  <>
                    <div
                      style={{ color: "white" }}
                      className="right-0 absolute z-10 top-14 text-white"
                    >
                      <RightCircleOutlined
                        onClick={() => {
                          refCarousel.current?.next();
                        }}
                        className="text-xl"
                      />
                    </div>
                  </>
                }
                prevArrow={
                  <>
                    <div
                      style={{ color: "white" }}
                      className="absolute z-10  top-14 text-white"
                    >
                      <LeftCircleOutlined
                        onClick={() => {
                          refCarousel.current?.prev();
                        }}
                        className="text-xl"
                      />
                    </div>
                  </>
                }
              >
                {productData.images?.map((url: string, index) => (
                  <div
                    key={"carouselImage" + index}
                    // onClick={() => setImageIndex(images[index])}
                  >
                    <img
                      style={{
                        height: "160px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={url}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col flex={12}>
            <div style={{ maxWidth: "600px" }} className="p-10 mt-20 ">
              <div className="flex text-xl leading-10 ">
                <div className="font-bold">
                  <div className="text-2xl">Name Product:</div>
                  <div>Price: </div>
                  <div>Quantity: </div>
                  <div>Describe: </div>
                </div>
                <div className="mx-5"></div>
                <div style={{ width: 300 }}>
                  <div className="text-2xl truncate">
                    {productData.nameProduct}
                  </div>
                  <div className="flex items-center">
                    <div>{currencyFormat(productData.price || 0)}</div>
                    <DollarOutlined className="px-2" />
                  </div>
                  <div>
                    <InputNumber
                      min={0}
                      max={productData.quantity}
                      defaultValue={0}
                      onChange={(value) => setQuantity(value || 0)}
                    />
                  </div>
                  <div className="truncate-line-3">{productData.describe}</div>
                </div>
              </div>
              <div className="mt-10">
                <Button
                  onClick={() => handleAddToCart()}
                  disabled={!quantity}
                  type="primary"
                  block
                >
                  Add to Cart
                </Button>
                {/* <div className="my-2"></div>
                <Button type="primary" block>
                  Pay now
                </Button> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ProductDetail;
