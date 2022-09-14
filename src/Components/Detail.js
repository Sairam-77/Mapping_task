import React, { useContext, useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';

const Detail = () => {
    const navigate = useNavigate();
    const {selected} = useContext(Context);
    

  return <>
  <button className='btn btn-primary' onClick={()=>navigate('/')}>Back</button>
  <h2 className='text-center p-3'>{selected.Location}</h2>
    <div className='main-detail'>
        <div className='state-img'>
        {
            selected.image?<img src={selected.image} alt='img' />:<h1>Loading..</h1>
        }
            
        </div>
        <table className=" t2 table table-hover">
        <thead>
            <tr className='text-center'>
            <th scope="col">#</th>
            <th scope="col">District</th>
            <th scope="col">Cases Rate</th>
            <th scope="col">Death Rate</th>
            </tr>
        </thead>
        
        <tbody>
            {
            selected==undefined?<p>loading..</p>: selected.district.map((e,i)=>{
                return <tr className='text-center'>
                    <td>{i+1}</td>
                    <td>{e.name}</td>
                    <td>{e.affected}</td>
                    <td className='text-danger'>{e.death}</td>
                </tr>
            })
            }
        </tbody>
        
        
        </table>
</div>
  </>
}

export default Detail

