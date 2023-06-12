import {Link} from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/ApiCustomerService";
import React, { Component } from 'react'
import Header from "../../components/Header"

class AddressDetailsScreen2 extends Component {

  constructor(props) {
    super(props)
    this.state ={
      flatNo : '',
      societyName: '',
      area: '',
      city: '',
      pinCode: '',
      state: '',
      message: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
  }
    this.backToOrderHistory = this.backToOrderHistory.bind(this);
}

backToOrderHistory(){
    this.props.history.push('/pendingorderfordb');
}

componentDidMount() {
  ApiCustomerService.getUserDetails(window.localStorage.getItem("orderIdForDetails"))
  .then(res => {
    JSON.stringify(window.localStorage.setItem("u", res.data.result))
    let user = res.data.result;
    user !== null && this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      })
});

  ApiCustomerService.getOrderAddress(window.localStorage.getItem("orderIdForDetails"))
    .then(res => {
      let address = res.data.result;
      address !== null && this.setState({
        flatNo: address.flatNo,
        societyName: address.societyName,
        area: address.area,
        city: address.city,
        pinCode: address.pinCode,
        state: address.state,
        })
  });
}

  render(){
    return (
      <div>
        <Navigation/>
        <div className="main">
      <Header title="Delivery Address" />
      <br/>
      <div className="form">
      <div className="row mb-3">
          <label className="col-sm-4 col-form-label">First Name</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="firstName" value={this.state.firstName} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Last Name</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="lastName" value={this.state.lastName} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Email</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="email" value={this.state.email} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Phone</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="phone" value={this.state.phone} readOnly/>
          </div>
       </div>

      <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Flat No</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="flatNo" value={this.state.flatNo} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Society Name </label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="societyName" value={this.state.societyName} readOnly/>
          </div>
       </div>

       <div class="row mb-3">
          <label className="col-sm-4 col-form-label">Area</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="area" value={this.state.area} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">City</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="city" value={this.state.city} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">pincode</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="pinCode" value={this.state.pinCode} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">state</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="state" value={this.state.state} readOnly/>
          </div>
       </div>
        <div className="mb-3">
          <button className="btn4 btn-success float-end" onClick={this.backToOrderHistory}>
            Back
          </button>
          <br></br>

        </div>
      </div>
    </div>
      </div>
  )
  }
    
}
export default AddressDetailsScreen2