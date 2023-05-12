import React from "react";
import { Carousel } from "antd";

const carousels = [
  {
    id: 1,
    image:
      "https://news.umanitoba.ca/wp-content/uploads/2020/10/Career-Month-Job-Posting-centre.jpg",
  },
  {
    id: 2,
    image:
      "https://designbuffs.com/wp-content/uploads/2020/02/linkedin-carousel-posts_d6a0e33a5d3a19e802e9091ebaed37c7_2000.png",
  },
  {
    id: 3,
    image:
      "https://resources.workable.com/wp-content/uploads/2018/06/linkedin_job_posting2x-1.png",
  },
  {
    id: 4,
    image:
      "https://www.apollotechnical.com/wp-content/uploads/2020/10/how-to-write-a-job-posting.jpg",
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
