import { useEffect, useRef, useState } from "react";
import {
  Button,
  Carousel,
  Col,
  Image,
  InputNumber,
  Row,
  Skeleton,
  message,
} from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { currencyFormat } from "../../utils/format";
import { useNavigate, useParams } from "react-router-dom";
import { listProduct } from "../../api/product";
import { RootState, useAppDispatch } from "../../store";
import { addToCart } from "../../store/sliceProductCart";
import { ItemProductCart } from "../cart";
import { useSelector } from "react-redux";
export interface IFProductDetail {
  id: string;
  nameProduct: string;
  price: number;
  quantity: number;
  describe: string;
  images: string[];
}
const images = [
  "https://juliettesinteriors.co.uk/wp-content/uploads/2019/09/exclusive-gold-leaf-italian-wall-lamp-1.jpg",
  "https://cdn.shopify.com/s/files/1/0549/3948/4207/products/ChristmasLight_RoseLamp2.jpg?v=1638198915",
  "https://cdn.shopify.com/s/files/1/0550/0970/6207/collections/Waterford_Crystal_Crystal_Lamps.jpg?v=1642600348",
];

const ProductDetail = () => {
  const [visible, setVisible] = useState(false);
  const refCarousel = useRef<CarouselRef>(null);
  const [quantity, setQuantity] = useState(0);
  const [productData, setProductData] = useState<IFProductDetail>(
    {} as IFProductDetail
  );
  const state = useSelector((state: RootState) => state).auth;
  const image = productData.images ? productData.images[0] : "";
  const [imageDefault, setImageDefault] = useState(image);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { page, product_id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const handleAddToCart = () => {
    if (state.isAuth) {
      const data: ItemProductCart = {
        id: productData.id,
        name: productData.nameProduct,
        quantity: productData.quantity,
        numberOder: quantity,
        price: productData.price,
        image: productData.images?.length ? productData.images[0] : undefined,
        url: `product/${page}/${product_id}`,
      };
      dispatch(addToCart(data));
      setQuantity(0);
      messageApi.open({
        type: "success",
        content: "Add to cart success",
      });
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    const productList = async () => {
      let pageID = page ? +page : 1;
      if (isNaN(pageID)) {
        pageID = 1;
      }
      setLoading(true);
      const {
        data: { product },
      } = await listProduct(pageID, 0);
      setLoading(false);
      if (product_id) {
        const index = product.findIndex(
          (prd: IFProductDetail) => prd.id === product_id
        );
        // const value = product[index];
        // const value = product[+product_id - 1];

        const { description, image, price, title, id, quantity } =
          product[index];
        const customValue: IFProductDetail = {
          id,
          nameProduct: title,
          price: +price,
          quantity: quantity,
          describe: description,
          images: [image, ...images],
        };
        setProductData(customValue);
      }
    };
    productList();
  }, []);

  return (
    <>
      <div className="container p-16">
        {contextHolder}
        <Skeleton loading={loading} avatar paragraph={{ rows: 4 }}>
          <Row>
            <Col>
              <Image
                style={{ width: 500, height: 500, objectFit: "cover" }}
                preview={{ visible: false }}
                src={imageDefault || image}
                onClick={() => setVisible(true)}
              />

              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  {productData.images?.map((url: string, index) => (
                    <Image key={"image" + index} src={url} />
                  ))}
                </Image.PreviewGroup>
              </div>

              <div style={{ width: 500 }}>
                {productData.images && productData.images.length <= 3 ? (
                  <></>
                ) : (
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
                        productData.images
                          ? productData.images[currentSlide]
                          : ""
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
                )}
              </div>
            </Col>
            <Col flex={12}>
              <div style={{ maxWidth: "600px" }} className="p-10 mt-20 ">
                <div className="text-3xl font-bold">
                  {/* NAME PRODUCT */}
                  {productData.nameProduct}
                </div>
                <div className="flex text-xl leading-10 ">
                  <div className="font-bold">
                    <div>Price: </div>
                    <div>Quantity: </div>
                    <div>Describe: </div>
                  </div>
                  <div className="mx-5"></div>
                  <div style={{ width: 300 }}>
                    <div className="flex items-center">
                      <div className="px-2">
                        {currencyFormat(productData.price)}
                      </div>
                      VND
                    </div>
                    <div>
                      <InputNumber
                        min={0}
                        max={productData.quantity}
                        defaultValue={0}
                        value={quantity}
                        onChange={(value) => setQuantity(value || 0)}
                      />
                    </div>
                    <div className="truncate-line-3">
                      {productData.describe}
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <div className="text-xl mb-2 font-normal"> Overview</div>
                  <ul>
                    <li>Overall Dimensions: 11W x 15D x 64 - 69.5H in.</li>
                    <li>Shade dimensions: 6.5W x 13.5H in.</li>
                    <li>Blackened bronze finish</li>
                    <li>Cylindrical perforated metal shade</li>
                    <li>Foot switch</li>
                    <li>
                      Requires one T185 110V LED Edison bulb (not included)
                    </li>
                  </ul>
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
        </Skeleton>
      </div>
    </>
  );
};
export default ProductDetail;
