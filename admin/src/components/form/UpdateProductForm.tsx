import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Flex,
  notification,
  Switch,
  message,
} from 'antd';
import SingleImageUploader from './SingleImageUploader';
import MultipleImageUploader from './MuiltipleImageUploader';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import {
  removeAllDescriptionImages,
  setDescriptionImages,
  setThumbnailUrl,
} from '../../store/image/imageSlice';
import { getCategoryList } from '../../api/categories';
import {
  findCategoryIdByName,
  getCategoryNameList,
} from '../../utils/categoryUtils';
import { TCategoryListItem, TNewBookCategory } from '../../types/category';
import { getProductDetail, updateProduct } from '../../api/products';
import { handleKeyPress, isNumber } from '../../utils/inputValidation';
import { validateDiscountPrice } from '../../utils/priceValidation';
import {
  TBookDetail,
  TCategory,
  TCreateProductBody,
  TProperty,
} from '../../types/book';
import { NotificationType } from '../../types/type';
import { RootState } from '../../store/configureStore';

const { TextArea } = Input;

interface IUpdateProductFormProps {
  bookId: string;
  onFinsh: () => void;
}

const UpdateProductForm = (props: IUpdateProductFormProps) => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [book, setBook] = useState<TBookDetail | null>(null);
  const [categories, setCategories] = useState<TCategoryListItem[]>([]);
  const [bookCategories, setBookCategories] = useState<TNewBookCategory[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);
  const imagesStore = useAppSelector((state: RootState) => state.image);
  const dispatch = useAppDispatch();

  const getBookDetail = async (id: string) => {
    try {
      const response = await getProductDetail(id);
      if (response) {
        form.setFieldsValue({
          title: response.title,
          author: response.authors[0].name,
          category: renderListCategory(response.categories),
          publisher: response.publisher.name,
          stock_quantity: response.quantity,
          description: response.description,
          book_number: 300,
          base_price: response.price.basePrice,
          discount_price: response.price.discountPrice,
        });
        setBook(response);
        setBookCategories(response.categories);
        setIsActive(response.status);
        dispatch(setThumbnailUrl(response.thumbnail));
        dispatch(setDescriptionImages(response.images ?? ""));
      } else {
        message.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const response = await getCategoryList({ pageNo: 1, pageSize: 10 });
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = async () => {
    const formData: TCreateProductBody = {
      title: form.getFieldValue('title'),
      thumbnail: imagesStore.thumbnail,
      description: form.getFieldValue('description'),
      quantity: form.getFieldValue('stock_quantity'),
      publisher: {
        name: form.getFieldValue('publisher'),
      },
      authors: [
        {
          bookAuthorId: book?.authors.at(0)?.bookAuthorId,
          name: form.getFieldValue('author'),
        },
      ],
      images: imagesStore.descriptionImages,
      categories: bookCategories,
      properties: book?.properties.map((item) => {
        const newItem: TProperty = {
          propertyId: item.propertyId,
          name: item.name,
          value: form.getFieldValue(item.name),
        };
        return newItem;
      }),
      price: {
        basePrice: form.getFieldValue('base_price'),
        discountPrice: form.getFieldValue('discount_price'),
      },
      status: isActive,
    };
    try {
      console.log(formData);
      const response = await updateProduct(props.bookId, formData);
      if (response) {
        openCreateProductNotification(
          'success',
          'Thành Công',
          'Cập nhật sản phẩm thành công'
        );
        props.onFinsh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openCreateProductNotification = (
    type: NotificationType,
    status: string,
    message: string
  ) => {
    api[type]({
      message: status,
      description: message,
    });
  };

  const renderFormItem = (property: TProperty) => {
    console.log(isNumber(property.name));
    if (isNumber(property.name)) {
      return (
        <Form.Item
          key={property.propertyId}
          label={property.name}
          name={property.name}
          rules={[
            { required: true, message: `${property.name} không được bỏ trống` },
          ]}
          initialValue={property.value}
        >
          <InputNumber
            min={0}
            onKeyDown={(e) => handleKeyPress(e)}
            className='w-full'
            pattern='[0-9]*'
          />
        </Form.Item>
      );
    }
    return (
      <Form.Item
        label={property.name}
        name={property.name}
        rules={[
          { required: true, message: `${property.name} không được bỏ trống` },
        ]}
        normalize={(value: string) => value.replace(/\s{2,}/g, ' ')}
        initialValue={property.value}
      >
        <Input />
      </Form.Item>
    );
  };

  const renderListCategory = (categories: TCategory[]): string[] => {
    const categoryNameList: string[] = [];
    categories.forEach((item) => categoryNameList.push(item.name));
    return categoryNameList;
  };

  const handleChangeCategory = (value: string[]) => {
    const newBookCategories: TNewBookCategory[] = [];
    value.forEach((item) => {
      const category: TNewBookCategory = {
        categoryId: findCategoryIdByName(item, categories),
        name: item,
      };
      newBookCategories.push(category);
    });
    setBookCategories(newBookCategories);
  };

  useEffect(() => {
    getBookDetail(props.bookId);
    getCategories();

    return () => {
      dispatch(setThumbnailUrl(''));
      dispatch(removeAllDescriptionImages());
    };
  }, [props.bookId]);

  return (
    <>
      {contextHolder}
      <Flex vertical gap={32} justify='center'>
        <h1 className='text-4xl text-center font-bold'>
          Cập nhật thông tin sách
        </h1>
        <Form
          form={form}
          name='createProductForm'
          autoComplete='off'
          variant='filled'
          onFinish={handleSubmitForm}
          className='w-full items-center shadow-md rounded-xl p-8'
        >
          <Form.Item
            label='Tên sách'
            name='title'
            rules={[
              { required: true, message: 'Tên sách không được bỏ trống!' },
            ]}
            normalize={(value: string) => value.replace(/\s{2,}/g, ' ')}
          >
            <Input />
          </Form.Item>

          <Form.Item label='Hình đại diện' name='image'>
            <SingleImageUploader />
          </Form.Item>
          <Form.Item
            label='Tác giả'
            name='author'
            rules={[
              { required: true, message: 'Tác giả không được bỏ trống!' },
            ]}
            normalize={(value: string) => value.replace(/\s{2,}/g, ' ')}
          >
            <Input />
          </Form.Item>
          <Flex gap={32}>
            <Form.Item
              label='Thể loại'
              name='category'
              className='w-full'
              rules={[
                { required: true, message: 'Thể loại không được bỏ trống!' },
              ]}
            >
              <Select
                //defaultValue={getCategoryNameList(categories).at(0)?.value}
                options={getCategoryNameList(categories)}
                onChange={handleChangeCategory}
                mode='multiple'
                allowClear
                className='text-left  min-w-28 w-auto'
              />
            </Form.Item>
            <Form.Item
              label='Số lượng'
              name='stock_quantity'
              rules={[{ required: true, message: 'Vui lòng nhập số lượng !' }]}
              className='w-full'
            >
              <InputNumber
                min={0}
                onKeyDown={(e) => handleKeyPress(e)}
                className='w-full'
                pattern='[0-9]*'
              />
            </Form.Item>
          </Flex>
          <Form.Item
            label='Nhà xuất bản'
            name='publisher'
            normalize={(value: string) => value.replace(/\s{2,}/g, ' ')}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Mô tả sách'
            name='description'
            rules={[{ required: true, message: 'Mô tả không được bỏ trống!' }]}
            normalize={(value: string) => value.replace(/\s{2,}/g, ' ')}
          >
            <TextArea />
          </Form.Item>
          <Flex gap={32}>
            <Form.Item
              label='Số trang'
              name='book_number'
              rules={[
                { required: true, message: 'Số trang không được bỏ trống!' },
              ]}
              className='w-full'
            >
              <InputNumber
                min={0}
                onKeyDown={(e) => handleKeyPress(e)}
                className='w-full'
                pattern='[0-9]*'
              />
            </Form.Item>
            <Form.Item
              name='status'
              label='Trạng thái'
              valuePropName='active'
              className='w-1/2'
            >
              <Switch
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                checkedChildren='Khả dụng'
                unCheckedChildren='Không khả dụng'
              />
            </Form.Item>
          </Flex>
          <Flex gap={32}>
            {book?.properties.map((property) => renderFormItem(property))}
          </Flex>
          <Flex gap={32}>
            <Form.Item
              label='Giá gốc'
              name='base_price'
              rules={[
                { required: true, message: 'Giá gốc không được bỏ trống!' },
              ]}
              className='w-full'
            >
              <InputNumber
                min={0}
                id='base-price-input'
                onKeyDown={(e) => handleKeyPress(e)}
                className='w-full'
                pattern='[0-9]*'
              />
            </Form.Item>
            <Form.Item
              label='Giá giảm'
              name='discount_price'
              rules={[
                { required: true, message: 'Giá giảm không được bỏ trống!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return validateDiscountPrice(
                      _,
                      value,
                      getFieldValue('base_price')
                    );
                  },
                }),
              ]}
              className='w-full'
            >
              <InputNumber
                min={0}
                id='discount-price-input'
                onKeyDown={(e) => handleKeyPress(e)}
                className='w-full'
                pattern='[0-9]*'
              />
            </Form.Item>
          </Flex>
          <Form.Item label='Hình sản phẩm' name='image_list'>
            <MultipleImageUploader />
          </Form.Item>
          <Form.Item className='flex justify-end'>
            <Button type='default' onClick={() => form.resetFields()}>
              Đặt lại biểu mẫu
            </Button>
            <Button type='primary' htmlType='submit' className='ml-4'>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default UpdateProductForm;
