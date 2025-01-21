import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        // Make sure the payload only includes name and category
        axios
            .post("http://localhost:3001/createProduct", { name, category })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2>Add Product</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input 
                            type="text" 
                            placeholder='Enter Name' 
                            className='form-control' 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Category</label>
                        <input 
                            type="text" 
                            placeholder='Enter Category' 
                            className='form-control' 
                            onChange={(e) => setCategory(e.target.value)} 
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
