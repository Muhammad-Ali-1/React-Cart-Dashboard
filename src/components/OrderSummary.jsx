import React, { useState } from "react";
import paymentIconGrey from "../assets/paymentIconGrey.svg";
import paymentIconOrange from "../assets/paymentIconOrange.svg";
import orderIconGrey from "../assets/orderIconGrey.svg";
import orderIconOrange from "../assets/orderIconOrange.svg";
import historyIconGrey from "../assets/historyIconGrey.svg";
import historyIconOrange from "../assets/historyIconOrange.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import saveIcon from "../assets/saveIcon.svg";
import payIcon from "../assets/payIcon.svg";
import crossIcon from "../assets/crossIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  deleteFromCart,
  emptyCart,
  updateHistory,
} from "../features/cart/cartSlice";

const OrderSummary = () => {
  const [isMemberChecked, setIsMemberChecked] = useState(false);
  const [isDayEventChecked, setIsDayEventChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [userName, setUserName] = useState("");
  const [userMobileNumber, setUserMobileNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const handleMemberChange = () => {
    setIsMemberChecked(!isMemberChecked);
  };

  const handleDayEventChanged = () => {
    setIsDayEventChecked(!isDayEventChecked);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    selectCartTab();
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const orderItems = useSelector((state) => state.cart.orderItems);
  const history = useSelector((state) => state.cart.history);
  const dispatch = useDispatch();

  const handleQuantityChange = (quantity, id) => {
    quantity = Math.max(quantity, 1);
    dispatch(updateQuantity({ id, quantity }));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    let totalPrice = calculateTotalPrice();
    let memberDiscount = isMemberChecked ? totalPrice * 0.1 : 0;
    let dayTimeDiscount = isDayEventChecked ? totalPrice * 0.2 : 0;

    return totalPrice - memberDiscount - dayTimeDiscount;
  };

  const [isCartSelected, setisCartSelected] = useState(true);
  const [isCheckOutSelected, setisCheckOutSelected] = useState(false);
  const [isHistorySelected, setIsHistorySelected] = useState(false);

  const selectCartTab = () => {
    setisCartSelected(true);
    setisCheckOutSelected(false);
    setIsHistorySelected(false);
  };
  const selectCheckoutTab = () => {
    if (cartItems.length > 0) {
      setisCartSelected(false);
      setisCheckOutSelected(true);
      setIsHistorySelected(false);
    }
  };
  const selectHistoryTab = () => {
    setisCartSelected(false);
    setisCheckOutSelected(false);
    setIsHistorySelected(true);
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      selectCheckoutTab();
    }
  };

  const handleCheckoutBack = () => {
    selectCartTab();
  };

  const handleGoToPlaceOrder = () => {
    selectCartTab();
  };

  // const handleCompleteOrder = (e) => {
  //   e.preventDefault();

  //   if (paymentMethod == "cod") {
  //     if (cartItems.length > 0) {
  //       setOrder([...cartItems]);
  //       setIsModalOpen(true);
  //       dispatch(emptyCart());
  //       setUserName("");
  //       setUserMobileNumber("");
  //       setUserAddress("");
  //     } else {
  //       console.log("Cart is empty");
  //     }
  //   }
  // };
  const handleCompleteOrder = (e) => {
    e.preventDefault();

    if (paymentMethod === "cod") {
      if (cartItems.length > 0) {
        dispatch(
          updateHistory({
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            items: [...cartItems],
            total: calculateTotalPrice(),
            discount:
              (isMemberChecked ? calculateTotalPrice() * 0.1 : 0) +
              (isDayEventChecked ? calculateTotalPrice() * 0.2 : 0),
          })
        );

        setOrder([...cartItems]);
        setIsModalOpen(true);
        dispatch(emptyCart());
        setUserName("");
        setUserMobileNumber("");
        setUserAddress("");
      } else {
        console.log("Cart is empty");
      }
    }
  };

  let orderPrice = 0;
  order.map((item) => (orderPrice = orderPrice + item.price * item.quantity));
  let orderDiscount1 = isMemberChecked ? orderPrice * 0.1 : 0;
  let orderDiscount2 = isDayEventChecked ? orderPrice * 0.2 : 0;

  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div className="w-5/12 mb-5 mt-2 ml-3 flex flex-col h-screen">
      <div className="top flex justify-between pl-10 pr-10 mb-5">
        <button
          onClick={selectCartTab}
          className={`flex items-center gap-2 pt-2 pb-2 pl-5 pr-5 rounded-lg text-sm ${
            isCartSelected ? "bg-white" : ""
          }`}
        >
          <img
            src={isCartSelected ? orderIconOrange : orderIconGrey}
            alt="Payment"
          />
          <h2 className={isCartSelected ? "red-text font-medium" : ""}>Cart</h2>
        </button>
        <button
          onClick={selectCheckoutTab}
          className={`flex items-center gap-2 pt-2 pb-2 pl-5 pr-5 rounded-lg text-sm ${
            isCheckOutSelected ? "bg-white" : ""
          }`}
        >
          <img
            src={isCheckOutSelected ? paymentIconOrange : paymentIconGrey}
            alt="Place Order"
          />
          <h2 className={isCheckOutSelected ? "red-text font-medium" : ""}>
            Check out
          </h2>
        </button>

        <button
          onClick={selectHistoryTab}
          className={`flex items-center gap-2 pt-2 pb-2 pl-5 pr-5 rounded-lg text-sm ${
            isHistorySelected ? "bg-white" : ""
          }`}
        >
          <img
            src={isHistorySelected ? historyIconOrange : historyIconGrey}
            alt="History"
          />
          <h2 className={isHistorySelected ? "red-text font-medium" : ""}>
            History
          </h2>
        </button>
      </div>
      {isCartSelected && (
        <>
          <div className="flex flex-col flex-1 overflow-hidden fade-in">
            <div className="cart-top text-white rounded-tr-lg rounded-tl-lg pt-3 pb-3 pl-7 pr-7">
              <h2 className="text-lg font-semibold">New Order</h2>
              <p className="text-sm text-white">{formattedDate}</p>
            </div>
            <div className="cart-content flex-1 overflow-y-auto pt-2 pb-2 pr-4 pl-4">
              {cartItems.map((item) => (
                <div key={item.id} className="">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 fade-in">
                    <div className="flex items-center gap-3">
                      <button onClick={() => dispatch(deleteFromCart(item.id))}>
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                      <div className="flex flex-col">
                        <h2 className="text-md font-bold text-gray-700">
                          {item.name}
                        </h2>
                        <h4 className="text-sm text-gray-400">
                          @ {item.price}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <input
                        type="number"
                        className="w-12 outline-none border rounded-md pl-2"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(e.target.value, item.id)
                        }
                      />
                      <h2 className="text-md font-semibold w-16 text-right">
                        {item.price * item.quantity}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full bg-white p-5 flex flex-col gap-2 mb-40">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Subtotal</p>
              <h2 className="text-base font-semibold">
                {calculateTotalPrice()}
              </h2>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isDayEventChecked}
                  onChange={handleDayEventChanged}
                  className="h-4 w-4"
                />
                <p className="text-sm text-gray-500">Day Event</p>
              </div>
              <h2 className="text-base font-medium red-text">
                {isDayEventChecked ? "-20%" : "0%"}
              </h2>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isMemberChecked}
                  onChange={handleMemberChange}
                  className="h-4 w-4"
                />
                <p className="text-sm text-gray-500">Member</p>
              </div>
              <h2 className="text-base font-medium red-text">
                {isMemberChecked ? "-10%" : "0%"}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Total</p>
              <h2 className="text-2xl font-semibold red-text">
                {calculateTotal()}
              </h2>
            </div>
            <div className="flex justify-center gap-5">
              {/* <button className="flex items-center justify-center h-11 rounded-md w-32 border border-red-500 gap-2">
                <img src={saveIcon} alt="Save" />
                <h3>Save</h3>
              </button> */}
              <button
                onClick={handleCheckout}
                className="flex items-center justify-center h-11 rounded-md w-44 bg-green-500 text-white gap-2"
              >
                <img src={payIcon} alt="Pay" />
                <h3>Check out</h3>
              </button>
            </div>
          </div>
        </>
      )}

      {isCheckOutSelected && (
        <>
          <>
            <div className="flex flex-col flex-1 overflow-hidden fade-in">
              <div className="cart-top text-white rounded-tr-lg rounded-tl-lg pt-3 pb-3 pl-7 pr-7">
                <h2 className="text-lg font-semibold">Check out</h2>
                <p className="text-sm text-white">{formattedDate}</p>
              </div>
              <div className="cart-content flex-1 overflow-y-auto pt-1 pb-1 pr-4 pl-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="fade-in">
                    <div className="flex items-center justify-between pt-2 pb-2 pl-4 pr-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <h2 className="text-md font-bold text-gray-700">
                            {item.name}
                          </h2>
                          <h4 className="text-sm text-gray-400">
                            @ {item.price}
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-10">
                        <h3>x{item.quantity}</h3>
                        <h2 className="text-md font-semibold w-16 text-right">
                          {item.price * item.quantity}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full bg-white p-5 pb-0 flex flex-col gap-2 mb-40">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Subtotal</p>
                <h2 className="text-base font-semibold">
                  {calculateTotalPrice()}
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Discount:</p>
                <h2 className="text-base font-semibold">
                  -
                  {(isMemberChecked ? calculateTotalPrice() * 0.1 : 0) +
                    (isDayEventChecked ? calculateTotalPrice() * 0.2 : 0)}
                </h2>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Total</p>
                <h2 className="text-2xl font-semibold red-text">
                  {calculateTotal()}
                </h2>
              </div>
              <hr />
              <div className="mt-2 mb-4">
                <form className="w-full" onSubmit={handleCompleteOrder}>
                  <div className="flex">
                    <input
                      required
                      type="text"
                      className="text-sm w-3/5 border-gray-300 border outline-none pt-1 pb-1 pl-3 pr-3 rounded-md mb-2 mr-3 "
                      placeholder="Enter Name... "
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                      required
                      type="number"
                      className="text-sm w-2/5 border-gray-300 border outline-none pt-1 pb-1 pl-3 pr-3 rounded-md mb-2"
                      placeholder="Enter Mobile Number... "
                      value={userMobileNumber}
                      onChange={(e) => setUserMobileNumber(e.target.value)}
                    />
                  </div>
                  <input
                    required
                    type="text"
                    className="text-sm w-full border-gray-300 border outline-none pt-1 pb-1 pl-3 pr-3 rounded-md"
                    placeholder="Enter Delivery Address ... "
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                  <div className="flex gap-6 items-center mt-4">
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          className="mr-2"
                          defaultChecked
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Cash on delivery
                      </label>
                    </div>
                    <div>
                      {/* <label>
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          className="mr-2"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Pay with Card
                      </label> */}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center gap-5">
                    <button
                      onClick={handleCheckoutBack}
                      className="flex items-center justify-center h-11 rounded-md w-32 border border-red-500 gap-2"
                    >
                      <h3>Back</h3>
                    </button>
                    <button className="flex items-center justify-center h-11 rounded-md w-44 bg-green-500 text-white gap-2">
                      <h3>Complete Order</h3>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center fade-in">
                <div className="bg-white rounded-lg shadow-lg w-2/3">
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold"> </h2>
                      <button onClick={closeModal}>
                        <img src={crossIcon} alt="Close" />
                      </button>
                    </div>
                    <div className="flex items-center flex-col justify-center mb-10">
                      <h1 className="text-2xl font-semibold mb-4">
                        Your Order has been placed!
                      </h1>
                      <h1 className="text-xl font-medium">Order Summary</h1>
                    </div>

                    <div>
                      <div className="flex mb-6">
                        <p className="w-1/12 font-semibold">No.</p>
                        <p className="w-8/12 font-semibold">Item Name</p>
                        <p className="w-2/12 font-semibold">Quantity</p>
                        <p className="w-3/12 font-semibold text-right">
                          Total Price
                        </p>
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        {order.map((item, index) => (
                          <div key={index} className="flex mb-2 w-full">
                            <p className="w-1/12">{index + 1}.</p>
                            <p className="w-8/12">{item.name}</p>
                            <p className="w-2/12">{item.quantity}</p>
                            <p className="w-3/12 text-right">
                              {item.price * item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                      <hr className="mt-3 mb-3" />

                      <div className="flex flex-col justify-between w-full">
                        <div className="flex mb-2 w-full">
                          <p className="w-1/12"></p>
                          <p className="w-8/12"></p>
                          <p className="w-2/12 font-semibold">Subtotal:</p>
                          <p className="w-3/12 font-semibold text-right">
                            {orderPrice}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex mb-2 w-full">
                          <p className="w-1/12"></p>
                          <p className="w-8/12"></p>
                          <p className="w-2/12 font-semibold">Discount:</p>
                          <p className="w-3/12  text-right">
                            - {orderDiscount1 + orderDiscount2}
                          </p>
                        </div>
                      </div>
                      <hr className="mt-3 mb-3" />
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex mb-2 w-full">
                          <p className="w-1/12"></p>
                          <p className="w-8/12"></p>
                          <p className="w-2/12 font-semibold">Total:</p>
                          <p className="w-3/12 font-semibold text-right">
                            {orderPrice - orderDiscount1 - orderDiscount2}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>

          {/* (
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="cart-top text-white rounded-tr-lg rounded-tl-lg pt-3 pb-3 pl-7 pr-7">
                <h2 className="text-lg font-semibold">Check out</h2>
                <p className="text-sm text-white">{formattedDate}</p>
              </div>
              <div className="w-full h-full bg-white p-5 flex flex-col items-center justify-center mb-32">
                <h3 className="text-xl font-semibold mb-4">Cart is Empty!!</h3>
                <button
                  onClick={handleGoToPlaceOrder}
                  className="flex items-center justify-center h-11 rounded-md w-44 bg-green-500 text-white gap-2"
                >
                  <h3>Place Order</h3>
                </button>
              </div>
            </div>
          ) */}
        </>
      )}
      {isHistorySelected && (
        <div className="flex flex-col flex-1 overflow-hidden fade-in">
          <div className="cart-top text-white rounded-tr-lg rounded-tl-lg pt-3 pb-3 pl-7 pr-7">
            <h2 className="text-lg font-semibold">History</h2>
            <p className="text-sm text-white">{formattedDate}</p>
          </div>

          <div className="w-full h-full bg-white p-5 flex flex-col gap-0 mb-40 overflow-y-auto">
            {history.length > 0 ? (
              history.map((order, index) => (
                <div key={index} className="mb-0">
                  <div className="flex flex-col items-center justify-center mb-2">
                    <h3 className="font-semibold red-text">{order.date}</h3>
                    <h3 className="text-sm italic red-text">{order.time}</h3>
                  </div>
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between pt-0 pb-1 pl-4 pr-4 border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <h2 className="text-md font-medium text-gray-700">
                            {item.name}
                          </h2>
                          {/* <h4 className="text-sm text-gray-400">@ {item.price}</h4> */}
                        </div>
                      </div>
                      <div className="flex items-center gap-10 text-gray-700">
                        <h3>x{item.quantity}</h3>
                        <h2 className="text-md w-16 text-right">
                          {item.price * item.quantity}
                        </h2>
                      </div>
                    </div>
                  ))}
                  <div className="mt-3">
                    <div className="pl-4 pr-4 flex mt-1 justify-end">
                      <div className="flex justify-between items-center w-1/2 ">
                        <p className="text-base">Subtotal:</p>
                        <h2 className="text-base font-medium">{order.total}</h2>
                      </div>
                    </div>
                    <div className="pl-4 pr-4 flex mt-1 justify-end">
                      <div className="flex justify-between items-center w-1/2 ">
                        <p className="text-base">Discount:</p>
                        <h2 className="text-base font-medium">
                          - {order.discount}
                        </h2>
                      </div>
                    </div>
                    <div className="pl-4 pr-4 flex mt-1 justify-end">
                      <div className="flex justify-between items-center w-1/2 ">
                        <p className="text-base red-text">Total:</p>
                        <h2 className="text-base font-semibold red-text">
                          {order.total - order.discount}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-4 mb-4" />
                </div>
              ))
            ) : (
              <p>No history available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
