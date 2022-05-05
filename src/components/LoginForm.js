import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db, auth } from "../FireBaseAppData";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function LoginForm({ updatauserData }) {
  const [user, setUser] = useState("");
  const [password, setpassword] = useState("");
  const [signUp, setsignUp] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();

  const signUpFuc = () => {
    createUserWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        const userCred = userCredential.user;
        updatauserData(userCred);

        setDoc(doc(db, "users", userCred.uid), {
          players: [
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
          ],
          colors: ["Red", "Blue", "Green", "Yellow"],
          userImg: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        });

        navigate("/lobby");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMessage(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  const loginFuc = () => {
    signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        const userCred = userCredential.user;
        updatauserData(userCred);
        navigate("/lobby");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMessage(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form className="form-container" onSubmit={(e) => e.preventDefault()}>
      <img
        className="dice-logo"
        src={require("../images/dicelogo.png")}
        alt="User Profile"
      />
      <div className="error-mess">{errorMessage}</div>
      <div className="form-controll">
        <label>UserName</label>
        <input
          type="text"
          placeholder="UserName"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="form-controll">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      {!signUp ? (
        <input
          className="login-btn"
          type="submit"
          value="Login"
          onClick={() => loginFuc()}
        />
      ) : (
        <input
          className="sign-up-btn"
          type="submit"
          value="Sign Up"
          onClick={() => {
            signUpFuc();
            setsignUp(!signUp);
          }}
        />
      )}
      {!signUp ? (
        <p className="sign-up-link" onClick={(e) => setsignUp(!signUp)}>
          Sign Up
        </p>
      ) : (
        <p className="sign-up-link" onClick={(e) => setsignUp(!signUp)}>
          Login
        </p>
      )}
    </form>
  );
}

export default LoginForm;
