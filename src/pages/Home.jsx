import React from "react";
import Form from "../components/todos/Form";
import Header from "../components/ui/Header";
import List from "../components/todos/List";
import Login from "./Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Home() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });
  }, []);

  return (
    <div>
      <Login />
      <Header />
      <Form />
      <List />
    </div>
  );
}

export default Home;
