import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name:"cart",
        initialState:{
            data:[],
            total:0
        },
        reducers:{

            dbToCart(currentState,{payload}){
                console.log("hello", payload)
                currentState.data= payload.data
                localStorage.setItem("cart",JSON.stringify(currentState))
                currentState.total += payload.total
            },
            addToCart(currentState,{payload}){
                // console.log(payload)
                const d = currentState.data.find(cart => cart.pId == payload.pId)
                if(d){
                    d.qty++;
                }else{
                    currentState.data.push({pId:payload.pId,qty:payload.qty})
                }
                currentState.total += payload.price
                localStorage.setItem('cart',JSON.stringify(currentState))

            },
            removeFromCart(currentState,{payload}){
                // payload => pId, total_price

                const newState = currentState.data.filter(
                    (d)=>{
                        return d.pId != payload.pId
                    }
                )
                currentState.data = newState
                currentState.total -= payload.total_price
                localStorage.setItem('cart',JSON.stringify(currentState))

            },
            incCartQty(currentState,{payload}){
                // payload => pId, price, flag ( true=>inc || false => desc )
                const d = currentState.data.find(d=>d.pId == payload.pId)
                if(payload.flag){
                    d.qty++
                    currentState.total += payload.price
                }else{
                    d.qty--
                    currentState.total -= payload.price
                }
                localStorage.setItem('cart',JSON.stringify(currentState))
            },
            lsToCart(currentState){
                const lsCart = localStorage.getItem('cart')
                if(lsCart != null){
                    const  d= JSON.parse(lsCart)
                    currentState.data = d.data
                    currentState.total = d.total
                }
            },
            emptyCart(currentState){
                currentState.total = 0;
                currentState.data = [];
                localStorage.removeItem('cart');
            },
        }
    }
)

export const {addToCart,removeFromCart,incCartQty,lsToCart,emptyCart,dbToCart} = cartSlice.actions
export default cartSlice.reducer