import { Card, Tabs } from "antd";
import TabBook from "./TabsBook";

interface TabBookListProps {
  title: string;
}

const TabBookList = ({ data }: { data: TabBookListProps }) => {
  const TitleNode = () => {
    return (
      <div className="flex gap-2 items-end">
        <img
          src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png"
          className="w-[32px] h-[32px]"
          alt=""
        />
        <span className="text-black-1 text-xl font-bold">{data.title}</span>
      </div>
    );
  };

  return (
    <div className="xl:max-w-[1240px] mx-auto">
      <Card style={{ width: "100%" }} title={<TitleNode />}>
        <TabBook></TabBook>
      </Card>
    </div>
  );
};

export default TabBookList;
