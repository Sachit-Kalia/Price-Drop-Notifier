console.log('content script ran successfully');
var url = window.location.href;
console.log('url is: ', url);

if(url.includes('amazon.in/gp/registry/wishlist?')){
    
     let wishlist = [];
     
     var allProducts = document.querySelectorAll(".a-fixed-left-grid-inner");
     console.log(allProducts);
     
     for(let i=0; i<allProducts.length; i++){
          let item = {};
          let cleanedUpValues = allProducts[i].innerText.split("\n");
          item.title = cleanedUpValues[0];
          item.cost = cleanedUpValues[cleanedUpValues.indexOf('Buy it again')-1];
          item.link = allProducts[i].firstElementChild.firstElementChild.firstElementChild.href;
         

          wishlist.push(item);
          console.log(item);
     }
     
     chrome.runtime.sendMessage({type: "fullWishlist", data: wishlist},
       (res)=>{
           console.log("Sending wishlist to background: ", res);
       } 
     );

}