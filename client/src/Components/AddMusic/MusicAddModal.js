import React from "react";

import ModalContainer from "../ModalContainer/ModalContainer";
import MusicAddForm from "./MusicAddForm/MusicAddForm";
function MusicAddModal({ showModal }) {
  return (
    <>
      <ModalContainer show={showModal} width="40vw" height="60vh">
        <MusicAddForm />
      </ModalContainer>
    </>
  );
}

export default MusicAddModal;
