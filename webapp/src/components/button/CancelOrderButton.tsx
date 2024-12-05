import React, { useState } from 'react';
import { Button, Modal, Input, Radio, Space, RadioChangeEvent, message } from 'antd';

interface CancelOrderButtonProps {
    onConfirm: (reason: string, orderId: string) => void;
    reasons: string[];
    orderId: string;
    className: string;
}

const CancelOrderButton: React.FC<CancelOrderButtonProps> = ({ onConfirm, reasons, orderId, className }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [otherReason, setOtherReason] = useState('');
    const [error, setError] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedReason(null);
        setOtherReason('');
        setError(false);
    };

    const handleOk = async() => {
        const reasonToSubmit = selectedReason === 'other' ? otherReason : selectedReason;
        if (!reasonToSubmit) {
            setError(true); 
            message.error('Vui lòng chọn lý do trước khi xác nhận!');
            return;
        }
        if (reasonToSubmit) {
            onConfirm(reasonToSubmit, orderId);
        }
        handleCancel();
    };

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setSelectedReason(e.target.value);
    };

    return (
        <>
            <Button onClick={showModal} className={className}>
                Hủy đơn hàng
            </Button>
            <Modal
                title="Lý do hủy đơn"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Radio.Group onChange={onChange} value={selectedReason}>
                    <Space direction="vertical">
                        {reasons.map((reason) => (
                            <Radio value={reason} className='m-2'>{reason}</Radio>
                        ))}
                        <Radio value="other" className='m-2'>Lý do khác</Radio>
                    </Space>
                </Radio.Group>
                {selectedReason === 'other' && (
                    <Input
                        placeholder="Nhập lý do khác"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        style={{ marginTop: 16 }}
                        className='m-2'
                    />
                )}
                {error && (
                    <div style={{ color: 'red', marginTop: 16 }}>
                        Vui lòng chọn hoặc nhập lý do trước khi xác nhận!
                    </div>
                )}
            </Modal>
        </>
    );
};

export default CancelOrderButton;