import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "./firebase.js";
import { Card, Empty, Button, notification, Space } from "antd";
import { MehOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function SearchTitle(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const searchItem = props.genre;
    const searchItemQuery = searchItem.split(" ").join("+");

    if (searchItem) {
      const url = `https://www.goodreads.com/search.xml?key=kPemw6gKMzdYeiIV0Hq7Q&q=${searchItemQuery}`; // site that doesn’t send Access-Control-*
      // const url = `https://www.goodreads.com/search.xml?key=Pxtu7Nee7I1NUohE6hjBuA&q=${searchItemQuery}`; // site that doesn’t send Access-Control-*
      fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then((response) => response.text())
        .then((contents) => {
          var parseString = require("xml2js").parseString;
          var xml = contents;
          parseString(xml, function (err, result) {
            let resultArray =
              result.GoodreadsResponse.search[0].results[0].work;
            setResults(resultArray);
          });
        })
        .catch();
    }
  }, [props.genre]);

  useEffect(() => {}, [results]);

  const openNotificationWithIconSuccess = (placement, list) => {
    notification.success({
      message: `Added to ${list}`,
      description: "Good pick!",
      placement,
    });
  };

  const openNotificationWithIconFail = (placement, list) => {
    notification.warning({
      message: `Couldn't add to ${list}`,
      description: `Please login or register an account to add onto a ${list}`,
      placement,
    });
  };

  const checkLoggedIn = (list, passObject) => {
    if (Object.keys(props.userData).length > 0) {
      let firebasekey = Object.keys(props.userData)[0];
      let userId = passObject.id;
      openNotificationWithIconSuccess("bottomRight", list);
      if (props.userData[firebasekey][list]) {
        props.userData[firebasekey][list][userId] = passObject;
      } else {
        props.userData[firebasekey][list] = {};
        props.userData[firebasekey][list][userId] = passObject;
      }
      var db = firebase.database();
      db.ref(`items/${firebasekey}/${list}/${userId}`).set(passObject);
      let newProp = {};
      const itemsRef = firebase.database().ref("items");
      // if value matches anything in the snapshot.val(())
      itemsRef.on("value", (snapshot) => {
        for (let i in snapshot.val()) {
          if (i === firebasekey) {
            newProp[i] = snapshot.val()[i];
          }
        }
      });

      props.updateUserData(newProp);
    } else {
      openNotificationWithIconFail("bottomRight", list);
    }
  };

  return (
    <>
      <div className="search-section">
        <h1>{props.genre}</h1>
        <div className="row1 search">
          <div className="item-card">
            {results ? (
              results.map((item, index) => {
                const resultArrayRating = item.average_rating;
                const resultArrayAuthor = item.best_book[0].author[0].name;
                const resultArrayTitle = item.best_book[0].title;
                const resultArrayId = item.best_book[0].id[0]._;
                const resultArrayImage = item.best_book[0].image_url[0];
                const resultArrayYear = item.original_publication_year[0]._;
                let passObject = {};
                passObject.rating = resultArrayRating;
                passObject.title = resultArrayTitle;
                passObject.image = resultArrayImage;
                passObject.year = resultArrayYear;
                passObject.id = resultArrayId;
                passObject.author = resultArrayAuthor;

                return (
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    key={index}
                    cover={<img alt="example" src={resultArrayImage} />}
                  >
                    <Card.Meta title={resultArrayTitle} />
                    <Button
                      type="text"
                      onClick={() => {
                        checkLoggedIn("wishlist", passObject);
                      }}
                    >
                      + WishList
                    </Button>
                    <Button
                      type="text"
                      onClick={() => {
                        checkLoggedIn("havelist", passObject);
                      }}
                    >
                      + Have List
                    </Button>
                    <Card.Meta description={`by ${resultArrayAuthor}`} />
                    <Card.Meta description={`${resultArrayRating}/5`} />
                    {resultArrayYear && (
                      <Card.Meta
                        description={`Published on ${resultArrayYear}`}
                      />
                    )}
                  </Card>
                );
              })
            ) : (
              <div>
                <Empty />
                <span>Couldn't find any books with {props.genre}</span>
                <MehOutlined />
              </div>
            )}
          </div>
        </div>
        <Space></Space>
      </div>
    </>
  );
}

export default SearchTitle;
