console.log("content script ran successfully");
let url = window.location.href;
console.log("url is: ", url);

if (
  url.includes("amazon.in/gp/registry/wishlist?") ||
  url.includes("https://www.amazon.in/hz/wishlist/genericItemsPage")
) {
  let wishlist = [];
  let allProducts = document.querySelectorAll(".a-fixed-left-grid-inner");
  // let mappedLinks = 

//   console.log(allProducts);
  for (let i = 1; i < allProducts.length; i += 2) {
    let item = {};
    let cleanedUpValues = allProducts[i].innerText.split("\n");
//     console.log(cleanedUpValues);
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
      console.log("Recieved from background: ", res);
      if(res.length === 0){
           alert("No price drop found");
      }else{
          // setTimeout(function(){ 
          //      window.location.href = "http://localhost:3000/products";
          //      }, 
          //  3000);
          let alertMessage = "The products with drop in their prices:\n\n";
          for(let i = 0; i < res.length; i++){
               alertMessage +=  res[i].title.substr(0, 50) + "..." + "\n₹" + res[i].price + "\n\n";
          }
          alert(alertMessage);

          for(let i=0; i<res.length; i++){
            for(let j=1; j<allProducts.length; j+=2){
                 let splitTitle = allProducts[j].innerText.split("\n");
                 console.log("SplitTitle: ", splitTitle[0], " resTitle: ", res[i].title);
                 if(res[i].title === splitTitle[0]){
                    console.log("Same Title");
                    allProducts[j].style["border"] = "3px solid green";
                    allProducts[j].style["background-color"] = "#d2f8d2";
                 }
            }
          }
      }
      
    }
  );
}
