import { ProfileOutlined } from "@ant-design/icons";
import ProductCard from "../../components/common/productCard";
import CarouselScroll from "../../components/ui/CarouselScroll";
import { Pagination } from "antd";
const Home = () => {
  return (
    <>
      <div className="mb-4 mt-1">
        <CarouselScroll />
      </div>
      <div className="min-h"></div>
      <div className="text-3xl flex items-center">
        <ProfileOutlined className="mr-2" />
        <h3 className=" my-2 font-bold ">List Product </h3>
      </div>

      {/* https://lux2-api-dev.lux.vmo.group/api/v1/return-items?page=1&per_page=21&municipalities[]=26 */}
      <ProductCard
        id="any"
        image="https://vmo-lux2-bucket.s3.ap-northeast-1.amazonaws.com/files/huyendn%40vmodev.com/products/1680157803_sunflower-6515860__340_iF87jAIw.jpg"
        title="Hoa "
        price="1230"
        description="is abc"
      />

      <br />
      <Pagination defaultCurrent={1} total={50} />
    </>
  );
};

export default Home;
