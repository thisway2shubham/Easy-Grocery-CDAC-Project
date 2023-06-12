import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"; 
import ApiCustomerService from "../../services/customer/ApiCustomerService";

class CartScreen extends Component{

    constructor(props) {
        super(props)
        this.state = {
        cart:[],
        st : false,
        tamt : 0,
        samt : 0,
        sts:'Cart Is Empty',
      }
        this.getStatus = this.getStatus.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addAddress = this.addAddress.bind(this);
    }
    
    componentDidMount() {
      this.getStatus();
      let size = JSON.parse(window.localStorage.getItem("cart_size"))
      if(size !== 0){
        ApiCustomerService.getCartByUserId(JSON.parse(window.localStorage.getItem("user_id")))
        .then((res) => {
            this.setState({cart : res.data.result})
        });

        ApiCustomerService.getTAmtUserId(JSON.parse(window.localStorage.getItem("user_id")))
        .then((res) => {
            this.setState({tamt : res.data.result})
        });

        ApiCustomerService.getSAmtByUserId(JSON.parse(window.localStorage.getItem("user_id")))
        .then((res) => {
            this.setState({samt : res.data.result})
        });
    }
      
    }

    getStatus() {
    this.setState(prevState => ({ st: window.localStorage.getItem("status") == 'true'}))
    }

    placeOrder() {
        let size = JSON.parse(window.localStorage.getItem("cart_size"))
        if(size == 0){
            alert(" !!! Cart Is Empty !!!")
        }
        if(size !== 0){
            window.localStorage.setItem("add", this.state.pinCode)
            if(this.state.st && window.localStorage.getItem("addressStatus") == 'false'){
                alert(" !!! Enter Valid Address !!!")
            }
            !this.state.st && this.props.history.push('/login');
            if(window.localStorage.getItem("addressStatus") == 'true'){
                window.localStorage.setItem("addressStatus", false)
                this.state.st && this.props.history.push('/payment');
            !this.state.st && this.props.history.push('/login');
            window.localStorage.setItem("total_price", this.state.tamt)
            } 
                 
        }
        
    }

    addAddress() {
        let size = JSON.parse(window.localStorage.getItem("cart_size"))
        if(size == 0){
            alert(" !!! Cart Is Empty !!!")
        }
        if(size !== 0){
            this.state.st && window.localStorage.setItem("addressStatus", true)
            !this.state.st && this.props.history.push('/login');
            this.state.st && this.props.history.push('/orderaddress');
            }
        }
        
    deleteProduct(cartId, qty) {
        ApiCustomerService.deleteCartByUserId(cartId)
        .then((res) => {
            window.location.reload();
            JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) - qty));        
        });
       
    }

  render() {
    return (
       <div>
           <Navigation/>
            <div className="container">
        <h2 className="text-center">Cart Details</h2>
        {this.state.cart.length == 0 &&
            <div className="container"><h5 className="nameColor1">{JSON.parse(window.localStorage.getItem("cart_size")) == 0 && this.state.sts}</h5></div>
        }
        {this.state.cart.length > 0 && 
        <table className="table table-striped">
        <thead>
            <tr className="float-center">
                <th >Product Name</th>
                <th>Price</th>
                <th>QTY</th>
                <th>Grams</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        
        {this.state.cart.map(product =>
                <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.finalPrice}</td>
                    <td>{product.qty}</td>
                    <td>{product.grams}</td>
                    <td>
                    <button className="btn4 btn-danger" onClick={() => this.deleteProduct(product.id, product.qty)}>Delete</button>
                    </td>
                </tr>
                )}
        </tbody>         
    </table>

        }
        <br/>

        <div className="float-end">
        <h5>Total Price : {this.state.tamt}</h5>
        <h5>Savings Amount : {this.state.samt}</h5>
        <button className="btn4 btn-primary" style={{width:'200px'}} onClick={() => this.addAddress()}>Add Address</button><br/><br/>
        <button className="btn4 btn-primary" style={{width:'200px'}} onClick={() => this.placeOrder()}>Place Order</button>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
       </div>
    );
    }
}
export default CartScreen