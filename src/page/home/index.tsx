import { ProfileOutlined } from "@ant-design/icons";
import { Col, Pagination, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";

import ProductCard, { Product } from "../../components/common/productCard";
import CarouselScroll from "../../components/ui/CarouselScroll";
import { listProduct } from "../../api/product";

interface Products {
  listData?: Product[] | undefined;
  loading?: boolean;
}
const Home = () => {
  const [products, setProducts] = useState<Products>({});

  useEffect(() => {
    setProducts((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const productList = async () => {
      const { data } = await listProduct(1, 8);
      setProducts({ loading: false, listData: data.product });
    };
    productList();
  }, []);

  return (
    <>
      <div className="mb-4 mt-1">
        <CarouselScroll />
      </div>

      <div className="min-h px-16">
        <div className="text-2xl flex items-center">
          <ProfileOutlined className="mr-2" />
          <h3 className=" my-2 font-bold ">List Product </h3>
        </div>

        {/* https://lux2-api-dev.lux.vmo.group/api/v1/return-items?page=1&per_page=21&municipalities[]=26 */}
        <Skeleton loading={products.loading}>
          <Row gutter={[24, 24]}>
            {products.listData?.map((product, index) => (
              <Col span={4} key={index}>
                <ProductCard width={"100%"} height={"100%"} {...product} />
              </Col>
            ))}
          </Row>
        </Skeleton>
        <br />
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </>
  );
};

export default Home;
