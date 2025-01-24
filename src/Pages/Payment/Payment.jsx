 import React, { useContext, useState } from "react";
 import classes from "./Payment.module.css";
 import LayOut from "../../LayOut/LayOut";
 import { DataContext } from "../../Components/DataProvider/DataProvider";
 import ProductCard from "../../Components/Product/ProductCard";
 import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
 import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
 import { axiosInstance } from "../../Api/axios";
 import {ClipLoader} from 'react-spinners'
 import { db } from "../../Utility/firebase";
 import { useNavigate } from "react-router-dom";
 import { Type } from "../../Utility/action.type";

 function Payment() {
   const [{ user, basket }, dispatch] = useContext(DataContext);
   console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
   }, 0);

   const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
   const navigate = useNavigate();

   const handleChange = (e) => {
     // console.log(e);
     e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
   };

   const handlePayment = async (e) => {
     e.preventDefault();

     try {
       setProcessing(true);
       // 1. backend || functions ---->contact to the client secret
       const response = await axiosInstance({
         method: "POST",
         url: `payment/create?total=${total * 100}`,
       });
       // console.log(response.data);
       const clientSecret = response.data?.clientSecret;

       //2.client side (react side confirmation)

       const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
           card: elements.getElement(CardElement),
         },
       });

       // console.log(paymentIntent);

       //3. after the confirmation--> order  database clear the basket
           await db
             .collection("users")
             .doc(user.uid)
             .collection("orders")
             .doc(paymentIntent.id)
             .set({
               basket: basket,
               amount: paymentIntent.amount,
               created: paymentIntent.created,
             });
           // empty the basket
           dispatch({ type: Type.EMPTY_BASKET });

       setProcessing(false);
       navigate("/orders", {state:{msg:"Order Placed Successfully"}});
     } catch (err) {
       console.log(err);
       setProcessing(false);
     }
   };

  return (
     <LayOut>
       {/* header */}
       <div className={classes.payment_header}>Checkout({totalItem})items</div>
      {/* payment method */}
       <section className={classes.payment}>
         {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
           <div>
             <div>{user?.email}</div>
            <div>123 SEminary Rd</div>
            <div>Alexandria, VA</div>
           </div>
         </div>
         <hr />

         {/* product */}
         <div className={classes.flex}>
           <h3>Review items and delivery</h3>
           <div>
             {basket?.map((item) => (
                 <ProductCard  product={item} flex={true} />
             ))}
           </div>
         </div>
         <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
           <div className={classes.payment__card__container}>
             <div className={classes.payment__details}>
               <form onSubmit={handlePayment}>
                 {/* error */}
                 {cardError && (
                   <small style={{ color: "red" }}>{cardError}</small>
                 )}
                 {/* card element */}
                <CardElement onChange={handleChange} />

                 {/* price */}
                 <div className={classes.payment__price}>
                   <div>
                     <span style={{ display: "flex", gap: "10px" }}>
                       <p>Total Order |</p> <CurrencyFormat amount={total} />
                     </span>
                  </div>
                   <button type="submit">
                    {processing ? (
                       <div className={classes.loading}>
                         <ClipLoader color="gray" size={12} />
                         <p>Please wait ...</p>
                       </div>
                     ) : (
                       "Pay Now"
                     )}
                   </button>
                 </div>
               </form>
             </div>
           </div>
        </div>
       </section>
     </LayOut>
   );
}

 export default Payment;




// import React, { useContext, useState } from "react";
// import classes from "./Payment.module.css";
// import LayOut from "../../LayOut/LayOut";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// import { axiosInstance } from "../../Api/axios";
// import { ClipLoader } from "react-spinners";
// import { db } from "../../Utility/firebase";
// import { useNavigate } from "react-router-dom";
// import { Type } from "../../Utility/action.type";

// function Payment() {
//   const [{ user, basket }, dispatch] = useContext(DataContext);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const totalItem = (basket || []).reduce((amount, item) => item.amount + amount, 0);
//   const total = (basket || []).reduce((amount, item) => item.price * item.amount + amount, 0);

//   const handleChange = (e) => {
//     setCardError(e?.error?.message || "");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     try {
//       setProcessing(true);

//       // Fetch client secret from the backend
//       const response = await axiosInstance.post(`/payment/create?total=${total * 100}`);
//       const clientSecret = response.data?.clientSecret;

//       // Confirm card payment
//       const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       // Save order details in Firestore
//       await db
//         .collection("users")
//         .doc(user?.uid)
//         .collection("orders")
//         .doc(paymentIntent.id)
//         .set({
//           basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         });

//       // Clear the basket
//       dispatch({ type: Type.EMPTY_BASKET });

//       setProcessing(false);
//       navigate("/orders", { state: { msg: "Order Placed Successfully" } });
//     } catch (err) {
//       console.error(err);
//       setProcessing(false);
//     }
//   };

//   return (
//     <LayOut>
//       <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
//       <section className={classes.payment}>
//         {/* Delivery Address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 Seminary Rd</div>
//             <div>Alexandria, VA</div>
//           </div>
//         </div>
//         <hr />

//         {/* Review Items */}
//         <div className={classes.flex}>
//           <h3>Review Items and Delivery</h3>
//           <div>
//             {(basket || []).map((item, index) => (
//               <ProductCard key={index} product={item} flex={true} />
//             ))}
//           </div>
//         </div>
//         <hr />

//         {/* Payment Method */}
//         <div className={classes.flex}>
//           <h3>Payment Methods</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 {cardError && <small style={{ color: "red" }}>{cardError}</small>}
//                 <CardElement onChange={handleChange} />
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order |</p>
//                       <CurrencyFormat amount={total} />
//                     </span>
//                   </div>
//                   <button type="submit" disabled={processing || !stripe || !elements}>
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="gray" size={12} />
//                         <p>Please wait ...</p>
//                       </div>
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;

