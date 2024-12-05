import React from "react";
import { formatCategory } from "../../utils/formatText";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFilteredCategories } from "../../store/category/categorySlice";

const StyledIconWrapper = ({
  data,
}: {
  data: {
    size: number;
    color: string;
    icon: React.ReactElement;
  };
}) => {
  const StyledIcon = React.cloneElement(data.icon, {
    size: data.size || 24,
    color: data.color || "#000",
  });
  return <div>{StyledIcon}</div>;
};

const CategoryCard = ({
  data,
}: {
  data: {
    categoryId: string;
    name: string;
    color: string;
    icon: React.ReactElement;
  };
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectCategory = (id: string) => {
    dispatch(addFilteredCategories(id));
    navigate("/books");
  };

  return (
    <div
      className="flex flex-col min-w-4 cursor-pointer"
      onClick={() => handleSelectCategory(data.categoryId)}
    >
      <div className="flex justify-center h-[70px]">
        {
          <StyledIconWrapper
            data={{ size: 60, color: data.color, icon: data.icon }}
          />
        }
      </div>
      <div className="line-clamp-2 px-2 min-w-[20px] text-center mt-2 text-[16px] hover:text-[#C92127]">
        {formatCategory(data.name)}
      </div>
    </div>
  );
};

export default CategoryCard;
