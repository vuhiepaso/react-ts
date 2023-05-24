import { ProfileOutlined } from "@ant-design/icons";
import { Col, Pagination, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";

import ProductCard, { Product } from "../../components/common/productCard";
import CarouselScroll from "../../components/ui/CarouselScroll";
import { listProduct } from "../../api/product";

interface Products {
  listData?: Product[] | undefined;
  loading?: boolean;
  page?: number;
}
const Home = () => {
  const [products, setProducts] = useState<Products>({});

  useEffect(() => {
    setProducts((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const productList = async () => {
      const { data } = await listProduct(products.page || 1, 0);
      setProducts((prevState) => ({
        ...prevState,
        loading: false,
        listData: data.value,
      }));
    };
    productList();
  }, [products.page]);
  const changePage = (page: number) => {
    setProducts((prevState) => ({
      ...prevState,
      page,
    }));
  };
  return (
    <>
      <div className="mb-4 mt-1">
        <CarouselScroll />
      </div>

      <div className="min-h px-2">
        <div className="text-2xl flex items-center">
          <ProfileOutlined className="mr-2" />
          <h3 className=" my-2 font-bold ">List Product </h3>
        </div>

        {/* https://lux2-api-dev.lux.vmo.group/api/v1/return-items?page=1&per_page=21&municipalities[]=26 */}
        <Skeleton loading={products.loading}>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24 },
              { xs: 8, sm: 16, md: 24 },
            ]}
          >
            {products.listData?.map((product, index) => (
              <Col span={4} xs={12} md={6} xl={4} key={index}>
                <ProductCard
                  page={products.page}
                  width={"100%"}
                  height={"100%"}
                  {...product}
                />
              </Col>
            ))}
          </Row>
        </Skeleton>
        <br />
        <Pagination defaultCurrent={1} total={20} onChange={changePage} />
      </div>
    </>
  );
};

export default Home;
