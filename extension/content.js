console.log("content script ran successfully");
let url = window.location.href;
console.log("url is: ", url);

if (
  url.includes("amazon.in/gp/registry/wishlist?") ||
  url.includes("https://www.amazon.in/hz/wishlist/genericItemsPage")
) {
  let wishlist = [];
  let allProducts = document.querySelectorAll(".a-fixed-left-grid-inner");

  console.log(allProducts);
  for (let i = 1; i < allProducts.length; i += 2) {
    let item = {};
    let cleanedUpValues = allProducts[i].innerText.split("\n");
    console.log(cleanedUpValues);
    let n = cleanedUpValues.length;
    item.title = cleanedUpValues[0];
    let s1 = "";
    for (let j = 0; j < n; j++) {
      if (cleanedUpValues[j][0] === "₹") {
        item.cost = cleanedUpValues[j].substr(1);
        break;
      }
    }
    item.link =
      allProducts[
        i
      ].children[1].children[2].children[0].children[0].children[0].children[0].children[0].children[0].firstElementChild.href;
    if (
      i + 1 < allProducts.length &&
      allProducts[i + 1].children[1].children[0].children[0]
    ) {
      item.image = allProducts[i + 1].children[1].children[0].children[0].src;
    } else {
      item.image = "";
    }

    wishlist.push(item);
  }

  chrome.runtime.sendMessage(
    { type: "fullWishlist", data: wishlist },
    (res) => {
      console.log("Sending wishlist to background: ", res);
    }
  );
}
