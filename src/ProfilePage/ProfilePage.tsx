import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";
import "./DialogImage.css";
import "./DialogChangeName.css";

interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [editImage, setEditImage] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [editFname, setEditFname] = useState<string>("");
  const [editLname, setEditLname] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const { id } = useParams();

  const fetchuser = useCallback(async () => {
    const res = await axios.get(`https://www.melivecode.com/api/users/${id}`);
    const user = res.data.user;
    console.log(user);
    setUser(user);
  }, [id]);
  useEffect(() => {
    fetchuser();
  }, [fetchuser]);

  //edit image URL =============================================================
  const handleeditimageURL = async () => {
    try {
      const item = {
        id: id,
        avatar: editImage,
      };
      const res = await axios.put(
        "https://www.melivecode.com/api/users/update",
        item
      );
      const user = res.data.user;
      alert("updated image successfully");
      setOpenDialog1(!openDialog1);
      window.location.reload();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditImage(value);
  };

  // upload Image =================================================================
  useEffect(() => {
    if (image.length < 1) return;
    const newImageUrl: string[] = [];
    image.forEach((image) => {
      newImageUrl.push(URL.createObjectURL(image));
    });
    setImageUrl(newImageUrl);
  }, [image]);
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    setImage(Array.from(files));
  };

  //edit image File =============================================================
  const handleeditimageFile = async () => {
    try {
      const item = {
        id: id,
        avatar: imageUrl[0],
      };
      const res = await axios.put(
        "https://www.melivecode.com/api/users/update",
        item
      );
      const user = res.data.user;
      alert("updated image successfully");
      setOpenDialog1(!openDialog1);
      window.location.reload();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  //edit handles ChangeName ===========================================================================
  const handlechangeFname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditFname(value);
  };
  const handlechangeLname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditLname(value);
  };
  const handlechangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditEmail(value);
  };

  //handleSubmit ==========================================================================================
  const handleSubmit = async () => {
    try {
      const item = {
        id: id,
        fname: editFname,
        lname: editLname,
        email: editEmail,
      };
      const res = await axios.put(
        "https://www.melivecode.com/api/users/update",
        item
      );
      const userData = res.data.user;
      console.log(userData);
      alert("User updated successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // rederpage ========================================================================================
  const renderEditImage = () => {
    return (
      <dialog open={openDialog1}>
        <div className="container-dialog">
          <div className="nav-dialog">
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpenDialog1(!openDialog1);
              }}
            ></i>
          </div>
          <div className="inputImageURL">
            <h3>Edit Profile Image :</h3>
            <div className="URL">
              <input type="text" placeholder="Url..." onChange={handleImage} />
              <div className="submit-image" onClick={handleeditimageURL}>
                <p>SUBMIT</p>
              </div>
            </div>
          </div>
          <div className="inputImageFile">
            <div className="showImage">
              {imageUrl.map((imageSrc, index) => (
                <img key={index} src={imageSrc} className="ImageUrl" />
              ))}
            </div>
            <div className="uploadfile">
              <input
                type="file"
                multiple
                accept="imge/*"
                onChange={handleChangeImage}
                id="upload"
              />
              <label htmlFor="upload">Upload File</label>
            </div>
            <div className="btn-upload" onClick={handleeditimageFile}>
              <p>UPLOAD</p>
            </div>
          </div>
        </div>
      </dialog>
    );
  };
  const renderChangeName = () => {
    return (
      <dialog open={openDialog2}>
        <div className="container-dialog">
          <div className="nav-dialog">
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpenDialog2(!openDialog2);
              }}
            ></i>
          </div>
          <div className="warp-dialog">
            <div className="edit-fname">
              <p>Frist Name:</p>
              <input
                type="text"
                placeholder="Frist Name..."
                onChange={handlechangeFname}
              />
            </div>
            <div className="edit-lname">
              <p>Last Name:</p>
              <input
                type="text"
                placeholder="Last Name..."
                onChange={handlechangeLname}
              />
            </div>
            <div className="edit-email">
              <p>Email:</p>
              <input
                type="text"
                placeholder="Email..."
                onChange={handlechangeEmail}
              />
            </div>
            <div className="btn-edit-submit" onClick={handleSubmit}>
              <p>SUBMIT</p>
            </div>
          </div>
        </div>
      </dialog>
    );
  };

  return (
    <div className="container-profile">
      <Navbar />
      <div className="warp-container-profile">
        <div className="image">
          <img src={user?.avatar} alt="LOGO" />
          <div
            className="edit"
            onClick={() => {
              setOpenDialog1(!openDialog1);
            }}
          >
            <p>Edit profile</p>
          </div>
        </div>
        <div className="warp-information">
          <div className="information">
            <div className="id">
              <p>ID: {user?.id}</p>
            </div>
            <div className="username">
              <p>Username: {user?.username}</p>
            </div>
            <div className="name">
              <p>
                Name: {user?.fname} {user?.lname}
              </p>
            </div>
            <div className="email">
              <p>Email: {user?.email}</p>
            </div>
          </div>
          <div
            className="changename"
            onClick={() => {
              setOpenDialog2(!openDialog2);
            }}
          >
            <p>Change Name</p>
          </div>
        </div>
      </div>
      {renderEditImage()}
      {renderChangeName()}
    </div>
  );
};

export default Profile;
