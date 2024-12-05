import {
  Card,
  Form,
  Image,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Button as AntButton,
} from "antd";
import Button from "../components/button/Button";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "../utils/priceFormat";
import api from "../api/apiConfig";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { debounce } from "../utils/debounce";

const { Option } = Select;

interface ShippingMethod {
  shippingMethodId: string;
  shippingMethodName: string;
  shippingMethodFee: number;
}

interface PaymentMethod {
  paymentMethodId: string;
  paymentName: string;
}

interface OrderItem {
  id: string;
  imageURL: string;
  note: string | null;
  originalPrice: number;
  quantity: number;
  salePrice: number;
  title: string;
  totalPrice: number;
}

interface Address {
  addressId?: string;
  city?: string;
  province?: string;
  district?: string;
  detailAddress?: string;
}

interface Cities {
  _id: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string | '';
  code: string;
  isDeleted: boolean;
}
interface Province {
  _id: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  parent_code: string;
  isDeleted: boolean;
}
interface District {
  _id: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  parent_code: string;
  isDeleted: boolean;
}
interface ApiResponseCity {
  exitcode: number;
  data: {
    nItems: number;
    nPages: number;
    data: Cities[];
  };
}
interface ApiResponseProvince {
  exitcode: number;
  data: {
    nItems: number;
    nPages: number;
    data: Province[];
  };
}
interface ApiResponseDistrict {
  exitcode: number;
  data: {
    nItems: number;
    nPages: number;
    data: District[];
  };
}

interface UserInfor {
  fullname: string;
  phone: string;
  email: string;
}

const Checkout: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedAddress, setSelectedAddress] = useState<Address>({
    addressId: '',
    city: '',
    province: '',
    district: '',
    detailAddress: '',
  });
  const [newAddress, setNewAddress] = useState<Address>({
    addressId: '',
    city: '',
    province: '',
    district: '',
    detailAddress: '',
  });
  const [userInfor, setUserInfor] = useState<UserInfor>({
    fullname: '', phone: '', email: '',
  });
  const { orderId } = useParams<{ orderId: string }>();
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingMethod | undefined>();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [orderInfor, setOrderInfor] = useState<OrderItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const accessToken = localStorage.getItem('accessToken');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressForm] = Form.useForm();
  const navigate = useNavigate();
  const [addressError, setAddressError] = useState<string | null>(null);

  const getFormattedAddresses = async () => {
    try {
      const response = await api.get(`/v1/accounts/myInfo`);
      const storedAddressesString =
        response.data.data.content?.listAddress || [];
      setUserInfor({
        fullname: response.data.data.content.fullname,
        phone: response.data.data.content.phone,
        email: response.data.data.content.email,
      })
      return storedAddressesString;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.msg;
        console.error("Load address failed: ", backendError);
      }
    }
    return [];
  };

  const addressToString = (address: Address) => `${address.detailAddress}, ${address.district}, ${address.province}, ${address.city}`;

  const fetchAddresses = async () => {
    const formattedAddresses = await getFormattedAddresses();
    setAddresses(formattedAddresses);
    setSelectedAddress(addresses[0]);
  };

  const fetchOrderItems = async () => {
    try {
      console.log(orderId);
      const response = await api.get(`/v1/orders/${orderId}/itemDetail`);
      setOrderInfor(response.data.data.content);
      console.log(response);
      console.log(orderInfor);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.msg;
        console.error("Load profile failed:", backendError);
        message.error("TẢI THÔNG TIN SẢN PHẨM THẤT BẠI.");
      }
    }
  };

  const fetchShippingMethods = async () => {
    try {
      const response = await api.get(`/v1/checkout/shipping`);
      setShippingMethods(response.data.data.content);
      console.log(response);
      console.log(shippingMethods);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.msg;
        console.error("Load profile failed:", backendError);
        message.error("TẢI PHƯƠNG THỨC VẬN CHUYỂN THẤT BẠI.");
      }
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await api.get(`/v1/checkout/payment`);
      setPaymentMethods(response.data.data.content);
      console.log(response);
      console.log(paymentMethods);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.msg;
        console.error("Load profile failed:", backendError);
        message.error("TẢI PHƯƠNG THỨC THANH TOÁN THẤT BẠI.");
      }
    }
  };

  const setDefaultSelectedPaymentMethod = (paymentMethods: any) => {
    const defaultPaymentName = "Thanh toán khi nhận hàng";
    const defaultPaymentMethod = paymentMethods.find(
      (method: { paymentName: string }) =>
        method.paymentName === defaultPaymentName
    );
    setSelectedPayment(
      defaultPaymentMethod ? defaultPaymentMethod.paymentMethodId : ""
    );
  };

  const [provinces, setProvinces] = useState<Cities[]>([]);
  const [districts, setDistricts] = useState<Province[]>([]);
  const [wards, setWards] = useState<District[]>([]);

  const fetchProvinces = async () => {
    const response = await api.get<ApiResponseCity>('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1');
    const data: ApiResponseCity = response.data;
    if (data.exitcode === 1) {
      setProvinces(data.data.data);
    }
  };

  const handleProvinceChange = async (provinceCode: string) => {
    form.resetFields(['province', 'district']);
    const response = await api.get<ApiResponseProvince>(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`);
    const data: ApiResponseProvince = response.data;
    if (data.exitcode === 1) {
      const selectedProvince = provinces.find((province) => province.code === provinceCode);
      setDistricts(data.data.data);
      if (accessToken) {
        setNewAddress({ ...newAddress, city: (selectedProvince ? selectedProvince.name_with_type : ""), province: '', district: '' });
      } else {
        setSelectedAddress({ ...selectedAddress, city: (selectedProvince ? selectedProvince.name_with_type : ""), province: '', district: '' });
      }
      setWards([]);
    }
  };

  const handleDistrictChange = async (districtCode: string) => {
    form.resetFields(['district']);
    const response = await api.get<ApiResponseDistrict>(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`);
    const data: ApiResponseDistrict = response.data;
    if (data.exitcode === 1) {
      const selectedDistrict = districts.find((district) => district.code === districtCode);
      setWards(data.data.data);
      if (accessToken) {
        setNewAddress({ ...newAddress, province: selectedDistrict ? selectedDistrict.name_with_type : "", district: '' });
      } else {
        setSelectedAddress({ ...selectedAddress, province: selectedDistrict ? selectedDistrict.name_with_type : "", district: '' });
      }
    }
  };

  const calculateTotalPrice = useMemo(() => {
    return orderInfor.reduce(
      (accumulator, currentValue) =>
        accumulator +
        (currentValue.originalPrice - currentValue.salePrice) *
        currentValue.quantity,
      0
    );
  }, [orderInfor]);

  useEffect(() => {
    fetchShippingMethods();
    fetchPaymentMethods();
    fetchOrderItems();
    if (accessToken) {
      fetchAddresses();
    }
    fetchProvinces();
    addressForm.resetFields();
  }, []);

  useEffect(() => {
    form.resetFields();
    addressForm.resetFields();
  }, [addresses]);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      setDefaultSelectedPaymentMethod(paymentMethods);
    }
    if (shippingMethods.length > 0) {
      setSelectedShipping(shippingMethods[0]);
    }
    // setOrderInfor(orderInfor)
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  }, [shippingMethods, paymentMethods, addresses]);

  const handleShippingChange = (e: any) => {
    console.log(e.target.value);
    setSelectedShipping(e.target.value);
  };

  const handlePaymentChange = (e: any) => {
    setSelectedPayment(e.target.value);
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();
    console.log(values);
    const formatedValues = {
      orderId: orderId,
      shippingMethodId: selectedShipping?.shippingMethodId,
      paymentMethodId: selectedPayment,
      phone: `${values.prefix}${values.phone}`,
      recipient: values.recipient,
      email: values.email,
      detailAddress: addressToString(selectedAddress),
    };
    console.log(formatedValues);
    try {
      const response = await api.post(`/v1/orders/confirm`, formatedValues);
      console.log(response);
      message.success("ĐẶT ĐƠN HÀNG THÀNH CÔNG");
      navigate(`/checkout/success/${orderId}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        message.error("ĐẶT HÀNG THẤT BẠI.");
      }
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="0">+84</Option>
      </Select>
    </Form.Item>
  );

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setSelectedAddress(e.target.value);
  };

  const handleOk = () => {
    if (isAddressDuplicate(newAddress)) {
      setAddressError("Địa chỉ này đã tồn tại. Vui lòng nhập địa chỉ khác.");
      return;
    }
    console.log(newAddress);
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress);
    setIsModalVisible(false);
    setAddressError(null);
    addressForm.resetFields();
  };

  const handleCancel = () => {
    addressForm.resetFields();
    setIsModalVisible(false);
  };

  const showModal = () => {
    setSelectedAddress({
      addressId: '',
      city: '',
      province: '',
      district: '',
      detailAddress: '',
    });
    setIsModalVisible(true);
  };

  const initialValues = {
    prefix: '0',
    recipient: userInfor?.fullname,
    email: userInfor?.email,
    phone: userInfor?.phone?.substring(1),
  };
  console.log(initialValues);

  const isAddressDuplicate = (address: Address): boolean => {
    const newAddressString = addressToString(address).toLowerCase();
    return addresses.some(existingAddress =>
      addressToString(existingAddress).toLowerCase() === newAddressString
    );
  };

  return (
    <div className="bg-[#f5f5f5] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Thanh toán đơn hàng</h1>
        <Form
          layout="vertical"
          form={form}
          name="checkout"
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/5 w-full mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Sản phẩm</th>
                      <th className="text-left font-semibold">Đơn giá</th>
                      <th className="text-left font-semibold">Giảm giá</th>
                      <th className="text-left font-semibold">Số lượng</th>
                      <th className="text-left font-semibold">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderInfor.map((item) => (
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center">
                            <Image
                              width={150}
                              height={150}
                              src={item.imageURL}
                              alt={item.title}
                              fallback="https://via.placeholder.com/150"
                            />
                            <span className="font-semibold m-3">
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          {formatPrice(item.originalPrice)}
                        </td>
                        <td className="py-4">
                          {formatPrice(item.salePrice)}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <span className="text-center w-8">
                              x<span>{item.quantity}</span>
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          {formatPrice(item.totalPrice * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
            <div className="md:w-2/5">
              <Card title="Thông tin nhận hàng" className="mb-3 shadow-md">
                <Form.Item
                  name="recipient"
                  label="Người nhận"
                  rules={[
                    {
                      required: true,
                      message: "Tên người nhận không được bỏ trống!",
                    },
                    {
                      pattern: /^.{1,50}$/,
                      message: "Họ và tên không được vượt quá 50 kí tự.",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên người nhận" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại nhận hàng không được bỏ trống!",
                    },
                    {
                      pattern: /^\d{9}$/,
                      message:
                        "Vui lòng nhập đúng 9 chữ số điện thoại (sau số 0).",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                    placeholder="Nhập số điện thoại người nhận"
                  />
                </Form.Item>
                {addresses.length > 0 && accessToken && (
                  <div>
                    <Form.Item
                      label="Địa chỉ nhận hàng" name='address'
                      rules={[
                        {
                          required: true,
                          message: "Địa chỉ nhận hàng không được bỏ trống!",
                        },
                      ]}
                    >
                      <Radio.Group onChange={onChange} value={selectedAddress}>
                        <Space direction="vertical">
                          {addresses.map((address) => (
                            <Radio value={address}>{addressToString(address)}</Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <AntButton type="dashed" onClick={showModal} block icon={<PlusOutlined />} className="my-3">
                      Địa chỉ khác
                    </AntButton>
                    <Modal
                      title="Sử dụng địa chỉ giao hàng khác"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okText="Xác nhận"
                      cancelText="Hủy"
                    >
                      {addressError && (
                        <p style={{ color: "red", marginTop: "8px" }}>{addressError}</p>
                      )}
                      <Form layout="vertical" form={addressForm}>
                        <Form.Item label="Tỉnh/Thành phố">
                          <Select
                            value={newAddress?.city}
                            onChange={(value) => {
                              setNewAddress({ ...newAddress, city: value });
                              handleProvinceChange(value);
                            }}
                          >
                            {provinces.map(province => (
                              <Select.Option key={province.code} value={province.code}>
                                {province.name_with_type}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Quận/Huyện">
                          <Select
                            value={newAddress?.province}
                            onChange={(value) => {
                              setNewAddress({ ...newAddress, province: value });
                              handleDistrictChange(value);
                            }}
                          >
                            {districts.map(district => (
                              <Select.Option key={district.code} value={district.code}>
                                {district.name_with_type}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Xã/Phường">
                          <Select
                            value={newAddress?.district}
                            onChange={(value) => {
                              setNewAddress({ ...newAddress, district: value });
                            }}
                          >
                            {wards.map(ward => (
                              <Select.Option key={ward.code} value={ward.name_with_type}>
                                {ward.name_with_type}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name='detailAddress'
                          label='Địa chỉ cụ thể'
                        >
                          <Input defaultValue={newAddress?.detailAddress} placeholder='Địa chỉ cụ thể' onChange={(e) => { setNewAddress({ ...newAddress, detailAddress: e.target.value }); }}></Input>
                        </Form.Item>
                      </Form>
                    </Modal>
                  </div>
                )}
                {!accessToken && (
                  <div >
                    {/* <Form layout="vertical" form={addressForm}> */}
                    <Form.Item label="Tỉnh/Thành phố" name='city'
                      rules={[
                        {
                          required: true,
                          message: "Chọn tỉnh/thành phố!",
                        },
                      ]}
                    >
                      <Select
                        value={selectedAddress?.city}
                        onChange={(value) => {
                          setSelectedAddress({ ...selectedAddress, city: value });
                          handleProvinceChange(value);
                        }}
                      >
                        {provinces.map(province => (
                          <Select.Option key={province.code} value={province.code}>
                            {province.name_with_type}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Quận/Huyện" name='province'
                      rules={[
                        {
                          required: true,
                          message: "Chọn Quận/huyện!",
                        },
                      ]}>
                      <Select
                        value={selectedAddress?.province}
                        onChange={(value) => {
                          setSelectedAddress({ ...selectedAddress, province: value });
                          handleDistrictChange(value);
                        }}
                      >
                        {districts.map(district => (
                          <Select.Option key={district.code} value={district.code}>
                            {district.name_with_type}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Xã/Phường" name='district'
                      rules={[
                        {
                          required: true,
                          message: "Chọn xã/phường!",
                        },
                      ]}>
                      <Select
                        value={selectedAddress?.district}
                        onChange={(value) => {
                          setSelectedAddress({ ...selectedAddress, district: value });
                        }}
                      >
                        {wards.map(ward => (
                          <Select.Option key={ward.code} value={ward.name_with_type}>
                            {ward.name_with_type}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name='detailAddress'
                      label='Địa chỉ cụ thể'
                    >
                      <Input defaultValue={selectedAddress?.detailAddress} placeholder='Địa chỉ cụ thể' onChange={(e) => { setSelectedAddress({ ...selectedAddress, detailAddress: e.target.value }); }}></Input>
                    </Form.Item>
                    {/* </Form> */}
                  </div>

                )}

                {/* </Form.Item> */}
                <Form.Item label="Email" name="email"
                  rules={[{
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                  {
                    required: true,
                    message: "Email không được để trống!",
                  }]}>
                  <Input placeholder="Nhập Email để nhận thông báo về đơn hàng" />
                </Form.Item>
              </Card>

              <Card title="Phương thức vận chuyển" className="mb-3 shadow-md">
                <Radio.Group
                  onChange={handleShippingChange}
                  value={selectedShipping}
                  className="w-full"
                >
                  {shippingMethods.map((method) => (
                    <Radio key={method.shippingMethodId} value={method}>
                      {method.shippingMethodName} -{" "}
                      <span className="text-bold">
                        {formatPrice(method.shippingMethodFee)}
                      </span>
                    </Radio>
                  ))}
                </Radio.Group>
              </Card>
              <Card title="Phương thức Thanh toán" className="mb-3 shadow-md">
                <Radio.Group
                  onChange={handlePaymentChange}
                  value={selectedPayment}
                  className="w-full"
                >
                  {paymentMethods.map((method) => (
                    <Radio
                      key={method.paymentMethodId}
                      value={method.paymentMethodId}
                    >
                      {method.paymentName}
                    </Radio>
                  ))}
                </Radio.Group>
              </Card>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Chi tiết thanh toán
                </h2>
                <div className="flex justify-between mb-2">
                  <span>Tổng tiền hàng</span>
                  <span>{formatPrice(calculateTotalPrice)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tổng phí vận chuyển</span>
                  <span>
                    {formatPrice(
                      selectedShipping
                        ? selectedShipping.shippingMethodFee
                        : 0
                    )}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Tổng thanh toán</span>
                  <span className="font-semibold">
                    {formatPrice(
                      calculateTotalPrice +
                      (selectedShipping
                        ? selectedShipping.shippingMethodFee
                        : 0)
                    )}
                  </span>
                </div>
                <Form.Item>
                  <div className="text-center mt-3">
                    <Button
                      onClick={() => {
                        debounce(onFinish, 1000)
                      }}
                      bgColor="var(--soft-red)"
                      borderColor="var(--soft-red)"
                      text="ĐẶT HÀNG"
                      textColor="white"
                    ></Button>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div >
    </div >
  );
};

export default Checkout;
