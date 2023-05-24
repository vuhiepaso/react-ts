import { Card, Skeleton } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
import "./index.css";
import { currencyFormat } from "../../../utils/format";

export interface Product {
  product_id: number;
  page?: number;
  photos: any[];
  name: string;
  price: string;
  describe?: string;
  width?: number | string;
  height?: number | string;
}

const ProductCard = ({ ...product }: Product) => {
  return (
    <>
      <div style={{ width: product.width || 270, height: product.height }}>
        <Link
          key={product.product_id}
          to={`product/${product.page || 1}/${+product.product_id}`}
        >
          <Card
            style={{ height: "100%" }}
            hoverable
            loading={false}
            cover={
              <>
                <img
                  style={{ height: 180, objectFit: "cover" }}
                  src={product.photos[0].url}
                />
                {!product.photos.length && (
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
                title={product.name}
                description={
                  <>
                    <div className="font-bold flex items-center">
                      <span>Price: {currencyFormat(+product.price)} VND</span>
                    </div>
                    <div>{product.describe}</div>
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
