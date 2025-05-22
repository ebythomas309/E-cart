import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cartItems',
    initialState:[],
    reducers:{
        //action-name : reducer function
        addToCart:(state,actionByComponet)=>{
            const exisitingProduct = state.find(item=>item.id==actionByComponet.payload.id)
            if(exisitingProduct){
                exisitingProduct.quantity++
                exisitingProduct.totalPrice = exisitingProduct.quantity * exisitingProduct.price
                const remainingProducts = state.filter(item=>item.id!=exisitingProduct.id)
                state = [...remainingProducts,exisitingProduct]
            }else{
                state.push({...actionByComponet.payload,quantity:1,totalPrice:actionByComponet.payload.price})
            }
        },
        incrementQuantity : (state,actionByCart)=>{
            const exisitingProduct = state.find(item=>item.id==actionByCart.payload)
            exisitingProduct.quantity++
            exisitingProduct.totalPrice = exisitingProduct.quantity * exisitingProduct.price
            const remainingProducts = state.filter(item=>item.id!=exisitingProduct.id)
            state = [...remainingProducts,exisitingProduct]
        },
        removeCartItem : (state,actionByCart)=>{
           return state.filter(item=>item.id!=actionByCart.payload)            
        },
        decrementQuantity : (state,actionByCart)=>{
            const exisitingProduct = state.find(item=>item.id==actionByCart.payload)
            exisitingProduct.quantity--
            exisitingProduct.totalPrice = exisitingProduct.quantity * exisitingProduct.price
            const remainingProducts = state.filter(item=>item.id!=exisitingProduct.id)
            state = [...remainingProducts,exisitingProduct]
        },
        emptyCart : (state)=>{
            return state = []
        }
    }
})

export const {addToCart,incrementQuantity,removeCartItem,decrementQuantity,emptyCart} = cartSlice.actions
export default cartSlice.reducer