import { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer"
import Navigation from "../../components/Navigation"
import ApiSupplierService from "../../services/supplier/ApiSupplierService";

export default class ShowProductsBySupplierScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            products: [],
            categoryName:''
        };
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        ApiSupplierService.fetchProductsBySupplierId(this.props.match.params.id)
        .then((res) => {
            this.setState({products: res.data.result})
        });

        ApiSupplierService.fetchProductCategoryName(this.props.match.params.id)
        .then((res) => {
            this.setState({categoryName: res.data.result})
        });
    }

    deleteProduct(productId) {
        ApiSupplierService.deleteProduct(productId)
        .then((res) => {
            window.location.reload();       
        });
       
    }

    render(){
        return (
            <div>
                <Navigation />
                <div className="container">
                <table class="table table-striped" >
                    <thead>
                        <tr>
                        <th scope="col" width="10%">Product id</th>
                        <th scope="col" width="20%">Product Name</th>
                        <th scope="col" width="20%">Category</th>
                        <th scope="col" width="10%">Rating</th>
                        <th scope="col" width="10%">Quantity</th>
                        <th scope="col" width="9%">Delete Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products === null  ?
                            <tr align="center">
                                <td colSpan="6">Products Not Available.</td>
                            </tr> :
                            this.state.products !== null && this.state.products.map((product) => (
                                <tr >
                                    <td>{product.id}</td>
                                    <td>{product.productName}</td>
                                    <td>{this.state.categoryName}</td>
                                    <td>{product.rating}</td>
                                    <td>{product.qty}</td>
                                    <td><button className="btn4 btn-danger" onClick={() => this.deleteProduct(product.id)}>Delete Product</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    
                </table>
                </div>
            </div>
        );
    }
}
