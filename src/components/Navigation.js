import {Link} from 'react-router-dom'
import logo from './logo.jpg';
import React, { Component } from 'react';
import ApiCustomerService from "../services/customer/ApiCustomerService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      st : false,
      category:[],
      searchProduct : '',
  }
    this.getStatus = this.getStatus.bind(this);
    this.searchProductByName = this.searchProductByName.bind(this);
    this.reloadCategoryList = this.reloadCategoryList.bind(this);
    this.selectcategory = this.selectcategory.bind(this);
}

onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

componentDidMount() {
  this.getStatus();

 this.reloadCategoryList()
}

reloadCategoryList() {
  ApiCustomerService.fetchAllCategory()
  .then((res) => {
      this.setState({category : res.data.result})
  });

}
getStatus() {
  this.setState(prevState => ({ st: window.localStorage.getItem("status") == 'true'}))
}


searchProductByName (e){
  e.preventDefault();
  window.localStorage.setItem("searchProductName", this.state.searchProduct);
  window.open("/show-search-product"); 
}

selectcategory(id, name) {
  window.localStorage.setItem("category_id", id);
  window.localStorage.setItem("category_name", name);
  // window.location.href("/product-category")
  // this.props.history.push('/product-category');
  // window.open("/product-category")
  // window.URL("/product-category")
}

  render(){
    return (
      <div>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#008ecc"}}>
        <div className="container-fluid text-white">
          { window.localStorage.getItem("user_role") !== 'DELIVERY_BOY' &&
            window.localStorage.getItem("user_role") !== 'ADMIN' &&
            window.localStorage.getItem("user_role") !== 'SUPPLIER' &&
            <a href="/home">
            <a className="navbar-brand">
            <img src={logo} class="img-fluid" alt="Logo" width="100px" height="100px"/>
            </a>
          </a>
          }

          { window.localStorage.getItem("user_role") == 'DELIVERY_BOY' &&
            <Link to="/deliveryboyhome">
            <a className="navbar-brand">
            <img src={logo} class="img-fluid" alt="Logo" width="100px" height="100px"/>
            </a>
          </Link>
          }

          { window.localStorage.getItem("user_role") == 'ADMIN' &&
            <Link to="/adminhome">
            <a className="navbar-brand">
            <img src={logo} class="img-fluid" alt="Logo" width="100px" height="100px"/>
            </a>
          </Link>
          }

        { window.localStorage.getItem("user_role") == 'SUPPLIER' &&
            <Link to="/supplierhome">
            <a className="navbar-brand">
            <img src={logo} class="img-fluid" alt="Logo" width="100px" height="100px"/>
            </a>
          </Link>
          }

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              { window.localStorage.getItem("user_role") !== 'DELIVERY_BOY' &&
                window.localStorage.getItem("user_role") !== 'ADMIN' &&
                window.localStorage.getItem("user_role") !== 'SUPPLIER' &&
                <li className="nav-item">
                <Link to="/home">
                  <a className="nav-link nameColor2"><h5>Home</h5></a>
                </Link>
                </li>
              }
              { window.localStorage.getItem("user_role") == 'DELIVERY_BOY' &&
                <li className="nav-item">
                <Link to="/deliveryboyhome">
                  <a className="nav-link nameColor2"><h5>Home</h5></a>
                </Link>
                </li>
              }
              { window.localStorage.getItem("user_role") == 'ADMIN' &&
                <li className="nav-item">
                <Link to="/adminhome">
                  <a className="nav-link nameColor2"><h5>Home</h5></a>
                </Link>
                </li>
              }
              { window.localStorage.getItem("user_role") == 'SUPPLIER' &&
                <li className="nav-item">
                <Link to="/supplierhome">
                  <a className="nav-link nameColor2"><h5>Home</h5></a>
                </Link>
                </li>
              }
                {this.state.st && window.localStorage.getItem("user_role") == 'CUSTOMER' && 
              <li class="nav-item dropdown">
                <h5>
                <a class="nav-link dropdown-toggle nameColor2" href="myaccount" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Account
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="/myaccount/profile">Profile</a></li>
                  <li><a class="dropdown-item" href="/myaccount/editprofile">Edit Profile</a></li>
                  <li><a class="dropdown-item" href="/myaccount/change-password">Update Password</a></li>
                  <li><a class="dropdown-item" href="/myaccount/changeaddress">Change Address</a></li>
                  <li><a class="dropdown-item" href="/myaccount/orderhistory">Order History</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="/logout">Logout</a></li>
                </ul>
                </h5> 
            </li>
            }

              {window.localStorage.getItem("user_role") !== 'DELIVERY_BOY' && 
              window.localStorage.getItem("user_role") !== 'SUPPLIER' && 
              window.localStorage.getItem("user_role") !== 'ADMIN' && 
              <li class="nav-item dropdown">
                <h5>
                <a class="nav-link dropdown-toggle nameColor2" href="myaccount" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Category
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.state.category.map(cat => 
                  <li><a class="dropdown-item" href="/product-category" onClick={() => { this.selectcategory(cat.id, cat.categoryName) }} >{cat.categoryName}</a></li>
                )}
                  </ul>
                </h5> 
            </li>
            }

        {this.state.st && window.localStorage.getItem("user_role") == 'DELIVERY_BOY' && 
              <li class="nav-item dropdown">
                <h5>
                <a class="nav-link dropdown-toggle nameColor2" href="myaccount" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Account
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="/myaccount/profile">Profile</a></li>
                  <li><a class="dropdown-item" href="/myaccount/editprofile">Edit Profile</a></li>
                  <li><a class="dropdown-item" href="/myaccount/change-password">Change Password</a></li>
                  <li><a class="dropdown-item" href="/pendingorderfordb">Pending Orders</a></li>
                  <li><a class="dropdown-item" href="/deliveredorderfordb">Delivered Orders</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="/logout">Logout</a></li>
                </ul>
                </h5> 
            </li>
            }

            {this.state.st && window.localStorage.getItem("user_role") == 'ADMIN' && 
              <li class="nav-item dropdown">
                <h5>
                <a class="nav-link dropdown-toggle nameColor2" href="myaccount" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Account
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="/myaccount/profile">Profile</a></li>
                  <li><a class="dropdown-item" href="/myaccount/editprofile">Edit Profile</a></li>
                  <li><a class="dropdown-item" href="/myaccount/change-password">Change Password</a></li>
                  <li><a class="dropdown-item" href="/pendingorderforadmin">Pending Orders</a></li>
                  <li><a class="dropdown-item" href="/deliveredorderforadmin">Delivered Orders</a></li>
                  <li><a class="dropdown-item" href="/showsupplier">Show Supplier</a></li>
                  <li><a class="dropdown-item" href="/showdeliveryboy">Show Delivery Boy</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="/logout">Logout</a></li>
                </ul>
                </h5> 
            </li>
            }
            {this.state.st && window.localStorage.getItem("user_role") == 'SUPPLIER' && 
              <li class="nav-item dropdown">
                <h5>
                <a class="nav-link dropdown-toggle nameColor2" href="myaccount" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Account
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="/myaccount/profile">Profile</a></li>
                  <li><a class="dropdown-item" href="/myaccount/editprofile">Edit Profile</a></li>
                  <li><a class="dropdown-item" href="/myaccount/change-password">Change Password</a></li>
                  <li><a class="dropdown-item" href="/myaccount/changeaddress">Change Address</a></li>
                  <li><a class="dropdown-item" href="/addproduct">Add Product</a></li>
                  <li><a class="dropdown-item" href="/supplier/showproducts">Product Details</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="/logout">Logout</a></li>
                </ul>
                </h5> 
            </li>
            }
            </ul>
            
          { window.localStorage.getItem("user_role") !== 'DELIVERY_BOY' &&
          window.localStorage.getItem("user_role") !== 'ADMIN' &&
          window.localStorage.getItem("user_role") !== 'SUPPLIER' &&
                      <ul className="nav justify-content-center">
                      <form className="d-flex">
                      <input className="form-control me-2" size="80" type="text" placeholder="Search" aria-label="Search" name="searchProduct" value={this.state.searchProduct} onChange={this.onChange}/>
              <button className="btn btn-warning" type="submit" onClick={this.searchProductByName}>Search</button>
            </form>
            </ul>
            }

            <ul className="nav justify-content-end">
              { window.localStorage.getItem("user_role") !== 'DELIVERY_BOY' &&
              window.localStorage.getItem("user_role") !== 'ADMIN' &&
              window.localStorage.getItem("user_role") !== 'SUPPLIER' &&
              <Link to="/cart">
                <li class="nav-link">
                  <a href="#" class="cart position-relative d-inline-flex" aria-label="View your shopping cart">
                    <h5><i class="fas fa fa-shopping-cart fa-lg"></i></h5>
                    <span class="cart-basket d-flex align-items-center justify-content-center">
                    {/* {window.localStorage.getItem("cart_size")} */}
                    </span>
                  </a>
                </li>
                </Link>
  }
            {!this.state.st && 
              <li className="nav-item">
                <Link to="/create-account">
                  <a className="nav-link"><h5 className="nameColor2">Create Account</h5></a>
                </Link>
              </li>
            }
              {!this.state.st && 
              <li className="nav-item" >
                <Link to="/login">
                  <a className="nav-link"><h5 className="nameColor2">Login</h5></a>
                </Link>
              </li>
              }
              {this.state.st && 
              <li className="nav-item" >
              <Link to="/myaccount/profile">
                  <a className="nav-link"><h5 className="nameColor2">Hello, {window.localStorage.getItem("user_fname")}</h5></a>
                </Link>
              </li>
            }
            </ul>
          </div>
           
        </div>
      </nav>
      <br/>
      
    </div>
  )
  }
   
}

export default Navigation