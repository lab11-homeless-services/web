import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetchSingle(url) {
    const [data, setData] = useState([])
   
    async function getResources() {
        try {
            const response = await axios.get(url)
            const data = await response.data
            setData(data)
        } catch(error) {
            console.log(error)
        }
        
    }
    //calls once - checks current props === return 
    //runs as CDU on state
    useEffect(() => {
        getResources()
    },[url])
    return data
}