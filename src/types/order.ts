
export interface Orders{
  _id:string;
  totalPrice: number;
  orderStatus:'Pending' | 'Delivered',
  orderAt:string, 
  DeliveredfromShop:number
}

export interface OrdersDetail{
  _id:string;
  totalPrice:number;
  user:{
    _id:string
  }
  paymentInfo:{
    status:string
    CashonDelivery:number
  }
  DeliveredfromShop:number
  orderItems:string[]
  orderStatus:string
  orderAt:string,
  crearedAt:string
  shippingInfo:{
    phoneNo:string
  }
}