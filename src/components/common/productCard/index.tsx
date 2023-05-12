import { Card, Skeleton } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
import "./index.css";

export interface ProductCard {
  id: any;
  image: string;
  title: string;
  price: string;
  description?: string;
}

const ProductCard = ({ ...product }: ProductCard) => {
  return (
    <>
      <div style={{ width: 260 }}>
        <Link key={product.id} to={`product/${product.id}`}>
          <Card
            hoverable
            loading={false}
            cover={
              <>
                <img src={product.image} />
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
