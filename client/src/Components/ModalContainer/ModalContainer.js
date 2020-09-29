import React, { useEffect, useState } from "react";

import "./modalContainer.css";
function ModalContainer({ show, children, closeCallback }) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal((prevShow) => !prevShow);
  }, [show]);
  const handleModalClose = () => {
    if (typeof closeCallback === "function" && closeCallback != null) {
      closeCallback();
    }
    setShowModal((prevShow) => !prevShow);
  };

  return (
    <div className="modal-main">
      {showModal && (
        <>
          <div
            className={!showModal ? "overlay-modal" : "overlay-modal active"}
            onClick={handleModalClose}
          ></div>
          <div
            className={!showModal ? "modalContainer" : "modalContainer active"}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export default ModalContainer;
