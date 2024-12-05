import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Dropdown, Flex, MenuProps, Space } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hook/hook";
import { updateBookState } from "../../store/book/bookSlice";
import { TSort } from "../../types/search";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
// import { CategoryTag } from "../category/CategoryTag";
// import { formatCategory } from "../../utils/formatText";
// import { findCategoryNameById } from "../../utils/categoryUtils";

interface ISortMobileProps {
    toggleFilter: () => void
}

const SortMobile = (props: ISortMobileProps) => {
  const [sortParams, setSortParams] = useState<TSort[]>([]);

  const { sort } = useSelector((state: RootState) => state.bookReducer);

  //   const { filteredCategory } = useAppSelector(
  //     (state: RootState) => state.categoryReducer
  //   );

  const dispatch = useAppDispatch();

  const handleSort = () => {
    dispatch(
      updateBookState({
        sort: sortParams,
      })
    );
  };

  const removeSortParams = (type: string) => {
    let check = false;
    sort?.forEach((item) => {
      if (item.sortType === type) {
        check = true;
      }
    });
    if (check) {
      const newSortParams = sortParams.filter((item) => item.sortType != type);
      setSortParams(newSortParams);
    }
  };

  const isSorted = (type: string, order: "asc" | "desc") => {
    let check = false;
    sort?.forEach((item) => {
      if (item.sortType === type && item.order === order) {
        check = true;
      }
    });
    return check;
  };

  const updateSortParams = (
    type: string,
    order: "asc" | "desc",
    isAdd: boolean
  ) => {
    switch (type) {
      case "title":
        if (isAdd) {
          removeSortParams(type);
          setSortParams((prevItems) => [
            ...prevItems,
            { sortType: type, order: order },
          ]);
        } else {
          removeSortParams(type);
        }
        break;
      case "sellingPrice":
        if (isAdd) {
          removeSortParams(type);
          setSortParams((prevItems) => [
            ...prevItems,
            { sortType: type, order: order },
          ]);
        } else {
          removeSortParams(type);
        }
        break;
      case "averageRating":
        if (isAdd) {
          removeSortParams(type);
          setSortParams((prevItems) => [
            ...prevItems,
            { sortType: type, order: order },
          ]);
        } else {
          removeSortParams(type);
        }
        break;
      case "totalSalesCount":
        if (isAdd) {
          removeSortParams(type);
          setSortParams((prevItems) => [
            ...prevItems,
            { sortType: type, order: order },
          ]);
        } else {
          removeSortParams(type);
        }
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      danger: isSorted("title", "asc"),
      label: (
        <a
          onClick={() => {
            if (isSorted("title", "asc")) {
              removeSortParams("title");
            } else {
              updateSortParams("title", "asc", true);
            }
          }}
        >
          Tên tăng dần
        </a>
      ),
    },
    {
      key: "2",
      danger: isSorted("title", "desc"),
      label: (
        <a
          onClick={() => {
            if (isSorted("title", "desc")) {
              removeSortParams("title");
            } else {
              updateSortParams("title", "desc", true);
            }
          }}
        >
          Tên giảm dần
        </a>
      ),
      //icon: <SmileOutlined />,
    },
    {
      key: "3",
      danger: isSorted("sellingPrice", "asc"),
      label: (
        <a
          onClick={() => {
            if (isSorted("sellingPrice", "asc")) {
              removeSortParams("sellingPrice");
            } else {
              updateSortParams("sellingPrice", "asc", true);
            }
          }}
        >
          Giá cao nhất
        </a>
      ),
    },
    {
      key: "4",
      danger: isSorted("sellingPrice", "desc"),
      label: (
        <a
          onClick={() => {
            if (isSorted("sellingPrice", "desc")) {
              removeSortParams("sellingPrice");
            } else {
              updateSortParams("sellingPrice", "desc", true);
            }
          }}
        >
          Giá thấp nhất
        </a>
      ),
    },
    {
      key: "5",
      danger: isSorted("averageRating", "asc"),
      label: (
        <a
          onClick={() => {
            if (isSorted("averageRating", "asc")) {
              removeSortParams("averageRating");
            } else {
              updateSortParams("averageRating", "asc", true);
            }
          }}
        >
          Đánh giá cao nhất
        </a>
      ),
    },
    {
      key: "6",
      danger: isSorted("averageRating", "desc"),
      label: (
        <a
          onClick={() => {
            if (isSorted("averageRating", "desc")) {
              removeSortParams("averageRating");
            } else {
              updateSortParams("averageRating", "desc", true);
            }
          }}
        >
          Đánh giá thấp nhất
        </a>
      ),
    },
    {
      key: "7",
      danger: isSorted("totalSalesCount", "asc"),
      label: (
        <a
          onClick={() => {
            if (isSorted("totalSalesCount", "asc")) {
              removeSortParams("totalSalesCount");
            } else {
              updateSortParams("totalSalesCount", "asc", true);
            }
          }}
        >
          Lượt mua cao nhất
        </a>
      ),
    },
    {
      key: "8",
      danger: isSorted("totalSalesCount", "desc"),
      label: (
        <a
          onClick={() => {
            if (isSorted("totalSalesCount", "desc")) {
              removeSortParams("totalSalesCount");
            } else {
              updateSortParams("totalSalesCount", "desc", true);
            }
          }}
        >
          Lượt mua cao nhất
        </a>
      ),
    },
  ];

  useEffect(() => {
    handleSort();

    return () => {
      dispatch(
        updateBookState({
          sort: [],
        })
      );
    };
  }, [sortParams]);

  return (
    <Flex className="w-full shadow-md px-8 py-4 justify-between">
      <Flex gap={8} className="cursor-pointer" onClick={props.toggleFilter}>
        <FilterOutlined />
        <p>Bộ lọc</p>
      </Flex>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Sắp xếp theo
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Flex>
  );
};

export default SortMobile;
