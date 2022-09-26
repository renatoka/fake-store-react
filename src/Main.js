import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import plus from "./images/plus.svg";

export let cartItems = [];
export let cartTotalAmount = 0;

export default function Main() {
  const navigate = useNavigate();

  // 1. used to get all the products from the API
  const [products, setProducts] = useState([]);

  // 2. used to store cart quantity when user clicks on plus button
  const [cartQuantity, setCartQuantity] = useState(0);

  // 3. used to show loading message while products are being fetched from the API
  const [loading, setLoading] = useState(true);

  // 4. used to set cart items that are added to the cart and to pass them to the Checkout page
  const [cart, setCart] = useState([]);

  // 5. used to show the total amount of the cart items
  let [cartTotal, setCartTotal] = useState(0);

  const updateCart = () => {
    // updates cart item number in header icon
    setCartQuantity(cartQuantity + 1);
  };

  // shows and hides the cart
  const [show, setShow] = useState(false);

  const removeFromCart = (products) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => item.id === products.id);
    if (itemInCart) {
      itemInCart.quantity -= 1;
      cartTotal -= itemInCart.price;
      setCartTotal(cartTotal);
      setCart(newCart);
      if (itemInCart.quantity === 0) {
        newCart.splice(newCart.indexOf(itemInCart), 1);
        setCart(newCart);
        setCartTotal(cartTotal);
      }
    }
    // these two values are being passed to the Checkout page
    cartItems = newCart;
    cartTotalAmount = cartTotal;
  }
  const addToCart = (products) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => item.id === products.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
      cartTotal += itemInCart.price;
      setCartTotal(cartTotal);
    } else {
      products.quantity = 1;
      cartTotal += products.price;
      newCart.push(products);

      setCart(newCart);
      setCartTotal(cartTotal);
    }
    // these two values are being passed to the Checkout page
    updateCart();
    cartItems = newCart;
    cartTotalAmount = cartTotal;
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products",
    }).then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {show && (
        <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0 z-10" id="chec-div">
          <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => setShow(!show)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none" onClick={() => setShow(!show)}>Back</p>
                </div>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>
                {
                  cartItems.map((item, index) => {
                    return (
                      <div className="flex flex-col md:flex-row flex-wrap md:items-center md:justify-between py-4 mt-5" key={index}>
                        <div className="flex items-center">
                          <img src={item.image} alt="product" className="w-20 h-20 object-cover" />
                          <div className="flex flex-col pl-4">
                            <p className="text-sm text-gray-800 font-medium">{item.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-start md:mt-0 mt-4">
                          <div className="flex items-center">
                            <button className="bg-gray-200 text-gray-800 font-medium text-sm rounded-full w-8 h-8 flex items-center justify-center focus:outline-none" onClick={() => removeFromCart(item)}>
                              -
                            </button>
                            <p className="text-sm text-gray-800 font-medium px-4">{item.quantity}</p>
                            <button className="bg-gray-200 text-gray-800 font-medium text-sm rounded-full w-8 h-8 flex items-center justify-center focus:outline-none" onClick={() => { addToCart(item) }}>
                              +
                            </button>
                          </div>
                          <p className="text-sm text-gray-800 font-medium md:ml-4 ml-0">€ {item.price}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">Subtotal</p>
                      <p className="text-base leading-none text-gray-800">€ {cartTotalAmount}</p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">Shipping</p>
                      <p className="text-base leading-none text-gray-800">€ 5.00</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">Total</p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">€ {cartTotalAmount + 5}</p>
                    </div>
                    <button onClick={() => navigate('/login')} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="App">
        {/* Header */}
        <nav id="header" className="w-full z-30 top-0 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
            <label className="cursor-pointer md:hidden block">
              <svg
                className="fill-current text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 20 20"
              >
                <title>menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </label>
            <input className="hidden" type="checkbox" id="menu-toggle" />
            <div
              className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
              id="menu"
            >
              <nav>
                <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                  <li>
                    <p className="inline-block no-underline hover:text-black hover:underline py-2 px-4">
                      Shop
                    </p>
                  </li>
                  <li>
                    <p className="inline-block no-underline hover:text-black hover:underline py-2 px-4">
                      About
                    </p>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="order-1 md:order-2">
              <p className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
                <svg
                  className="fill-current text-gray-800 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                >
                  <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"></path>
                </svg>
                NORDICS
              </p>
            </div>
            <div
              className="order-2 md:order-3 flex items-center"
              id="nav-content"
            >
              <p
                className="inline-block no-underline hover:text-black"
                onClick={() => navigate("/login")}
              >
                <svg
                  className="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                >
                  <circle fill="none" cx="12" cy="7" r="3"></circle>
                  <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path>
                </svg>
              </p>
              <p className="pl-3 inline-block no-underline hover:text-black" onClick={() => setShow(!show)}>
                <svg
                  className="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                >
                  <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"></path>
                  <circle cx="10.5" cy="18.5" r="1.5"></circle>
                  <circle cx="17.5" cy="18.5" r="1.5"></circle>
                </svg>
                <span className="inline-flex absolute top-4 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -z-1">
                  {cartQuantity}
                </span>
              </p>
            </div>
          </div>
        </nav>
        {/* Hero */}
        <div
          className="hero w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
          style={{
            height: "32rem",
            backgroundImage:
              "url(" +
              "https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
          }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
              <h1 className="text-left text-black text-4xl my-4">
                {loading ? "Loading..." : products[0].title}
              </h1>
              <p className="text-sm text-left inline-block no-underline italic leading-relaxed hover:text-black hover:border-black">
                {loading ? "Loading..." : products[0].description}
              </p>
            </div>
          </div>
        </div>
        {/* Products */}
        <div className="bg-white py-8">
          <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" className="w-full top-0 px-6 py-1">
              <div className="w-full container mx-auto mt-0 px-2 py-3">
                <p className="uppercase tracking-wide text-left no-underline hover:no-underline font-bold text-gray-800 text-xl">
                  Store
                </p>
              </div>
            </nav>
            {products.map((product, index) => {
              return (
                <div
                  className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
                  key={index}
                >
                  <div>
                    <img
                      className="hover:grow hover:shadow-lg"
                      src={product.image}
                      alt={product.description}
                      style={{ width: "300px", height: "300px" }}
                    />
                    <div className="pt-3 flex items-center justify-between">
                      <p className="uppercase font-bold text-lg text-left">
                        {product.title}
                      </p>
                      <img
                        src={plus}
                        width="20px"
                        onClick={() => addToCart(products[index])}
                        alt={product.description}
                      />
                    </div>
                    <p className="pt-1 text-left text-gray-900">
                      {products[index].price} €
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
