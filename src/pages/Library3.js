import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import { useNavigate } from 'react-router-dom';
function Library() 
{

    const navigate=useNavigate();
    const isLoggedIn=sessionStorage.getItem("IsLoggedIn");
    const [tran, setTran] = useState('p')
    const [lang,setLang]= useState([]);
    const [genere,setGenere]= useState([]);
    const UserId=sessionStorage.getItem("UserId");
    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [filteredData2, setFilteredData2] = useState([]);

    useEffect(() => {

        fetch("https://localhost:44370/api/products/Getproducts")
            .then(res => res.json())
            .then((result) => { setData(result); setFilteredData(result); setFilteredData2(result); });
        fetch("https://localhost:44370/api/languages/Getlanguages")
            .then(res => res.json())
            .then((result) =>{setLang(result)});
        fetch("https://localhost:44370/api/generes/Getgeneres")
            .then(res => res.json())
            .then((result) =>{setGenere(result)});
    }, [])

    const onButton = (event) => {
       
        if (event.target.checked){
           
            setTran('r');
            fetch("https://localhost:44370/api/products/GetproductRentable")
            .then(res => res.json())
            .then((result) => { setData(result); setFilteredData(result); setFilteredData2(result); });
           
        }
        else{
            
            setTran('p')
            fetch("https://localhost:44370/api/products/Getproducts")
            .then(res => res.json())
            .then((result) => { setData(result); setFilteredData(result); setFilteredData2(result); });
            
        }

    };
    const onFilterLang = (event) => {
                // console.log(event.target.value)
                let val=event.target.value;
                // console.log(val)
                if(val==1)
                {console.log("case1");
                setFilteredData2(data.filter((elem) => elem.product_language=='1'));
                setFilteredData(data.filter((elem) => elem.product_language=='1'));
            
                 }
                else if(val==2)
                {console.log("case2");
                setFilteredData2(data.filter((elem) => elem.product_language=='2'));
                setFilteredData(data.filter((elem) => elem.productLanguage=='2'));
             }
                else if(val==4)
                {console.log("case4");
                setFilteredData2(data.filter((elem) => elem.productLanguage=='4')); 
                setFilteredData(data.filter((elem) => elem.product_language=='4')); 
            }
                else if(val==3)
                {console.log("case3");
                setFilteredData2(data.filter((elem) => elem.product_language =='3'));
                setFilteredData(data.filter((elem) => elem.product_language =='3'));
            }
                
                else if(val==5)
                {console.log("case5");
                setFilteredData2(data.filter((elem) => elem.product_language =='5')); 
                setFilteredData(data.filter((elem) => elem.product_language =='5')); 
            }
                else if(val==0)
                {console.log("case0");
                setFilteredData2(data);
                setFilteredData(data);
                }
                else
                {  setFilteredData2(data);}
              
    };

    const onFilterGenere = (event) => {
        // console.log(event.target.value)
        let val=event.target.value;
        // console.log(val)
        if(val==1)
        {
            console.log("case1");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='1'));}
        else if(val==2)
        {console.log("case2");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='2'));}
        else if(val==3)
        {console.log("case3");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='3'));}
        else if(val==4)
        {console.log("case4");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='4'));}
        else if(val==5)
        {console.log("case5");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='5'));}
        else if(val==6)
        {console.log("case6");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='6'));}
        else if(val==7)
        {console.log("case7");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='7'));}
        else if(val==8)
        {console.log("case8");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='8'));}
        else if(val==9)
        {console.log("case9");
        setFilteredData(filteredData2.filter((elem) => elem.product_genere =='9'));}
        else if(val==0)
        {console.log("case0");
        setFilteredData(filteredData2);
        }
        else
        {setFilteredData(filteredData2);}
      
};
    
    const submitHandler = (id) => 
    {
        if(isLoggedIn)
        {
            const cart = { 'Product_id': id, 'user_id': UserId, 'is_selected': 'Y' }
            const url = "https://localhost:44370/api/carts/Postcart"
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart)
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => { alert(result) })
        }   
        else
        {
            var z = window.confirm("Please Log In First!");
            if(z)
            navigate("/Login");
            if(z==false)
            navigate('/Library');
        }

    }
    const searchBook = (event) => {
        if(event.target.value=='')
        {
            fetch("https://localhost:44370/api/products/Getproducts")
            .then(res => res.json())
            .then((result) => { 
                setData(result); 
                setFilteredData(result); 
                setFilteredData2(result); 
            });
        }
        else
        {
            fetch("https://localhost:44370/api/products/GetproductByName/"+event.target.value)
            .then(res => res.json())
            .then((result) =>
             {
                  setData(result); 
                  setFilteredData(result); 
                  setFilteredData2(result); 
                }
                );
        }
    }


    return (
        <><Navigationbar/>
        <Container fluid style={{ textAlign: 'left' }}>
            <Row style={{ padding: '10px' }}>
                <Col xs={2}><h2><b>bookWorm</b></h2></Col>
                <Col xs={4}><h2>Books to Sell</h2></Col>
                {/* <Col xs={4}>
                    <div class="btn-group" >
                        <Button variant="light" id="bt1" onClick={()=>onButton("buy")} value="buy" class="button">&nbsp;&nbsp;&nbsp;Buy&nbsp;&nbsp;&nbsp;</Button>
                        <Button variant="light" id="bt2" onClick={()=>onButton("rent")} value="rent" class="button">&nbsp;&nbsp;&nbsp;Rent&nbsp;&nbsp;&nbsp;</Button>

                    </div>
                </Col>
                {isLoggedIn?<Col xs={2}><Link to="/Cart"> <Button variant="primary" style={{ align: 'right' }}>Visit Cart{'>'}</Button></Link></Col>:''} */}
            
            
            
            </Row>


            <Row>
                <Col xs={2}><h2><b>

                    {/* <Container style={{ paddingTop: '70px' }}> */}
                        <Row style={{  paddingBottom: "30px", fontSize:"50px"}}>
                            <Button style={{padding:"7px"}} variant="light" value={0} onClick={onFilterLang}><b>All Books</b></Button>
                        </Row>
                        <Row style={{ paddingLeft: "18px", paddingBottom: "30px", fontSize:"18px"}} >
                            <select onChange={onFilterLang}>
                                <option value={0}>Select Language</option>
                                {console.log(lang)}
                                {lang.map(elem=>{
                                    return<option value={elem.lang_id}>{elem.lang_desc}</option>
                                })}
                            </select>                           
                        </Row>

                        <Row style={{ paddingLeft: "18px", paddingBottom: "20px", fontSize:"18px"}}>
                        <select onChange={onFilterGenere}>
                                <option value={0}>Select Genere</option>
                                {console.log(genere)}
                                {genere.map(elem=>{
                                    return<option value={elem.genere_id}>{elem.genere_desc}</option>
                                })}
                            </select> 
                        </Row>
                        


                    {/* </Container> */}
                </b></h2></Col>
                <Col xs={9}><h2>
                    <Container fluid>
                        {/* <Row>
                <img src={Bookcases} alt="displayimg"></img>
            </Row> */}
                        
                        <form onSubmit={searchBook}>
            <div className="form-group">
            <div class="row">
            <div class="col" align="center">
          <input type="text" className="form-control" name="user_name" placeholder="Search a book.." required="required"
            onChange={searchBook} />
            </div>
            <div class="col" align="center">
            <input type="checkbox" id="rent" name="rent" value="rent" onClick={onButton} />
            <label for="rent" style={{fontSize:'20px'}}><b> See Rentable Books</b></label>
            </div>
            </div>
            </div>
            </form>
            
            <hr></hr>



                        <Row>
                            {filteredData.map(book => (

                                <Col xs={3} style={{ paddingBottom: "20px" }} >
                                    <Card  >
                                        {/* <Card.Img variant="top" src={book.productImage+"/190px280"} /> */}
                                        {/* keep image size horizontal 190 px */}
                                        <Card.Body>
                                        <Card.Title> <img  src={"../images/" + book.product_image} width="170px" height="250px"></img></Card.Title>

                                            <Link to={"/Description/" + book.product_id} style={{ textDecorationLine: "none" }}>
                                                <Card.Title ><b>{book.product_name}</b></Card.Title>
                                            </Link>
                                            {tran=='p'?
                                            (<div style={{ paddingLeft: "0px" }} >
                                                  <Card.Title><Button variant="primary" onClick={() => { submitHandler(book.product_id) }} >Add to Cart</Button></Card.Title>
                                              </div>):(<div className="mx-auto">
                                              <Card.Title><Button variant="primary" href={"/Description/" + book.product_id}>Rent</Button></Card.Title>
                                              </div>)}
                                                
                                        </Card.Body>
                                    </Card>
                                </Col>

                            ))}
                        </Row>

                    </Container>
                </h2></Col>
            </Row>
        </Container></>
    );
}





export default Library;