import {Link} from 'react-router-dom'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ApiCustomerService from "../../services/customer/ApiCustomerService";
import React, { Component } from 'react'
import Header from "../../components/Header"

class ShowOrderAddress extends Component {

  constructor(props) {
    super(props)
    this.state ={
      flatNo : '',
      societyName: '',
      area: '',
      city: '',
      pinCode: '',
      state: '',
      message: ''
  }
    this.backToOrderHistory = this.backToOrderHistory.bind(this);
}

componentDidMount() {

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


onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

        backToOrderHistory(){
            this.props.history.push('/myaccount/orderhistory');
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
          <label className="col-sm-4 col-form-label">Flat No</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="flatNo" value={this.state.flatNo} onChange={this.onChange} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Society Name </label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="societyName" value={this.state.societyName} onChange={this.onChange} readOnly/>
          </div>
       </div>

       <div class="row mb-3">
          <label className="col-sm-4 col-form-label">Area</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="area" value={this.state.area} onChange={this.onChange} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">City</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="city" value={this.state.city} onChange={this.onChange} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">pincode</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="pinCode" value={this.state.pinCode} onChange={this.onChange} readOnly/>
          </div>
       </div>

       <div className="row mb-3">
          <label className="col-sm-4 col-form-label">state</label>
          <div className="col-sm-8">
              <input type="text" className="form-control" name="state" value={this.state.state} onChange={this.onChange} readOnly/>
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
export default ShowOrderAddress