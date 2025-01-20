import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const {id} = useParams()
    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {console.log(result)
            setName(result.data.name)
            setCategory(result.data.category)
        })
        .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/updateUser/"+id, {name, category})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={Update}>
                <h2>Update User</h2>

                <div className='mb-2'>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control'
                    value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className='mb-2'>
                    <label htmlFor="">Category</label>
                    <input type="text" placeholder='Enter Category' className='form-control'
                    value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>


                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
    );
}

export default UpdateUser;