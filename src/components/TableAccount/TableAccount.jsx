import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../../redux/Slice/accountSlice";
import {
  AiOutlinePlusCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading,
  AiOutlineSearch,
} from "react-icons/ai";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ModalDelete from "../ModalDelete/ModalDelete";
import "./TableAccount.scss";
import FormCreate from "./FormCreate";
import Pagination from "../Pagination/Pagination";
import Input from "../Input/Input";
import useDebounce from "../../hook/useDebounce";
import { TbDatabaseOff } from "react-icons/tb";
import ModalDetailAccount from "../ModalDetailAccount/ModalDetailAccount";
import Loading from "../Loading/Loading";

const TableAccount = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [targetIndexAccount, setTargetIndexAccount] = useState(null);
  const [openModalDetailAccount, setOpenModalDetailAccount] = useState(false)
  const [targetAccount, setTargetAccount] = useState()

  const dispatch = useDispatch();
  const listAccount = useSelector((state) => state.account.listAccount);
  const isLoading = useSelector((state) => state.account.isLoading);
  const user = useSelector((state) => state.user.information);
  const totalItem = useSelector((state) => state.account.pagination.totalItem);

  const handleDelete = (index) => {
    setToggleDeleteModal(true);
    setTargetIndexAccount(index);
  };
  const handleEdit = (index) => {
    setToggleForm(true);
    setTargetIndexAccount(index);
    setIsEdit(true);
  };

  const [searchValue, setSearchValue] = useState("");

  const debounceValue = useDebounce(searchValue, 1000);

  const currentPage = useRef(1);

  const getData = useCallback(
    (page) => {
      dispatch(getAllAccount({ page: page, name: debounceValue }));
    },
    [dispatch, debounceValue]
  );

  useEffect(() => {
    currentPage.current = 1;
    getData(currentPage.current);
  }, [dispatch, getData]);

  const totalPage = Math.ceil(totalItem / 10);

  useEffect(() => {
    if (debounceValue) {
      currentPage.current = 1;
      getData(currentPage.current);
    }
  }, [debounceValue, getData]);

  const handleClickFname = (item) =>{
    setOpenModalDetailAccount(true)
    setTargetAccount(item)
  }

  return (
    <div className="table-account">
      {user.role === 2 && (
        <AiOutlinePlusCircle
          className="table-account__createAcc"
          onClick={() => {
            setIsEdit(false);
            setToggleForm(true);
          }}
        />
      )}
      <Input
        placeholder="Search name ..."
        type="text"
        left="1rem"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        icon={isLoading ? <AiOutlineLoading className="loadingSearch" /> : <AiOutlineSearch />}
      />
      <div className="table">
        <div className="table__header">
          <p>Full name</p>
          <p>Gender</p>
          <p>Role</p>
          <p>Avatar</p>
          {user.role === 2 && <p>actions</p>}
        </div>
        <div className="table__body">
          {isLoading && <Loading />}
          {listAccount.length > 0 ? (
            listAccount.map(
              (item, index) =>
                item._id !== user._id && (
                  <div className="table__body__row" key={`account-row-${item._id}`}>
                    <div className="table__body__row-item fname" onClick={() => handleClickFname(item)}>
                      {item.firstName + " " + item.lastName}
                    </div>
                    <div className="table__body__row-item">{item.gender}</div>
                    <div className="table__body__row-item">
                      {item.role === 2 ? "admin" : item.role === 1 ? "manager" : "staff"}
                    </div>
                    <div className="table__body__row-item">
                      <img src={item.image.url} alt="" />
                    </div>
                    {user.role === 2 && (
                      <div className="table__body__row-item">
                        <Button
                          className={"tableAccount__btn edit"}
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          className={"tableAccount__btn del"}
                          onClick={() => handleDelete(index)}
                        >
                          Del
                        </Button>
                      </div>
                    )}
                  </div>
                )
            )
          ) : (
            <div className="table__empty">
              <TbDatabaseOff />
              <p>No data</p>
            </div>
          )}
        </div>
        <Pagination currentPage={currentPage} getData={getData} totalPage={totalPage} />
      </div>

      {toggleForm && (
        <Modal className={"modal-formCreateUser"} onClose={() => setToggleForm(false)}>
          <AiOutlineCloseCircle
            onClick={() => setToggleForm(false)}
            className="modal-formCreateUser__close"
          />
          <FormCreate
            setToggleForm={setToggleForm}
            dataEdit={isEdit && listAccount[targetIndexAccount]}
          />
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
      {openModalDetailAccount && <ModalDetailAccount targetAccount = {targetAccount} setOpenModalDetailAccount={setOpenModalDetailAccount} />}
    </div>
  );
};

export default TableAccount;
