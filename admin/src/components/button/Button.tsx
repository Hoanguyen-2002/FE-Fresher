// import { Button as CustomButton } from 'antd';
interface ButtonProps {
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    text?: string;
    onClick: () => void;
    isDisable?: boolean;
}
const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            disabled={props.isDisable}
            className="w-[280px] h-[50px] rounded-[200px] border-[1px] font-semibold"
            style={{
                backgroundColor: props.bgColor,
                borderColor: props.borderColor,
                color: props.textColor,
            }}
        >
            {props.text}
        </button>
    );
};
export default Button;