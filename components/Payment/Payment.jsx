// import React, { useState } from 'react'
// import axios from 'axios'
// import
// {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   PaymentElement,
//   cardElement,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useSelector } from 'react-redux';
// import { useRef } from 'react';
// function Payment()
// {
//   const elements = useElements();
//   const stripe = useStripe();
//   const [nameOnCard, setNameOnCard] = useState("");
//   const { total } = useSelector(state => state.products.cart)
//   const payBtn = useRef(null);

//   const submitHandler = async (e) =>
//   {
//     e.preventDefault();

//     // payBtn.current.disabled = true;
//     // const { shippingInfo } = order

//     // try
//     // {
//     const paymentData = total
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const { data } = await axios.post(
//       "/api/checkout_session",
//       paymentData,
//       config
//     );

//     //   const client_secret = data.client_secret;

//     //   if (!stripe || !elements) return;

//     //   const result = await stripe.confirmCardPayment(client_secret, {
//     //     payment_method: {
//     //       card: elements.getElement(CardNumberElement),
//     //       billing_details: {
//     //         name: user.name,
//     //         email: user.email,
//     //         address: {
//     //           line1: shippingInfo.address,
//     //           city: shippingInfo.city,
//     //           state: shippingInfo.state,
//     //           postal_code: shippingInfo.pinCode,
//     //           country: shippingInfo.country,
//     //         },
//     //       },
//     //     },
//     //   });
//     //   // ? before we make create order. we need to know does the payment 'succeed'? or not. case yes so we will create the order , else{ we won't create the order } 
//     //   if (result.error)
//     //   {
//     //     payBtn.current.disabled = false;
//     //     // ! case payment has error : toast this error 
//     //     toast.error(result.error.message);
//     //   } else
//     //   {
//     //     // * case payment succeeed : make the status = success and dispatch the create order action 
//     //     if (result.paymentIntent.status === "succeeded")
//     //     {
//     //       order.paymentInfo = {
//     //         id: result.paymentIntent.id,
//     //         status: result.paymentIntent.status,
//     //       };

//     //       dispatch(createOrder(order));
//     //       dispatch(clearCart());

//     //       navigate("/success");
//     //     } else
//     //     {
//     //       toast.error("There's some issue while processing payment ");
//     //     }
//     //   }
//     // } catch (error)
//     // {
//     //   payBtn.current.disabled = false;
//     //   toast.error(error);

//     // }
//   };


//   return (
//     <div className='payment'>
//       <div className="container">
//         <div className="h3">
//           pay with card
//         </div>
//         <div className="payment__form">
//           <form className='payment__form__name'>
//             <input
//               name="nameOnCard"
//               className="stripe-pay__row-input"
//               type="text"
//               value={nameOnCard}
//               onChange={(e) => onNameOnCard(e)}
//               placeholder="Name"
//               required={true}
//             />
//           </form>
//           <form className="payment__form__stripe" onSubmit={(e) => submitHandler(e)}>

//             <div>
//               {/* <CreditCardIcon /> */}
//               <CardNumberElement className="payment__form__stripe__input" />
//             </div>
//             <div>
//               {/* <EventIcon /> */}
//               <CardExpiryElement className="payment__form__stripe__input" />
//             </div>
//             <div>
//               {/* <VpnKeyIcon /> */}
//               <CardCvcElement className="payment__form__stripe__input" />
//             </div>

//             {/* {isLoading ? (
//               // <Spinner />
//             <div>loading ....</div>
//             ) : ( */}
//             <input
//               type="submit"
//               ref={payBtn}
//               className="payment__form__stripe__btn"
//               value='submit payment'
//             />
//             {/* )} */}
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Payment