import axios from "axios";

const axiosInstance = axios.create({
  //local instance of firebase functions
   baseURL: "http://127.0.0.1:5001/clone-c5e9d/us-central1/api",
  // deployed function of firebase function
  // baseURL: "https://api-l5ac5sgk3q-uc.a.run.app/",
  //deployed version of amazon server on render.com
 // baseURL: "https://amazon-api-delpoy.onrender.com",
});

export { axiosInstance };



// pk_test_51QcvBbJvY5Ey3CvvPpRcImB6onwRN4ZQKVx7XvCqCexeeyx53fzECLVpFumrROdifOJVmpZDPpeZjoHDdbLL9Ic600LXKGWEEl


//API keys
//Learn more about API authentication
//Standard keys
//Create a key that unlocks full API access, enabling extensive interaction with your account. Learn more
//Name
//Token
//Last Used
//Created
// Publishable key
// pk_test_51QcvBbJvY5Ey3CvvPpRcImB6onwRN4ZQKVx7XvCqCexeeyx53fzECLVpFumrROdifOJVmpZDPpeZjoHDdbLL9Ic600LXKGWEEl
// —
// Jan 2

// More options
// Secret key
// sk_test_51QcvBbJvY5Ey3Cvvq2dCG7KH8tt2Rb31A18QYgcnRWyRO3qMxw1h5W8c9s8xhXrYzyrhlTc6LKtPWiVG4Wh40rQP00k6abnyRW
// —
// Jan 2

// More options
