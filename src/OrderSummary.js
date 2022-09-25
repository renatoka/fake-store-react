import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { cartItems, cartTotalAmount } from './Main';


export default function OrderSummary() {

  const navigate = useNavigate();
  const [todaysDate, setTodaysDate] = useState('');
  const discountValue = useRef();

  const [discountMessage, setDiscountMessage] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountName, setDiscountName] = useState('');

  const handleDiscount = (e) => {
    e.preventDefault()
    if (discountValue.current.value.toLowerCase() === 'student') {
      setDiscountMessage('Discount applied.')
      setDiscountApplied(true);
      setDiscountName(discountValue.current.value)

    } else {
      setDiscountMessage('Invalid discount code. Please try again.')
      setDiscountApplied(false);
    }
  }

  const getTodaysDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const todaysDate = `Date: ${day}/${month}/${year}`;
    setTodaysDate(todaysDate)
    console.log(cartTotalAmount)
    console.log(cartItems)
  }

  useEffect(() => {
    getTodaysDate()
  }, [])

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order #13432</h1>
        <p className="text-base font-medium leading-6 text-gray-600">{todaysDate}</p>
        <p className="text-base font-medium leading-6 text-gray-600" onClick={() => navigate('/')}>Go Back</p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
            {
              cartItems.map((item, index) => {
                return (
                  <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full" key={index}>
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img className="hidden md:block" src={item.image} alt="dress" style={{ width: '100px', height: '100px' }} />
                      <img className="md:hidden" src={item.image} alt="dress" style={{ width: '100px', height: '100px' }} />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{item.title}</h3>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">
                          € {item.price}
                        </p>
                        <p className="text-base xl:text-lg leading-6 text-gray-800">{item.quantity}x</p>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">€ {item.quantity * item.price}</p>
                        
                      </div>
                    </div>
                  </div>
                )
              }
              )
            }
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">€ {cartTotalAmount.toFixed(2)}</p>
                </div>
                {
                  <>
                    {
                      discountApplied ? (
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">{discountName.toUpperCase()}</span></p>
                          <p className="text-base leading-4 text-gray-600"><span className="text-green-500 text-xs font-medium">(15%)</span> € {(cartTotalAmount * 0.15).toFixed(2)}</p>
                        </div>
                      ) : (
                        <></>
                      )
                    }
                  </>
                }
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">€ 5.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                {
                  discountApplied ? (
                    <p className="text-base font-semibold leading-4 text-gray-800">€ {(cartTotalAmount - (cartTotalAmount * 0.15) + 5).toFixed(2)}</p>
                  ) : (
                    <p className="text-base font-semibold leading-4 text-gray-800">€ {(cartTotalAmount + 5).toFixed(2)}</p>
                  )
                }
              </div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-base font-medium">Pay now</button>
            </div>
            <div className="px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Got a discount code?</h3>
              <div className="flex items-center w-full gap-5">
                <input type="text" className="w-full border border-gray-200 rounded-md px-4 py-2 text-base leading-4 text-gray-800" placeholder="Enter your code" ref={discountValue} />
              </div>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-base font-medium w-full" onClick={handleDiscount}>Apply</button>
              {
                discountMessage && <p className="text-md font-semibold text-gray-800">{discountMessage}</p>
              }
            </div>
            <div className="px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-8">
                    <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 font-semibold text-gray-800">
                      DPD Delivery
                      <br />
                      <span className="font-normal">Delivery with 24 Hours</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
          <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                <div className=" flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">David Kent</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060, United States</p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">+1 413-587-0001</p>
                </div>
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060, United States</p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">+1 413-587-0001</p>
                </div>
              </div>
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Edit Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

