import React from 'react';
import axios from 'axios';


const Authentication = async () => {
    let dataR = [false, {}];
    
    //Authentication_____________________________________
    try{
        let obj = {
            method: 'POST',
            url: 'https://directory-client-server.vercel.app/authentication',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('_SClrTk')}`
            } 
        }

        if(localStorage.getItem('_SClrTk')){
            const { data } = await axios(obj);
            if(data.success){
                dataR = [true, data.data];
            }
        }   
    }catch(e){

    }

    return dataR
}

export default Authentication;