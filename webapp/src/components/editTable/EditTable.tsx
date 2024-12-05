import React, { useContext, useRef } from "react";
import type { GetRef, InputProps, InputRef, TableColumnType } from "antd";
import { Form, Input, Table } from "antd";
import { Rule } from "antd/es/form";

type EditorOptions<T> = InputProps & {
  handleSave: (data: T) => void;
  inputType: "number" | "text";
  rules?: Rule[];
  minValue?: number;
  maxValue?: number;
};

export type CustomColumnOptions<T> = TableColumnType<T> & {
  dataIndex?: keyof T;
  title: string;
  editor?: EditorOptions<T>;
};

interface EditableTableProp<T> {
  columns: CustomColumnOptions<T>[];
  dataSource: (TableColumnType & T)[];
  rowKey?: keyof T;
}

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

//Editable Cell component
type EditableCellProps<T> = {
  record: T;
  dataIndex?: keyof T;
  title: string;
  editor?: EditorOptions<T>;
};

const EditableCell = <T,>({
  children,
  dataIndex,
  record,
  editor,
  ...restProps
}: React.PropsWithChildren<EditableCellProps<T>>): React.ReactNode => {
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const {
    handleSave,
    inputType,
    rules,
    minValue: _minValue,
    maxValue,
    ...restInputOptions
  } = editor || {};
  const editable = !!inputType;
  const minValue = _minValue || 0;

  const save = async () => {
    try {
      const values = await form.validateFields();
      if (handleSave) handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  const getInputItem = () => {
    switch (inputType) {
      case "number":
        let currentValue = parseInt(record[dataIndex!] as string);
        const addAmountButton = (
          <button
            className="cursor-pointer"
            onClick={() => {
              form.setFieldValue(
                dataIndex,
                parseInt(form.getFieldValue(dataIndex)) + 1
              );
              save();
            }}
          >
            +
          </button>
        );

        const minusAmountButton = (
          <button
            className="cursor-pointer disabled:cursor-not-allowed"
            onClick={() => {
              form.setFieldValue(
                dataIndex,
                parseInt(form.getFieldValue(dataIndex)) - 1
              );
              save();
            }}
            disabled={
              parseInt(inputRef.current?.input?.value || "0") <= minValue
            }
          >
            -
          </button>
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value: inputValue } = e.target;
          const reg = /^-?\d*(\.\d*)?$/;
          const testValidInput = (input: string): boolean => {
            if (!reg.test(inputValue)) {
              return false;
            }
            if (!!minValue && parseInt(input) < minValue) {
              return false;
            }
            if (!!maxValue && parseInt(input) > maxValue) {
              return false;
            }
            return true;
          };
          if (inputValue === "-") {
            form.setFieldValue(dataIndex, currentValue);
            return;
          }
          if (testValidInput(inputValue)) {
            form.setFieldValue(dataIndex, inputValue);
            if (inputValue !== "") {
              currentValue = parseInt(inputValue);
            }
            return;
          }
          form.setFieldValue(dataIndex, currentValue);
          return;
        };

        const handleSaveNumber = () => {
          const val = form.getFieldValue(dataIndex);
          if (val === "") {
            form.setFieldValue(dataIndex, 1);
            currentValue = 1;
          }
          save();
        };

        return (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex as string}
            rules={rules}
            initialValue={currentValue}
          >
            <Input
              className="[&::-webkit-inner-spin-button]:appearance-none w-28"
              addonBefore={minusAmountButton}
              addonAfter={addAmountButton}
              ref={inputRef}
              onPressEnter={handleSaveNumber}
              onBlur={handleSaveNumber}
              onChange={handleChange}
              {...restInputOptions}
            />
          </Form.Item>
        );
      case "text":
        return (
          <Form.Item style={{ margin: 0 }} name={dataIndex as string}>
            <Input
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
              {...restInputOptions}
            />
          </Form.Item>
        );
      default:
        return "";
    }
  };

  if (editable) {
    childNode = getInputItem();
  }

  return <td {...restProps}>{childNode}</td>;
};

//Editable Row component
interface EditableRowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = (props) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

//Editable table
const EditableTable = <T extends object>({
  columns,
  dataSource,
  rowKey,
}: EditableTableProp<T>): React.ReactElement => {
  type ColumnTypes = (TableColumnType & {
    editable?: boolean;
    dataIndex?: keyof T;
    title: string;
    handleSave?: (row: T) => void;
  })[];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell<T>,
    },
  };

  const columnsSetting: ColumnTypes = columns.map((col) => {
    if (col.editor === undefined) {
      return col;
    } else {
      return {
        ...col,
        onCell: (record: T) => ({
          record,
          editor: col.editor,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    }
  });

  return (
    <Table
      components={components}
      rowClassName={() => "editable-row"}
      bordered
      dataSource={dataSource}
      columns={columnsSetting}
      rowKey={(rowKey as string) || "index"}
    />
  );
};

export default EditableTable;
