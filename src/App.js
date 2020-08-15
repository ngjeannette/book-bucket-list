import React, { useState, useEffect } from "react";
import "./App.css";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { BulbOutlined } from "@ant-design/icons";
import RegisterPage from "./Registerpage.js";
import LoginPage from "./Loginpage.js";
import SearchTitle from "./Searchtitle.js";
import WishList from "./Wishlist";
import HomePage from "./Homepage";

function App() {
  const [tab, setTab] = useState("home");
  const [userData, setUserData] = useState({});
  const [genre, setGenre] = useState("");
  const [list, setList] = useState("");

  useEffect(() => {}, [userData]);

  let updateLogin = (value) => {
    setUserData(value);
  };

  let updateUserData = (value) => {
    setUserData(value);
  };

  let updateTab = (value) => {
    setTab(value);
  };

  return (
    <>
      <div className="navBar">
        <div className="navBar-header">
          <h1
            onClick={() => {
              setTab("home");
            }}
          >
            Project 3: Book Bucket List
          </h1>
          <a
            href="https://flaviocopes.com/sample-app-ideas/#a-book-database"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BulbOutlined />
          </a>
        </div>
        <div className="signup-login">
          <Button
            type="text"
            onClick={() => {
              setTab("register");
            }}
          >
            Register
          </Button>
          <Button
            type="text"
            onClick={() => {
              setTab("login");
            }}
          >
            Login
          </Button>
          <Button
            type="text"
            onClick={() => {
              setTab("wishlist");
              setList("wishlist");
            }}
          >
            WishList
          </Button>
          <Button
            type="text"
            onClick={() => {
              setTab("wishlist");
              setList("havelist");
            }}
          >
            HaveList
          </Button>
        </div>
      </div>
      <div className="genre-section">
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("Harry Potter");
          }}
        >
          Harry Potter
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("Pride and Prejudice");
          }}
        >
          Pride and Prejudice
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("The Book Thief");
          }}
        >
          The Book Thief
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("1984");
          }}
        >
          1984
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre(`Handmaid's Tale`);
          }}
        >
          Handmaid's Tale
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("Watership Down");
          }}
        >
          Watership Down
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("Game of Thrones");
          }}
        >
          Game of Thrones
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("Les Miserables");
          }}
        >
          Les Miserables
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("Lord of the Flies");
          }}
        >
          Lord of the Flies
        </Button>
        <Button
          type="text"
          onClick={() => {
            setTab("populartitle");
            setGenre("Hunger Games");
          }}
        >
          Hunger Games
        </Button>
      </div>
      <div className="search-section">
        <Input.Search
          placeholder="search books"
          onSearch={(value) => {
            setTab("populartitle");
            setGenre(value);
          }}
          allowClear
        />
      </div>
      <div className="content-section">
        {tab === "register" && <RegisterPage />}
        {tab === "login" && <LoginPage updateLogin={updateLogin} />}
        {tab === "populartitle" && (
          <SearchTitle
            genre={genre}
            userData={userData}
            updateUserData={updateUserData}
          />
        )}
        {tab === "wishlist" && <WishList userData={userData} title={list} />}
        {tab === "home" && <HomePage updateTab={updateTab} />}
      </div>
    </>
  );
}

export default App;
