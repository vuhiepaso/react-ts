import { Card, Skeleton } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
import "./index.css";

export interface Product {
  id: any;
  page?: number;
  image: string;
  title: string;
  price: string;
  description?: string;
  width?: number | string;
  height?: number | string;
}

const ProductCard = ({ ...product }: Product) => {
  return (
    <>
      <div style={{ width: product.width || 270, height: product.height }}>
        <Link
          key={product.id}
          to={`product/${product.page || 1}/${+product.id}`}
        >
          <Card
            style={{ height: "100%" }}
            hoverable
            loading={false}
            cover={
              <>
                <img
                  style={{ height: 180, objectFit: "cover" }}
                  src={product.image}
                />
                {!product.image && (
                  <Skeleton.Image
                    className="w-full skeleton__image"
                    active={true}
                  />
                )}
              </>
            }
          >
            <div>
              <Meta
                title={product.title}
                description={
                  <>
                    <div className="font-bold flex items-center">
                      <span>Price: {product.price} </span>{" "}
                      <DollarOutlined className="px-1" />
                    </div>
                    <div>{product.description}</div>
                  </>
                }
              />
            </div>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
