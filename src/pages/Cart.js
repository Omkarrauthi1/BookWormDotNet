import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { Table ,Button, Container, Row,Col} from 'react-bootstrap';
import { Link,useNavigate } from "react-router-dom";
import Navigationbar from './Navigationbar';
export default function Cart(props){
    const uid=sessionStorage.getItem("UserId");
    // const uid=1;
    const [delcount,setDelcount]=useState(0);
    const [cartItems,setCartItems]=useState([]);
    const [selectCount,setSelectCount]=useState(0);
    const [total,setTotal]=useState("");
    const [btnState,setbtnState]=useState(false)
    const btn=useRef();
    let navigate = useNavigate();
    
    useEffect(()=>
    {
        fetch("https://localhost:44370/api/carts/Getcart/"+uid)
        .then(res => res.json())
        .then((result) =>  {setCartItems(result);
            
        } );
        fetch("https://localhost:44370/api/carts/Gettotalamt/"+uid)
        .then(res=>res.json())
        .then((result)=>{setTotal(result);
        console.log(total);
        if(result==0)
        setbtnState(true);
        else
        setbtnState(false);
            })
    },[delcount,selectCount]
    )

    const removeHandler=(cid)=>{
        ;
        const url="https://localhost:44370/api/carts/Deletecart/"+cid;
        fetch(url,{method:"Delete"})
        .then(response => setDelcount(delcount+1))
        .catch(error => console.log('Form submit error: ', error))
    }


    const checkHandler=(e)=>
    {

        console.log('inside check handler')
        const checked = e.target.checked;
        if (checked) {
            console.log('inside if');
            let temp=cartItems.find((item)=>item.Cart_id==e.target.value);
            temp.is_selected='y';
            console.log(cartItems);
            }
        else {
            let temp= cartItems.find(item=>item.Cart_id==e.target.value);
            temp.is_selected='n';
            console.log(cartItems);
            
           
        }
        
        submitHandler();

      }
        const submitHandler=()=>
        {
            console.log('inside submit handler')
            let user=cartItems.map((item)=>item);
            
            console.log('inside submit handler');
            console.log(user);
            const url = 'https://localhost:44370/api/carts/Addselected'
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
           fetch(url, requestOptions)
                .then(response => {console.log('Submitted successfully');
                setSelectCount(selectCount+1);})
                .catch(error => console.log('Form submit error: ', error))
               
            //     console.log(user);
            
        
        }

        const onPayment=()=>
        {
            sessionStorage.setItem("tran_type","false");
            navigate("/Payment")
        }
   
    return(
        <><Navigationbar/>
        <div style={{paddingTop:'20px'}}>
            <Table>
            <thead>
                <tr>
                <th>
                    <div>Pick</div>
                    </th>
                    <th>
                    <div>Product</div>
                    </th>
                    <th>
                    <div>Base Price</div>
                    </th>
                    <th>
                    <div>Special Price</div>
                    </th>
                    <th>
                    <div>Offer Price</div>
                    </th>
                    <th>
                    <div>Remove</div>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map(book=>
                            ( 
                                <tr key={book.Cart_id}>

                                <td><div className="form-check">
                                    <input type="checkbox" className="form-check-input mx-auto" id="check1" name="option1" value={book.Cart_id} 
                                    onChange={(event)=>checkHandler(event)} defaultChecked={book.is_selected.toLowerCase()==='y'}/>
                                        {/* <label class="form-check-label" for="check1">Option 1</label> */}
                                </div></td>
                                    <td>{book.product.product_baseprice}</td>
                                    <td>{book.product.product_name}</td>
                                    <td>{book.product.product_sp_cost}</td>
                                    <td>{book.product.product_offerprice}</td>
                                    <td><Button variant="danger" onClick={()=>{removeHandler(book.Cart_id)}}>Remove</Button></td>
                                </tr>
                            )

                        )
                    }
                </tbody>
            </Table>
            <Container style={{padding:"100px"}}>
            <Row>
                     <Col>
                     <h2>Total : ₹ {total}</h2>
                     </Col>
                 </Row>
                <Row>
                    <Col>
                     <Button onClick={onPayment} disabled={btnState} variant="primary" style={{align:'center',fontSize:"17px"}} >Proceed To Payment Page {'>'}</Button>
                    </Col>
                </Row>
            </Container>
        </div></>
    );
}

// import React from 'react';
// import { useState, useEffect } from "react";
// import { Table ,Button, Container, Row,Col} from 'react-bootstrap';
// import { Link } from "react-router-dom";
// export default function Cart(){
//     const uid=1;
//     const [delcount,setDelcount]=useState(0);
//     const [cartItems,setCartItems]=useState([]);
//     const [total,setTotal]=useState("");
//     useEffect(()=>{
//         fetch("http://localhost:8080/crud/productsfromcart/"+uid)
//         .then(res => res.json())
//         .then((result) => { setCartItems(result);
//         console.log(cartItems) ;});
//         fetch("http://localhost:8080/crud/totalfromcart/"+uid)
//         .then(res=>res.json())
//         .then((result)=>{setTotal(result);
//         console.log(total);
//     })
           
//     },[delcount]
//     )

//     const removeHandler=(cid)=>{
//         const url="http://localhost:8080/crud/removeFromCart/"+cid;
//         fetch(url,{method:"Delete"})
//         .then(response => setDelcount(delcount+1))
//         .catch(error => console.log('Form submit error: ', error))
//     }
//     return(
//         <div style={{paddingTop:'20px'}}>
//             <Table>
//             <thead>
//                 <tr>
//                     <th>
//                     <div>Product</div>
//                     </th>
//                     <th>
//                     <div>Base Price</div>
//                     </th>
//                     <th>
//                     <div>Special Price</div>
//                     </th>
//                     <th>
//                     <div>Offer Price</div>
//                     </th>
//                     <th>
//                     <div>Remove</div>
//                     </th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         cartItems.map(book=>
//                             ( 
//                                 <tr key={book[1].productId}>
//                                     <td>{book[1].productName}</td>
//                                     <td>{book[1].productBaseprice}</td>
//                                     <td>{book[1].productSpCost}</td>
//                                     <td>{book[1].productOfferprice}</td>
//                                     <td><Button variant="danger" onClick={()=>{removeHandler(book[0].cartId)}}>Remove</Button></td>
//                                 </tr>
//                             )

//                         )
//                     }
//                 </tbody>
//             </Table>
//             <Container style={{padding:"100px"}}>
//                 <Row>
//                     <Col>
//                     <h2>Total : ₹ {total}</h2>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                     <Link to="/Payment"> <Button variant="primary" style={{align:'center',fontSize:"17px"}}>Proceed To Payment Page {'>'}</Button></Link>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }