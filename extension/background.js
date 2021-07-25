chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.type) {
    case "login":
      console.log("Login data from popup is: ", msg.data);
      $.ajax({
        url: "http://localhost:3000/user/login",
        data: { test: msg.data },
        type: "POST",
        success: (res) => {
          console.log("response: ", res);
        },
        error: (res) => {
          console.log("response: ", res);
        },
      });
      return true;
      break;
    case "signup":
      console.log("Signup data from popup is: ", msg.data);
      $.ajax({
        url: "http://localhost:3000/user/signup",
        data: { test: msg.data },
        type: "POST",
        success: (res) => {
          console.log("response: ", res);
        },
        error: (res) => {
          console.log("response: ", res);
        },
      });
      return true;
      break;
    default:
      console.log("No data received");
  }
});
