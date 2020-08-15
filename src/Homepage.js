import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import bookcover from "./bookcover.jpg";
import { Button } from "antd";

function HomePage(props) {
  return (
    <>
      <div className="home-section">
        <div className="homedescription">
          <p>Sign up and login to save books for you wishlist and havelist.</p>
          <p>
            Search for books from GoodRead's, with over 2.6 billion book
            selections!
          </p>
          <Button
            type="primary"
            htmlType="submit"
            className="homedescriptionregister"
            onClick={() => {
              props.updateTab("register");
            }}
          >
            Register
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              props.updateTab("login");
            }}
          >
            Login
          </Button>
        </div>
        <div className="bookimage">
          <img src={bookcover} alt="books" className="bookimagecover" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
