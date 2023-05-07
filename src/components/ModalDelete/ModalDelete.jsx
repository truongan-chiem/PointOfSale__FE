import React from 'react'
import {useDispatch} from 'react-redux'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import './ModalDelete.scss'
import { deleteProduct } from '../../redux/Slice/productSlice'
import { deleteAccount } from '../../redux/Slice/accountSlice'
import { deleteOrder } from '../../redux/Slice/historySlice'

const ModalDelete = ({id,type = 'dish',name,setIsToggleDelete}) => {
  const dispatch = useDispatch();
  const handleDelete = () =>{
    if(type === 'dish'){
      dispatch(deleteProduct(id))
    }
    else if(type === 'order'){
      dispatch(deleteOrder(id))
    }
    else{
      dispatch(deleteAccount(id))
    }
    setIsToggleDelete(false)
  }
  return (
    <Modal onClose={() => setIsToggleDelete(false)}>
        <div className='modal-delete'>
            <h1>Delete  {name} ?</h1>
            <p>Are you sure to delete {name} ?</p>
            <div className='modal-delete__wrapBtn'>
              <Button onClick={handleDelete}>
                  Delete
              </Button>
              <Button onClick={() => setIsToggleDelete(false)}>
                  cancel
              </Button>

            </div>
        </div>
    </Modal>
  )
}

export default ModalDelete