import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../../redux/Slice/accountSlice";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ModalDelete from "../ModalDelete/ModalDelete";
import "./TableAccount.scss";
import FormCreate from "./FormCreate";

const TableAccount = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [targetIndexAccount, setTargetIndexAccount] = useState(null);

  const dispatch = useDispatch();
  const listAccount = useSelector((state) => state.account.listAccount);
  const user = useSelector(state => state.user.information)

  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);
  const handleDelete = (index) => {
    setToggleDeleteModal(true);
    setTargetIndexAccount(index);
  };
  const handleEdit = (index) => {
    setToggleForm(true)
    setTargetIndexAccount(index)
    setIsEdit(true)
  }
  return (
    <div className="table-account">
      {user.role === 2 && <AiOutlinePlusCircle
        className="table-account__createAcc"
        onClick={() => {
          setIsEdit(false)
          setToggleForm(true)
        }}
      />}
      <table className="table-account__main">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Avatar</th>
            {user.role === 2 && <th>actions</th>}
          </tr>
        </thead>
        <tbody>
          {listAccount.map((item, index) => item._id !== user._id && (
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.gender}</td>
              <td>{item.role === 2 ? "admin" : item.role === 1 ? "manager" : "staff"}</td>
              <td>
                <img src={item.image.url} alt="" />
              </td>
              {user.role === 2 && <td>
                <Button className={"tableAccount__btn edit"} onClick = {() => handleEdit(index)}>Edit</Button>
                <Button className={"tableAccount__btn del"} onClick={() => handleDelete(index)}>
                  Del
                </Button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
      {toggleForm && (
        <Modal className={"modal-formCreateUser"} onClose={() => setToggleForm(false)}>
          <AiOutlineCloseCircle
            onClick={() => setToggleForm(false)}
            className="modal-formCreateUser__close"
          />
          <FormCreate setToggleForm={setToggleForm} dataEdit = { isEdit && listAccount[targetIndexAccount]}  />
        </Modal>
      )}
      {toggleDeleteModal && (
        <ModalDelete
          type="account"
          id={listAccount[targetIndexAccount]._id}
          name={`${listAccount[targetIndexAccount].lastName} ${listAccount[targetIndexAccount].firstName}`}
          setIsToggleDelete={setToggleDeleteModal}
        />
      )}
    </div>
  );
};

export default TableAccount;
