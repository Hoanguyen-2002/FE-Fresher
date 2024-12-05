import { FunctionComponent } from "react";
import { Carousel } from "antd";

interface CarouselItemsProps {
    items: string[]
}

const CarouselItems: FunctionComponent<CarouselItemsProps> = (props) => {
  return (
    <Carousel autoplay speed={500} className={'h-[320px]'}>
      {props.items.map((item, index) => (
        <div
          key={index}
          className={`carousel-slide h-[320px]`}
        >
          <img src={item} className={'w-full h-full object-cover'} alt=""/>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselItems;
