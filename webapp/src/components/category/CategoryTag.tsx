import { Tag } from "antd";
import { formatCategory } from "../../utils/formatText";

interface ICategoryTagProps {
  tagName: string;
  onClick?: () => void;
}

export const CategoryTag = (props: ICategoryTagProps) => {
  return (
    <Tag className="my-2 uppercase" color="var(--soft-red)" onClick={props.onClick}>
      {formatCategory(props.tagName)}
    </Tag>
  );
};
