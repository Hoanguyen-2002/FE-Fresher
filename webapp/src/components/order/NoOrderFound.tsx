import { Flex } from "antd"
import Button from "../button/Button"
import { useNavigate } from "react-router-dom"

const NoOrderFound = () => {
    const navigate = useNavigate()
    return (
        <Flex vertical  className="w-full items-center justify-center p-3">
            <img src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"></img>
            <p className="m-4">Không có đơn hàng nào</p>
            <Button text="MUA SẮM NGAY" bgColor="var(--soft-red)" borderColor="var(--soft-red)" textColor="white" onClick={() => navigate("/")}></Button>
        </Flex>
    )
}

export default NoOrderFound