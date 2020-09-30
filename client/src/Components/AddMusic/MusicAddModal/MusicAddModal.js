import React from "react";

import ModalContainer from "../../ModalContainer/ModalContainer";
import MusicAddForm from "../MusicAddForm/MusicAddForm";
function MusicAddModal({ showModal }) {
  return (
    <>
      <ModalContainer show={showModal} width="70vw" height="80vh">
        <MusicAddForm />
      </ModalContainer>
    </>
  );
}

export default MusicAddModal;
