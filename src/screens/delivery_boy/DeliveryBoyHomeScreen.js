import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"; 
import React, { Component } from 'react'

class DeliveryBoyHomeScreen extends Component {
    constructor(props) {
        super(props)
        
        this.showProfile = this.showProfile.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.showPendingOrders = this.showPendingOrders.bind(this);
        this.showdeliveredOrders = this.showdeliveredOrders.bind(this);
        this.logout = this.logout.bind(this);
    }

    showProfile(){
        this.props.history.push('/myaccount/profile');
    }
    editProfile(){
        this.props.history.push('/myaccount/editprofile');
    }
    changePassword(){
        this.props.history.push('/myaccount/change-password');
    }
    showPendingOrders(){
        this.props.history.push('/pendingorderfordb');
    }
    showdeliveredOrders(){
        this.props.history.push('/deliveredorderfordb');
    }
    logout(){
        this.props.history.push('/logout');
    }
   render(){
    return (
        <div>
            <Navigation/>
            <div className="main1">
            <table>
                <td><button className="btn4 btn-success" onClick={() => this.showProfile()}>Profile</button></td>
                <td><button className="btn4 btn-success" onClick={() => this.editProfile()}>Edit Profile</button></td>
                <td><button className="btn4 btn-success" onClick={() => this.changePassword()}>Change Password</button></td>
                <td><button className="btn4 btn-danger" onClick={() => this.showPendingOrders()}>Pending Orders</button></td>
                <td><button className="btn4 btn-danger" onClick={() => this.showdeliveredOrders()}>Delivered Orders</button></td>
                <td><button className="btn4 btn-success" onClick={() => this.logout()}>Logout</button></td>

            </table>
        </div>
        </div>
    );
   }
}
export default DeliveryBoyHomeScreen