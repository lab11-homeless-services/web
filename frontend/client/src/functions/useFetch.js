import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetch(url) {
    const [data, setData] = useState([])
    async function getResources() {
        const response = await axios.get(url)
        console.log(response.data)
        const data = await response.data
        setData(data)
    }
    useEffect(() => {
        getResources()
    },[])
    return data
}

