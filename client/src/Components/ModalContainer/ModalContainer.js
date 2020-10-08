import React, { useEffect, useState } from "react";

import "./modalContainer.css";
function ModalContainer({
  show,
  children,
  closeCallback,
  width,
  height,
  overflow,
}) {
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

  const styleForModal = {
    width: width || "300px",
    height: height || "300px",
    overflow: overflow || "auto",
  };

  return (
    <div className="modal-main">
      {showModal && (
        <>
          <div className="overlay-modal" onClick={handleModalClose}></div>
          <div
            className={!showModal ? "modalContainer" : "modalContainer active"}
            style={styleForModal}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export default ModalContainer;
