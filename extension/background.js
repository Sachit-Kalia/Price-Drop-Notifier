// const { connection } = require("mongoose");

console.log("Background script is running !!");

// $.ajax({
//   url: "http://localhost:3000/products",
//   data: { test: res},
//   type: "POST",
//   success: (resp) => {
//     console.log("response: ", resp);
//   },
//   error: (resp) => {
//     console.log("response: ", resp);
//   },
// });

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    case "popupInit":
      console.log("ran onPopupInit Case in background.js");
      sendResponse(getStorageItem("user"));
      return true;
      break;
    case "login":
      console.log("login data got from popup is: ", msg.data);
      $.ajax({
        url: "http://localhost:3000/user/login",
        data: msg.data,
        type: "POST",
        headers: {
          token: "",
        },
        success: (res) => {
          console.log("response: ", res);
          setStorageItem("user", res);
          sendResponse(res);
        },
        error: (res) => {
          console.log("response: ", res);
        },
      });
      return true;
      break;

    case "signup":
      console.log("signup data got from popup is: ", msg.data);
      $.ajax({
        url: "http://localhost:3000/user/signup",
        data: msg.data,
        type: "POST",
        headers: {
          token: "",
        },
        success: (res) => {
          console.log("response: ", res);
          setStorageItem("dropList", res);
          sendResponse(res);
        },
        error: (res) => {
          console.log("response: ", res);
        },
      });
      return true;
      break;

    case "checkPriceDrop":
      console.log("message: ", msg);
      chrome.tabs.create({
        url: "https://www.amazon.in/gp/registry/wishlist?",
      });
      return true;
      break;

    case "fullWishlist":
      console.log("wishlist recieved: ", msg);
      $.ajax({
        url: "http://localhost:3000/product/wishlist",
        data: { data: msg.data, email: getStorageItem("user") },
        type: "POST",
        success: (res) => {
          console.log("response: ", res);  
          sendResponse(res);
        },
        error: (res) => {
          console.log("response: ", res);
        },
      });
      return true;
      break;

    default:
      console.log("No data recieved");
  }
});

function getStorageItem(varName) {
  return JSON.parse(localStorage.getItem(varName));
}

function setStorageItem(varName, data) {
  console.log("varName: ", varName);
  if (varName != "searchPageData") {
    console.log("data", data);
    window.localStorage.setItem(varName, JSON.stringify(data));
  }
}
