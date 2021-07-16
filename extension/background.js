console.log("Background script is running !!");

$.ajax({
    url: "http://localhost:3000/products",
    data: {test: "This is test data"},
    type: 'POST',
    success: (res)=>{
        console.log('response: ', res)
    },
    error : (res)=>{
        console.log('response: ', res)
    }
});