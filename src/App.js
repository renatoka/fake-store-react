import './App.css';
import './Hero.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import plus from './images/plus.svg'
import React from "react";

function App() {

    const [products, setProducts] = useState([])
    const [cartQuantity, setCartQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])

    const updateCart = () => {
        // updates cart item number in header icon
        setCartQuantity(cartQuantity + 1)
    }

    const addToCart = (products) => {
        updateCart()
        const newCart = [...cart]
        // check if item is already in cart and updates quantity, if not add it to cart as new item
        const itemInCart = newCart.find(item => item.id === products.id)
        if (itemInCart) {
            itemInCart.quantity++
        } else {
            newCart.push({...products, quantity: 1})
            setCart(newCart)
        }
        console.log('Cart Quantity: ', cartQuantity)
        console.log('Cart: ', newCart)
    }


    useEffect(() => {
        axios({
            method: 'GET', url: 'https://api.escuelajs.co/api/v1/products'
        }).then((response) => {
            setProducts(response.data)
            setLoading(false)
        })
    }, [])

    return (<div className="App">
        <nav id="header" className="w-full z-30 top-0 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
                <label className="cursor-pointer md:hidden block">
                    <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="34"
                         height="34" viewBox="0 0 20 20">
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input className="hidden" type="checkbox" id="menu-toggle"/>
                <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
                    <nav>
                        <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                            <li><p className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                            >Shop</p></li>
                            <li><p className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                            >About</p></li>
                        </ul>
                    </nav>
                </div>
                <div className="order-1 md:order-2">
                    <p className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ">
                        <svg className="fill-current text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg"
                             width="34" height="34" viewBox="0 0 24 24">
                            <path
                                d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"></path>
                        </svg>
                        NORDICS
                    </p>
                </div>
                <div className="order-2 md:order-3 flex items-center" id="nav-content">
                    <p className="inline-block no-underline hover:text-black">
                        <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="34"
                             height="34" viewBox="0 0 24 24">
                            <circle fill="none" cx="12" cy="7" r="3"></circle>
                            <path
                                d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path>
                        </svg>
                    </p>
                    <p className="pl-3 inline-block no-underline hover:text-black">
                        <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="34"
                             height="34" viewBox="0 0 24 24">
                            <path
                                d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"></path>
                            <circle cx="10.5" cy="18.5" r="1.5"></circle>
                            <circle cx="17.5" cy="18.5" r="1.5"></circle>
                        </svg>
                        <span
                            className="inline-flex absolute top-4 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">{cartQuantity - 1}</span>
                    </p>
                </div>
            </div>
        </nav>
        {/* Hero */}
        <div
            className="hero w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right">
            <div className="container mx-auto">
                <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
                    <h1 className="text-left text-black text-4xl my-4">{loading ? 'Loading...' : products[0].title}</h1>
                    <p className="text-sm text-left inline-block no-underline italic leading-relaxed hover:text-black hover:border-black">{loading ? 'Loading...' : products[0].description}</p>
                </div>
            </div>
        </div>
        {/* Products */}
        <div className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <nav id="store" className="w-full z-30 top-0 px-6 py-1">
                    <div
                        className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                        <p className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ">Store</p>
                        <div className="flex items-center" id="store-nav-content">
                            <p className="pl-3 inline-block no-underline hover:text-black">
                                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z"></path>
                                </svg>
                            </p>
                            <p className="pl-3 inline-block no-underline hover:text-black">
                                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
                                </svg>
                            </p>

                        </div>
                    </div>
                </nav>
                {products.slice(0, 40).map(({category, description, id, price, title}) => {
                    return (<div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col" key={id}>
                        <div>
                            <img className="hover:grow hover:shadow-lg" src={category.image}
                                 alt={description}/>
                            <div className="pt-3 flex items-center justify-between">
                                <p className="uppercase font-bold text-lg">{title}</p>
                                <img src={plus} width='20px' onClick={() => addToCart(products[id - 1])}
                                     alt={description}/>
                            </div>
                            <p className="pt-1 text-left text-gray-900">{price} €</p>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    </div>);
}

export default App;
