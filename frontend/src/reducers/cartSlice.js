import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name:"cart",
        initialState:{
            data:[],
            total:0
        },
        reducers:{
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
            },
            incQty(){

            },
            lsToCart(currentState){
                const lsCart = localStorage.getItem('cart')
                if(lsCart != null){
                    const  d= JSON.parse(lsCart)
                    currentState.data = d.data
                    currentState.total = d.total
                }
            }
        }
    }
)

export const {addToCart,removeFromCart,incQty,lsToCart} = cartSlice.actions
export default cartSlice.reducer