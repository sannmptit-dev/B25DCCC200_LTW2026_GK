import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = ({ contacts = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isCalling, setIsCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [callEnded, setCallEnded] = useState(false);
  const [endedSeconds, setEndedSeconds] = useState(0);

  const contactId = Number(id);
  const contact = contacts.find((c) => Number(c.id) === contactId);

  useEffect(() => {
    if (!isCalling) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCalling]);

  const handleStartCall = () => {
    setSeconds(0);
    setIsCalling(true);
    setCallEnded(false);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setEndedSeconds(seconds);
    setCallEnded(true);
  };

  if (!contact) {
    return (
      <div className="contact-detail-page">
        <p>Không tìm thấy liên hệ</p>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="contact-detail-page">
      <h2>Thông tin chi tiết</h2>
      <p>{`Họ tên: ${contact.name}`}</p>
      <p>{`Số điện thoại: ${contact.phone}`}</p>
      <p>{`Email: ${contact.email}`}</p>
      <p>{`Nhóm: ${contact.group}`}</p>
      <p>{`Yêu thích: ${contact.favorite ? 'Có' : 'Không'}`}</p>

      <div className="call-section">
        {!isCalling ? (
          <button type="button" onClick={handleStartCall}>
            Gọi
          </button>
        ) : (
          <div className="calling-box">
            <p>{`Đang gọi... ${seconds} giây`}</p>
            <button type="button" onClick={handleEndCall}>
              Kết thúc
            </button>
          </div>
        )}
        {callEnded && !isCalling && (
          <p>{`Cuộc gọi kết thúc sau ${endedSeconds} giây`}</p>
        )}
      </div>

      <div className="action-back">
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
