import React, { useEffect, useId, useState } from "react";
import { BsPencilFill, BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { IoLockOpen } from "react-icons/io5";

import SubSidebar from "../../components/SubSidebar/SubSidebar";
import TabSubSideBar from "../../components/TabSubSideBar/TabSubSideBar";
import ItemSubSidebar from "../../components/ItemSubSidebar/ItemSubSidebar";

import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateInfo } from "../../redux/Slice/userSlice";
import ProfileInformation from "../../components/ProfileInformation/ProfileInformation";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import useFilePreview from "../../hook/useFIlePreview";
import { fetchImg } from "../../utils/fetchImage";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import { Notificationz } from "../../components/Notification/Notification";

const Profile = () => {
  const userInformation = useSelector((state) => state.user.information);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listNav = [
    {
      icon: <BsFillPersonFill />,
      title: "Personal information",
    },
    {
      icon: <IoLockOpen />,
      title: "Change Password",
    },
    {
      icon: <BiLogOut />,
      title: "Log out",
    },
  ];
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [activeNav, setActiveNav] = useState(0);

  const [editImage, setEditImage] = useState(false);

  return (
    <>
      {editImage && <EditImg url={userInformation?.image.url} setEditImage={setEditImage} userId  = {userInformation._id} />}
      <div className="profile container">
        <SubSidebar className="profile__sub-sidebar">
          <div className="profile__sub-sidebar__avatar" onClick={() => setEditImage(true)}>
            <div className="profile__sub-sidebar__avatar__img">
              <img src={userInformation?.image.url} alt="" />
            </div>
            <BsPencilFill className="profile__sub-sidebar__avatar__icon" />
          </div>
          <h1 className="profile__sub-sidebar__name">
            {userInformation?.lastName}&nbsp;{userInformation?.firstName}
          </h1>
          <h3 className="profile__sub-sidebar__role">
            {userInformation?.role === 2
              ? "Admin"
              : userInformation?.role === 1
              ? "Manager"
              : "Staff"}
          </h3>
          {listNav.map((item, index) => (
            <ItemSubSidebar
              className={activeNav === index ? "active" : ""}
              key={`nav-subsidebar-${index}`}
              icon={item.icon}
              title={`${item.title}`}
              onClick={() => (index === 2 ? handleLogout() : setActiveNav(index))}
            />
          ))}
        </SubSidebar>
        <TabSubSideBar className="profile__tab">
          <h1 className="profile__tab__header">
            {activeNav === 0 ? listNav[0].title : listNav[1].title}
          </h1>
          {activeNav === 0 ? <ProfileInformation /> : <ChangePassword />}
        </TabSubSideBar>
      </div>
    </>
  );
};

export default Profile;

const EditImg = ({ url, setEditImage ,userId}) => {
  const idInputFile = useId();
  const [fileImage, setFileImage] = useState();
  const [filePreview] = useFilePreview(fileImage, "single");
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.user.update.isLoading)
  const [curError, setCurError] = useState("")

  useEffect(() => {
    fetchImg(url)
      .then((res) => {setFileImage(res)})
      .catch((err) => console.log(err));
  }, [url]);

  useEffect(() => {
    if(curError){
      Notificationz(curError,"error");
    }
  }, [curError])

  const handleSave = () =>{
    const data = new FormData()
    if(fileImage.type.slice(0,5) === "image"){
      data.append("image",fileImage)
      dispatch(updateInfo({dataForm : data , setToggleForm : setEditImage}))
    }
    else{
      setCurError("File Image Invalid!!!")
    }
  }
  
  return (
   <>
    {isLoading && <Loading />}
      <Modal onClose={() => setEditImage(false)} className="profile__editImg">
        <h2>Edit Image</h2>
        <div
          className="form__file"
          onClick={() => document.getElementById(idInputFile).click()}
          style={{ padding: "2rem" }}
        >
          <input
            onClick={(e) => (e.target.value = "")}
            type="file"
            id={idInputFile}
            onChange={(e) => setFileImage(e.target.files[0])}
          />
          {filePreview ? <img src={filePreview} alt="" width={"150px"} height="150px" /> : <>not</>}
        </div>
        <span>*Click Image To Edit*</span>
        <Button onClick={handleSave}>Save</Button>
      </Modal>
   </>
  );
};
