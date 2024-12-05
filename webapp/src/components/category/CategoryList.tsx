import { Card, Flex, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getAllCategoryList } from "../../api/categories";
import { TCategoryListItem } from "../../types/category";
import { LoadingOutlined } from "@ant-design/icons";
import CategoryCard from "./CategoryCard";
import { FaBookOpen, FaBookQuran, FaBook } from "react-icons/fa6";
import {
  GiBookshelf,
  GiBookmark,
  GiBookCover,
  GiBookPile,
} from "react-icons/gi";
import { RiBookMarkedFill } from "react-icons/ri";
import { PiBooksBold, PiBookOpenUser } from "react-icons/pi";
import { AiFillBook } from "react-icons/ai";
import { SiGitbook, SiBookstack, SiHatenabookmark } from "react-icons/si";
import { TbBookDownload } from "react-icons/tb";

const COLORS = [
  "#A8E6CF", // Xanh mint nhạt
  "#FFD1DC", // Hồng phấn nhạt
  "#FFF9C4", // Vàng nhạt
  "#D7BDE2", // Tím lavender nhạt
  "#B3E5FC", // Xanh da trời nhạt
  "#FFB7B2", // Hồng đào
  "#FFDAB9", // Cam pastel
  "#FFECB3", // Vàng pastel
  "#C3E5AE", // Xanh pastel
  "#D7CFE2", // Tím pastel nhạt
  "#CFE0E8", // Xám xanh pastel
  "#E6E0D4", // Xám be nhạt
  "#F6EAE9", // Hồng nhạt khói
  "#D9C5B2", // Nâu nhạt
  "#E2E8D6", // Xanh olive nhạt
];

const BOOK_ICONS = [
  <FaBookOpen />,
  <FaBook />,
  <FaBookQuran />,
  <GiBookshelf />,
  <GiBookmark />,
  <GiBookCover />,
  <RiBookMarkedFill />,
  <PiBooksBold />,
  <PiBookOpenUser />,
  <AiFillBook />,
  <SiGitbook />,
  <TbBookDownload />,
  <SiBookstack />,
  <GiBookPile />,
  <SiHatenabookmark />,
];

const CategoryList = () => {
  const [data, setData] = useState<TCategoryListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data: TCategoryListItem[] | null = await getAllCategoryList();
      if (data) setData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
      </div>
    );

  const genColorCode = (index: number) => {
    return COLORS[index % COLORS.length];
  };

  const genIcon = (index: number): React.ReactElement => {
    return BOOK_ICONS[index % BOOK_ICONS.length];
  };

  return (
    <div className="hidden sm:block">
      <Card
        title={
          <div className="flex gap-2">
            <img
              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu_red.svg"
              alt=""
            />
            <span className="text-xl text-black-1 font-bold">
              Danh mục sản phẩm
            </span>
          </div>
        }
        bordered={false}
      >
        <div className="grid grid-cols-3 lg:grid-cols-9 gap-2">
          {data.map((category, index) => (
            <CategoryCard
              key={category.categoryId}
              data={{
                ...category,
                color: genColorCode(index),
                icon: genIcon(index),
              }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CategoryList;
