import React from 'react';
import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import { NavLink, useParams } from "react-router-dom"
import '../PublisherProduct.css';
import Edit from './Edit';
import Navigationbar from './Navigationbar';
function PublisherProduct(props) {

    const [PublisherProduct, setPublisherProduct] = useState([]);
    const [PProduct, setPProduct] = useState([]);
    const { Id } = useParams()
    useEffect(() => {
        fetch("https://localhost:44370/api/products/Getproductbypub/" + Id)
            .then(res => res.json())
            .then((result) => { setPublisherProduct(result); setPProduct(result); }
            );
    }, []);

    const isRentable=(event)=>{
        fetch("http://localhost:8080/crud/rentableproductsearch/" + event.target.value)
            .then(res => res.json())
            .then((result) => { setPublisherProduct(result); setPProduct(result); }
            );
    }
    
    const isLibrary=(event)=>{
        fetch("http://localhost:8080/crud/libraryproductsearch/" + event.target.value)
            .then(res => res.json())
            .then((result) => { setPublisherProduct(result); setPProduct(result); }
            );
    }

    const isProductType=(event)=>{
        fetch("http://localhost:8080/crud/prodtypeproductsearch/" + event.target.value)
            .then(res => res.json())
            .then((result) => { setPublisherProduct(result); setPProduct(result); }
            );
    }
    

    const letsdelete=(event)=>{
        fetch("http://localhost:8080/crud/productDelete/" + event.target.value)
            .then(res => res.json())
            .then((result) => { setPublisherProduct(result); setPProduct(result); }
            );
    }

    const navigate = useNavigate();

    const letsEdit=(Id)=>{
        navigate('Edit/'+Id);
    }


    return (
        <><Navigationbar/>
                <div className=""><br/>
                    <h1 className="heading-line">My Published Books!</h1>
                    
                    <div className="og-row og-li og-li-head">
                        <div className="og-li-col og-li-col-1 text-center">#</div>
                        <div className="og-li-col og-li-col-2">Book Name</div>
                        <div className="og-li-col og-li-col-4 text-center">Product Baseprice</div>
                        <div className="og-li-col og-li-col-5 text-center">Product sp</div>
                        <div className="og-li-col og-li-col-6 text-center">Product  Offerprice </div>
                        <div className="og-li-col og-li-col-7 text-center">product offer Expirydate</div>
                        <div className="og-li-col og-li-col-7 text-center">Edit option</div>
                        {/* <div className="og-li-col og-li-col-8 text-center">IsLibrary</div>
                        <div className="og-li-col og-li-col-8 text-center">IsRentable</div> */}
                    </div>
                    
                { PublisherProduct.map(
                   Product => (
                    <div className="data-row og-row og-li Experienced Engineering 7.3 ready_to_hire Andhra Pradesh Yes">
                        <div className="og-li-col og-li-col-1 text-center"><span>{Product.product_id}</span></div>
                        <div className="og-li-col og-li-col-2"><span>{Product.product_name}</span></div>
                        <div className="og-li-col og-li-col-3 text-center"><span>{Product.product_baseprice}</span></div>
                        <div className="og-li-col og-li-col-5 text-center"><span>{Product.product_sp_cost}</span></div>
                        <div className="og-li-col og-li-col-6 text-center"><span>{Product.product_offerprice}</span></div>
                        <div className="og-li-col og-li-col-7 text-center"><span>{new Date(Product.product_offerprice_expirydate).toUTCString()}</span></div>
                        <div className="og-li-col og-li-col-9 text-center"><span>
                            <a class="btn btn-primary" href={'/Edit/'+Product.product_id} role="button">Edit</a>&nbsp;&nbsp;&nbsp;
                            <a class="btn btn-primary" href={'/Beneficiary/'+Product.product_id} role="button">Add beneficiary</a>
                           {/*  <button type="button" class="btn btn-danger" onClick={letsdelete}>Delete</button> */}
                            </span></div>
                        {/* <button style = {{color:'red'}} onClick={()=>letsEdit(Product.productId)} ></button> */}
                        {/* <div className="og-li-col og-li-col-8 text-center"><span>{Product.isLibrary}</span></div>
                        <div className="og-li-col og-li-col-8 text-center"><span>{Product.isRentable}</span></div> */}
                    </div>
                ))}

                   {/*  <div className="data-row og-row og-li Fresher Engineering 7 graduating_in_shortly Andhra Pradesh Yes">
                        <div className="og-li-col og-li-col-1 text-center">2</div>
                        <div className="og-li-col og-li-col-2">Mayank</div>
                        <div className="og-li-col og-li-col-3 text-center">Engineering</div>
                        <div className="og-li-col og-li-col-4 text-center">Fresher</div>
                        <div className="og-li-col og-li-col-5 text-center">7</div>
                        <div className="og-li-col og-li-col-6 text-center">Graduating in shortly</div>
                        <div className="og-li-col og-li-col-7 text-center">Andhra Pradesh</div>
                        <div className="og-li-col og-li-col-8 text-center">Yes</div>
                    </div>
                    <div className="data-row og-row og-li Experienced Non-Engineering 8 ready_to_hire Andhra Pradesh No">
                        <div className="og-li-col og-li-col-1 text-center">3</div>
                        <div className="og-li-col og-li-col-2">Faviana</div>
                        <div className="og-li-col og-li-col-3 text-center">Non-Engineering</div>
                        <div className="og-li-col og-li-col-4 text-center">Experienced</div>
                        <div className="og-li-col og-li-col-5 text-center">8</div>
                        <div className="og-li-col og-li-col-6 text-center">Ready to hire</div>
                        <div className="og-li-col og-li-col-7 text-center">Andhra Pradesh</div>
                        <div className="og-li-col og-li-col-8 text-center">No</div>
                    </div>
                    <div className="data-row og-row og-li Fresher Engineering 6 graduating_in_shortly Andhra Pradesh No">
                        <div className="og-li-col og-li-col-1 text-center">4</div>
                        <div className="og-li-col og-li-col-2">Harsha</div>
                        <div className="og-li-col og-li-col-3 text-center">Engineering</div>
                        <div className="og-li-col og-li-col-4 text-center">Fresher</div>
                        <div className="og-li-col og-li-col-5 text-center">6</div>
                        <div className="og-li-col og-li-col-6 text-center">Graduating in shortly</div>
                        <div className="og-li-col og-li-col-7 text-center">Andhra Pradesh</div>
                        <div className="og-li-col og-li-col-8 text-center">No</div>
                    </div>
                    <div className="data-row og-row og-li Experienced Non-Engineering 7 ready_to_hire Andhra Pradesh Yes">
                        <div className="og-li-col og-li-col-1 text-center">5</div>
                        <div className="og-li-col og-li-col-2">Deepa</div>
                        <div className="og-li-col og-li-col-3 text-center">Non-Engineering</div>
                        <div className="og-li-col og-li-col-4 text-center">Experienced</div>
                        <div className="og-li-col og-li-col-5 text-center">7</div>
                        <div className="og-li-col og-li-col-6 text-center">Ready to hire</div>
                        <div className="og-li-col og-li-col-7 text-center">Andhra Pradesh</div>
                        <div className="og-li-col og-li-col-8 text-center">Yes</div>
                    </div>
                    <div className="data-row og-row og-li Experienced Non-Engineering 7 ready_to_hire Andhra Pradesh Yes">
                        <div className="og-li-col og-li-col-1 text-center">6</div>
                        <div className="og-li-col og-li-col-2">Harsha</div>
                        <div className="og-li-col og-li-col-3 text-center">Non-Engineering</div>
                        <div className="og-li-col og-li-col-4 text-center">Experienced</div>
                        <div className="og-li-col og-li-col-5 text-center">7</div>
                        <div className="og-li-col og-li-col-6 text-center">Ready to hire</div>
                        <div className="og-li-col og-li-col-7 text-center">Andhra Pradesh</div>
                        <div className="og-li-col og-li-col-8 text-center">Yes</div>
                    </div> */}
                    <div id="no-match" className="no-match og-li  text-center hide">Sorry, No Student Matches your Criteria</div>
                </div>
                </>
        )
    
}

export default PublisherProduct