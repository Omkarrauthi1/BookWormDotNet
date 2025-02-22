import React from 'react';
import '../pages/description.css';
//import Datetime from 'react-datetime';
import {useState, useEffect} from "react";
import { Link, useParams,useNavigate } from "react-router-dom"
import Navigationbar from './Navigationbar';


export function Description(props) 
{
   
    const isLoggedIn=sessionStorage.getItem("IsLoggedIn");
    const [Product, setProduct] = useState({});
    const uid=sessionStorage.getItem("UserId");
    const [disc,setDisc]=useState("");
    const [showPrice,setShowPrice]=useState(0);
    const [rent,setRent]=useState(false);
    
    const [rentdays,setRentDays]=useState(0);
    const [rentAmt,setRentAmt]=useState(0);
    const { id } = useParams()
    const navigate=useNavigate();
    useEffect(() => {
        fetch("https://localhost:44370/api/products/Getproduct/" + id)
            .then(res => res.json())
            .then((result) => { setProduct(result); 
                    discCalc(result);
                    setRent(result.is_rentable);
            }
            );
    }, []);

    const discCalc=(result)=>{
        let d1=new Date(result.product_offerprice_expirydate);
        let sp=result.product_sp_cost;
        let ofp=result.product_offerprice;
        let d2=Date.now();
        if(d1-d2>=0)
        {
            let s=((sp-ofp)/sp*100).toString();
            setDisc(s.substring(0,4))
            setShowPrice(ofp);
        }
        else
        {
            setDisc("0");
            setShowPrice(sp);
        }
        
    }
    var date_diff_indays = function(date1, date2) {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
      
        var diff=dt2.getTime()-dt1.getTime();
            console.log(diff/(1000*3600*24))
        return diff/(1000*3600*24)+1;

          }
    const handleChange=(event)=>{
        setRentDays(event.target.value);
        console.log(event.target.value)
        console.log("days:"+rentdays);
        setRentAmt((event.target.value)*Product.product_baseprice_perday);
    }

    const rentHandler=(id)=>
    {
        if(isLoggedIn)
        {
            sessionStorage.setItem("tran_type","true");
            sessionStorage.setItem("rend_days",rentdays);
            sessionStorage.setItem("rent_amt",rentAmt);
            const cart={'product_id':id,'user_id':uid,'is_selected':'Y'}
            const url="https://localhost:44370/api/carts/Postdirectbuy"
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart)
            }
                fetch(url,requestOptions)
                .then(res => res.json())
            .then((result) => {
                if(result=="You have Already purchased this Book !!!")
                alert(result)
                else
                navigate("/Payment")

            })
            //.then(response =>{ navigate("/Payment")})
            .catch(error => console.log('Form submit error: ', error))
        }   
        else
        {
            var z = window.confirm("Please Log In First!");
            if(z)
            navigate("/Login");
            if(z==false)
            navigate("/Description/"+id)
        }
    }

    const buyhandler=(id)=>
    {
        if(isLoggedIn)
        {
            alert("buy handler")
            sessionStorage.setItem("tran_type","false");
            const cart={'product_id':id,'user_id':uid,'is_selected':'Y'}
            const url="https://localhost:44370/api/carts/Postdirectbuy"
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart)
            }
                fetch(url,requestOptions)
                .then(res => res.json())
            .then((result) => {
                if(result=="You have Already purchased this Book !!!")
                alert(result)
                else
                navigate("/Payment")

            })
            //.then(response =>{ navigate("/Payment")})
            .catch(error => console.log('Form submit error: ', error))
        }   
        else
        {
            var z = window.confirm("Please Log In First!");
            if(z)
            navigate("/Login");
            if(z==false)
            navigate("/Description/"+id)
        }
    };

    

    const submitHandler=(id)=>
    {
        if(isLoggedIn)
        {
            const cart={'product_id':id,'user_id':uid,'is_selected':'N'}
            const url="https://localhost:44370/api/carts/Postcart"
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart)
            };
            fetch(url,requestOptions)
            .then(res => res.json())
            .then(response => alert(response))
            .catch(error => console.log('Form submit error: ', error))
            // Navigate('/');
        }   
        else
        {
            var z = window.confirm("Please Log In First!");
            if(z)
            navigate("/Login");
            if(z==false)
            navigate("/Description/"+id)
        }
    
    }
  return (
    <><Navigationbar/>
    <div className="container">
    
    <div className="card">
        <div className="card-body">
            <h2 className="card-title">{Product.product_name}</h2>
            <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-6">
                    <div className="white-box text-center"><img height="320px" width="240px" src={"../images/"+Product.product_image} className="img-responsive"/></div>
                </div>
                
                <div className="col-lg-7 col-md-7 col-sm-6">
                    <h4 className="box-title mt-5">Product description</h4>
                    <p>{Product.product_desc_long}</p>
                    {date_diff_indays(new Date().toDateString(),Product.product_offerprice_expirydate)>0?
                        <h3 className="mt-2">
                       <del>Price  ₹ : {Product.product_sp_cost}</del>
                        </h3>
                    :""}
                   
                    <h2 className="mt-2">
                    ₹ :{showPrice}<small className="text-success">({disc}% off)</small>
                    </h2>
                    {date_diff_indays(new Date().toDateString(),Product.product_offerprice_expirydate)>0?<h4 className="mt-2">
                        Offer will expire in {date_diff_indays(new Date().toDateString(),Product.product_offerprice_expirydate)} days.
                    </h4>:<h4>Offer Not available</h4>}
                    
                     {/* <button className="btn btn-dark btn-rounded mr-1" data-toggle="tooltip" title="" data-original-title="Add to cart">
                        <i className="fa fa-shopping-cart"></i>
                    </button>  */}
                    <button className="btn btn-primary btn-rounded" onClick={()=>{submitHandler(Product.product_id)}}>Add to Cart </button>
                    
                    <button className="btn btn-primary btn-rounded" onClick={()=>{buyhandler(Product.product_id)}}>Buy Now</button>
                    
                    
                    {(Product.is_rentable)?
                    (<><br/><br/><h4>Rent Price per day: ₹ {Product.product_baseprice_perday} 
                    </h4><h4>Rent amount:{rentAmt}</h4>
                    <input name="no_days" onChange={handleChange} type="number"/>
                    <button className="btn btn-primary btn-rounded" onClick={()=>{rentHandler(Product.product_id)}}>Rent</button><br/></>)
                     :("")}




                    <h3 className="box-title mt-5">Key Highlights</h3>
                    <ul className="list-unstyled">
                        <li><i className="fa fa-check text-success"></i>Free Reading</li>
                        <li><i className="fa fa-check text-success"></i>Focus On Main Points</li>
                        <li><i className="fa fa-check text-success"></i>Get Discounts</li>
                    </ul>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <h3 className="box-title mt-5">General Info</h3>
                    <div className="table-responsive">
                        <table className="table table-striped table-product">
                            <tbody>
                                <tr>
                                    <td width="390">Book English Name :</td>
                                    <td>{Product.product_english_name}</td>
                                </tr>
                                <tr>
                                    <td>Selling Price :</td>
                                    <td>{Product.product_sp_cost}</td>
                                </tr>
                                <tr>
                                    <td>Offer Price :</td>
                                    <td>{Product.product_offerprice}</td>
                                </tr>
                                <tr>
                                    <td>Offer Price Expiry Date :</td>
                                    <td>{new Date(Product.product_offerprice_expirydate).toDateString()}</td>
                                </tr>
                                <tr>
                                    <td>Product Description Short :</td>
                                    <td>{Product.product_desc_short}</td>
                                </tr>
                                <tr>
                                    <td>Product ISBN :</td>
                                    <td>{Product.product_isbn}</td>
                                </tr>
                                <tr>
                                    <td>Product Author ID :</td>
                                    <td>{Product.product_author_id}</td>
                                </tr>
                                <tr>
                                    <td>Product Publisher</td>
                                    <td>{Product.product_publisher}</td>
                                </tr>
                                <tr>
                                    <td>Product Language</td>
                                    <td>{Product.product_language}</td>
                                </tr>
                               


                                
                               {/*  <tr>
                                    <td>Model Number</td>
                                    <td>F01020701-00HT744A06</td>
                                </tr>
                                <tr>
                                    <td>Armrest Included</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Care Instructions</td>
                                    <td>Handle With Care,Keep In Dry Place,Do Not Apply Any Chemical For Cleaning.</td>
                                </tr>
                                <tr>
                                    <td>Finish Type</td>
                                    <td>Matte</td>
                                </tr> */}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>

    </div>
        
</div>
</div>

</>
            

  );
}; 


export default Description;