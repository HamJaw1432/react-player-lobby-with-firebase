import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Player from "./Player";
import UserContext from "../UserContext";

import Box from "@mui/material/Box";

import { db, auth, storage } from "../FireBaseAppData";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Lobby() {
  const { uid } = React.useContext(UserContext);

  const navigate = useNavigate();

  const [colors, setColors] = useState([]);
  const [players, setPlayers] = useState([]);
  const [profileImg, setprofileImg] = useState("");
  const [uploadShown, setuploadShown] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePath, setimagePath] = useState("");


  useEffect(() => {
    if (uid === undefined) {
      navigate("/");
      return;
    }

    async function loadUserData() {
      const docRef = doc(db, "users", uid);
      const data = await getDoc(docRef).then((docSnap) => {
        let playersArr = [];
        Object.values(docSnap.data().players).forEach((element) => {
          playersArr.push(element);
        });
        let colorArr = [];
        Object.values(docSnap.data().colors).forEach((element) => {
          colorArr.push(element);
        });
        let profilePic = docSnap.data().userImg;
        return [playersArr, colorArr, profilePic];
      });
      setPlayers(data[0]);
      setColors(data[1]);
      setprofileImg(data[2]);
    }
    loadUserData();
  }, [uid, navigate]);

  const toggleColor = (id, newColor) => {
    if (!colors.includes(newColor)) {
      return;
    }
    let newArr = [...players];
    for (let i = 0; i < players.length; i++) {
      const element = newArr[i];
      if (id === element.id) {
        newArr[i].col = newColor;
        if (newColor !== "Select") {
          newArr[i].lock = newArr[i].lock ? false : true;
        } else {
          newArr[i].lock = false;
        }
        break;
      }
    }
    setPlayers(newArr);
    let newColorArr = colors.filter((ele) => ele !== newColor);
    setColors(newColorArr);

    const docRef = doc(db, "users", uid);
    updateDoc(docRef, {
      players: newArr,
      colors: newColorArr,
    });
  };

  const unlockAll = () => {

    let newArr = [
      {
        id: 1,
        col: "White",
        lock: false,
      },
      {
        id: 2,
        col: "White",
        lock: false,
      },
      {
        id: 3,
        col: "White",
        lock: false,
      },
      {
        id: 4,
        col: "White",
        lock: false,
      },
    ];
    let newcol = ["Red", "Blue", "Green", "Yellow"];
    setPlayers(newArr);
    setColors(newcol);

    const docRef = doc(db, "users", uid);
    updateDoc(docRef, {
      players: newArr,
      colors: newcol,
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const uploadImgButton = () => {setuploadShown(true)};
  const uploadImg = () => {
    if (imageUpload === null){
      return;
    }

    const imageRef = ref(storage, `profilePics/${uid}`);
    console.log('imageUpload', imageUpload);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setprofileImg(url);
        const docRef = doc(db, "users", uid);
        updateDoc(docRef, {
          userImg: url
        });
      })
    });

  };

  return (
    <Box>
      <div className="profile-logout">
        <div className="upload-img" onClick={uploadImgButton}>
          Upload Profile Img
        </div>
        <div className="logout-button" onClick={logout}>
          Log Out
        </div>
        <div className="profile-pics">
          <img src={profileImg} alt="Profile" />
        </div>
      </div>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {players.map((ele) => (
          <Player
            key={ele.id}
            colorsArr={colors}
            player={ele}
            toggleLock={toggleColor}
          />
        ))}
      </Box>
      <div className="unlock-all-button" onClick={unlockAll}>
          Unlock All
      </div>
      <Box>
        <Box sx={uploadShown ? {visibility: 'visible'} : {visibility: 'hidden'}} className="upload-img-pop">
          <div className="pop-up-box">
            <label class="custom-file-upload" onChange={(e) => {setImageUpload(e.target.files[0]); setimagePath(e.target.files[0].name)}}>
                <input type="file"/>
                Choose File
            </label>
            <div className="img-path">{imagePath}</div>
            
            <div className="uploadImg-btn" onClick={uploadImg}>Upload Image</div>
            <div onClick={() => setuploadShown(false)} className="close-button">Close</div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Lobby;
