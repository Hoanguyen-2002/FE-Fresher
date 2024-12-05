import { Checkbox, Flex } from "antd";
import { formatPrice } from "../../utils/priceFormat";
import { useEffect, useState } from "react";
import { getCategoryList } from "../../api/categories";
import { formatCategory } from "../../utils/formatText";
import { useDispatch } from "react-redux";
import { updateBookState } from "../../store/book/bookSlice";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  addFilteredCategories,
  removeAllFilteredCategory,
  removeFilteredCategories,
} from "../../store/category/categorySlice";
import { useAppSelector } from "../../hook/hook";
import { RootState } from "../../store/configureStore";

type TCheckBoxItem = {
  label: string;
  value: string;
};

interface IFilterProps {
  isMobile: boolean;
  isOpen: boolean;
  triggerFilter?: () => void;
}

const Filter = (props: IFilterProps) => {
  const [categoriesOption, setCategoriesOption] = useState<TCheckBoxItem[]>([]);
  const filteredCategories = useAppSelector(
    (state: RootState) => state.categoryReducer.filteredCategory
  );
  const { ratingValue } = useAppSelector(
    (state: RootState) => state.bookReducer
  );
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const dispatch = useDispatch();

  const getCategories = async () => {
    try {
      const response = await getCategoryList();
      if (response) {
        const checkBoxItems: TCheckBoxItem[] = [];
        response.forEach((item) => {
          checkBoxItems.push({
            label: formatCategory(item.name),
            value: item.categoryId,
          });
        });
        setCategoriesOption(checkBoxItems);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
    setSelectedRating(ratingValue ?? null);

    return () => {
      dispatch(removeAllFilteredCategory());
      dispatch(
        updateBookState({
          filterCategory: [],
          ratingValue: null,
          maxPrice: null,
          minPrice: null,
        })
      );
    };
  }, []);

  useEffect(() => {
    dispatch(updateBookState({ filterCategory: filteredCategories }));
  }, []);

  const handleCheckedCategoriesChange = (
    event: CheckboxChangeEvent,
    value: string
  ) => {
    const { checked } = event.target;
    if (!checked) {
      dispatch(removeFilteredCategories(value));
    } else {
      dispatch(addFilteredCategories(value));
    }
  };

  const handleCheckedPriceChange = (
    event: CheckboxChangeEvent,
    value: string
  ) => {
    const { checked } = event.target;
    if (!checked) {
      dispatch(
        updateBookState({
          minPrice: null,
          maxPrice: null,
        })
      );
      setSelectedPrice("");
      return;
    }
    switch (value) {
      case "100000":
        dispatch(
          updateBookState({
            minPrice: null,
            maxPrice: 99999,
          })
        );
        break;
      case "500000":
        dispatch(
          updateBookState({
            minPrice: 100000,
            maxPrice: 499999,
          })
        );
        break;
      case "501000":
        dispatch(
          updateBookState({
            minPrice: 500000,
            maxPrice: null,
          })
        );
        break;
    }
    setSelectedPrice(value);
  };

  const handleCheckedRatingChange = (
    event: CheckboxChangeEvent,
    value: number
  ) => {
    const { checked } = event.target;
    if (!checked) {
      dispatch(
        updateBookState({
          ratingValue: null,
        })
      );
      setSelectedRating(null);
      return;
    }
    dispatch(
      updateBookState({
        ratingValue: value,
      })
    );
    setSelectedRating(value);
  };

  const isCategoryCheckeed = (
    categoryId: string,
    filteredCategories: string[]
  ): boolean => {
    return filteredCategories.includes(categoryId);
  };

  const priceOptions = [
    { label: `< ${formatPrice(100000)}`, value: "100000" },
    {
      label: `${formatPrice(100000)} - ${formatPrice(500000)}`,
      value: "500000",
    },
    { label: `> ${formatPrice(500000)}`, value: "501000" },
  ];

  const ratingOptions = [
    {
      label: "1 sao",
      value: 1,
    },
    {
      label: "2 sao",
      value: 2,
    },
    {
      label: "3 sao",
      value: 3,
    },
    {
      label: "4 sao",
      value: 4,
    },
    {
      label: "5 sao",
      value: 5,
    },
  ];

  return (
    <Flex
      gap={16}
      vertical
      className={
        props.isMobile
          ? `fixed top-0 left-0 px-8  py-4 w-64 bg-white z-10 text-white shadow-md transform ${
              props.isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`
          : "hidden md:flex w-auto h-auto shadow-md px-8 py-4"
      }
    >
      <p
        onClick={props.triggerFilter}
        className="cursor-pointer md:hidden text-soft-red font-bold"
      >
        Đóng
      </p>
      <p className="text-xl font-bold">Chọn thể loại</p>
      {categoriesOption.map((option) => (
        <div key={option.value}>
          <Checkbox
            onChange={(e) => handleCheckedCategoriesChange(e, option.value)}
            checked={isCategoryCheckeed(option.value, filteredCategories)}
          >
            {option.label}
          </Checkbox>
        </div>
      ))}
      <p className="text-xl font-bold">Chọn khoảng giá</p>
      {priceOptions.map((option) => (
        <div key={option.value}>
          <Checkbox
            checked={option.value === selectedPrice}
            onChange={(e) => handleCheckedPriceChange(e, option.value)}
          >
            {option.label}
          </Checkbox>
        </div>
      ))}
      <p className="text-xl font-bold">Chọn đánh giá</p>
      {ratingOptions.map((option) => (
        <div key={option.value}>
          <Checkbox
            checked={option.value === selectedRating}
            onChange={(e) => handleCheckedRatingChange(e, option.value)}
          >
            {option.label}
          </Checkbox>
        </div>
      ))}
    </Flex>
  );
};

export default Filter;
