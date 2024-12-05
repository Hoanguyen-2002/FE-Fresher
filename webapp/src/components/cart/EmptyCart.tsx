import { Flex } from "antd"
import Button from "../button/Button"
import { useNavigate } from "react-router-dom"

const EmtyCart = () => {
    const navigate = useNavigate()
    return (
        <Flex vertical gap={32} className="w-full h-screen items-center justify-center">
            <img src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"></img>
            <p>Chưa có sản phẩm trong giỏ hàng của bạn</p>
            <Button text="MUA SẮM NGAY" onClick={() => navigate("/")}></Button>
        </Flex>
    )
}

export default EmtyCart