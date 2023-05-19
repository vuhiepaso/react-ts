import React from "react";
import { Carousel } from "antd";

const carousels = [
  {
    id: 1,
    image:
      "https://thumbs.dreamstime.com/b/banner-edison-lamps-hanging-ceiling-vintage-style-light-bulbs-decorating-room-loft-design-background-antique-electronic-235554725.jpg",
  },
  {
    id: 2,
    image:
      "https://www.lightstyleoftampabay.com/wp-content/uploads/2016/10/elan-HP-Banner.jpg",
  },
  {
    id: 3,
    image: "https://crystalline.se/userfiles/image/banner-39.jpg",
  },
  {
    id: 4,
    image: "https://d3l97e4uq59tzn.cloudfront.net/images/b_lamps_banner.jpg",
  },
];

const CarouselScroll: React.FC = () => (
  <Carousel autoplay>
    {carousels.map((item, index) => (
      <div key={"carousel" + index}>
        <img
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
          src={item.image}
        />
      </div>
    ))}
  </Carousel>
);
export default CarouselScroll;
