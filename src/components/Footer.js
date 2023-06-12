import { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends Component {
    constructor(props) {
        super(props)
        this.selectcategory = this.selectcategory.bind(this);
    }

    selectcategory(id, name) {
        window.localStorage.setItem("category_id", id);
        window.localStorage.setItem("category_name", name);
        this.props.history.push('/product-category');
    }

    render(){
        return (
        <div className="footer">
            <div  >
                <table width="90%" style={{marginLeft: "16px"}}>
                    <br></br>
                    <tr>
                    <td>
                    <tr>
                        <a href="/aboutus" className="nav-link">
                            <h6 className="nameColor">About Us</h6>
                        </a>
                    </tr>
                    <tr>
                        <a href="/contactus" className="nav-link">
                            <h6 className="nameColor">Contact Us</h6>
                        </a>
                    </tr>
                    <tr>
                        <a href="/termsnconditions" className="nav-link">
                            <h6 className="nameColor">Terms & Conditions</h6>
                        </a>
                    </tr>

                    <tr>
                        <a href="/privacypolicy" className="nav-link">
                            <h6 className="nameColor">Privacy Policy</h6>
                        </a>
                    </tr>

                    <tr>
                        <a href="/faqs" className="nav-link">
                            <h6 className="nameColor">FAQs</h6>
                        </a>
                    </tr>
                </td>

                <td className="float-end">
                    <div className="nameColor">
                        {' '}
                        <h2>Contact Us</h2> WhatsApp us :{' '}
                        <span
                        style={{ display: 'inline-block;', marginBottom: '1rem;' }}>
                        <a>
                           8770147603 & 8602018502
                        </a>
                        </span>
                        <br />
                        <br /> <h2>Download App</h2> <br />
                        <a
                        style={{ marginRight: "16px" }}>
                        <img
                            src="https://www.jiomart.com/images/cms/wysiwyg/app-icons/play_store.png"
                            alt="Download GROCETRIA app for Android from Play Store"
                        />
                        </a>
                        <a><img src="https://www.jiomart.com/images/cms/wysiwyg/app-icons/ios_store.png"
                            alt="Download GROCETERIA app for iOs from App Store"/></a>
                    </div>{' '}
                </td>
                </tr>
                </table>
                
                <div class="copyright">
                    <div>© By vineet and rishabh 2022 GROCETERIA CDAC Project, INDIA</div>
                </div>
            </div>
            
        </div>
        )
    }
}