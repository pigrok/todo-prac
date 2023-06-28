import React, { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id}=> ${doc.data()}`);
      });
    };
    fetchData();
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", error);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("signIn", userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", error);
    }
  };
  const logOut = async (event) => {
    event.preventDefault();

    await signOut(auth);
  };

  return (
    <div>
      <h2>Login</h2>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          margin: "10px",
        }}
      >
        <form>
          <div>
            <label>이메일 : </label>
            <input type="email" value={email} name="email" onChange={onChange} required></input>
          </div>
          <div>
            <label>비밀번호 : </label>
            <input type="password" value={password} name="password" onChange={onChange} required></input>
          </div>
          <button onClick={signUp}>회원가입</button>
          <button onClick={signIn}>로그인</button>
          <button onClick={logOut}>로그아웃</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
