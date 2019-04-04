import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetch(url) {
    //sets empty state array(local)
    const [data, setData] = useState([])
    async function getResources() {
        const response = await axios.get(url)
        const data = await response.data
        setData(data)
    }
    //operates as a CDM to local state
    useEffect(() => {
        getResources()
    },[])
    return data
}

