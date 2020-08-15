import React from "react";
import "./App.css";
import firebase from "./firebase.js";
import { Empty, Button } from "antd";
import { MehOutlined, CloseCircleOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

// wish list will display passed data + be able to remove + pass it back up

function WishList(props) {
  let removeItem = (total, firebasekey, wishlistid) => {
    const removeRef = firebase
      .database()
      .ref(`items/${firebasekey}/${props.title}/${wishlistid}`);
    removeRef
      .remove()
  };
  return (
    <>
      <div className="list-section">
        <h1>{props.title}</h1>
        <div className="list">
          {props.userData &&
          Object.values(props.userData)[0] &&
          Object.values(props.userData)[0][props.title] &&
          Object.values(Object.values(props.userData)[0][props.title]).length >
            0 ? (
            <>
              <div className="list-item-header">
                <div>
                  <span>Item</span>
                </div>
              </div>
              {Object.entries(props.userData).map(([key, item]) => {
                return Object.values(item[props.title]).map((book, index) => {
                  return (
                    <div className="list-item-item" key={index}>
                      <div className="item-info">
                        <div>
                          <img src={book.image} alt={book.title} />
                        </div>
                        <div>
                          <h3 className="list-title">{book.title} </h3>
                          <p>by: {book.author} </p>
                          <p>published on: {book.year} </p>
                          <p>ratings: {book.rating} / 5 </p>
                        </div>
                      </div>
                      <div className="remove">
                        <Button
                          type="danger"
                          icon={<CloseCircleOutlined />}
                          onClick={() => {
                            removeItem(props.userData, key, book.id);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  );
                });
              })}
            </>
          ) : (
            <div className="empty-book-section">
              <Empty />
              <span>Your {props.title} is empty</span>
              <MehOutlined />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WishList;
