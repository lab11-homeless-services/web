import React, { useState, useLayoutEffect } from 'react'
import axios from 'axios'

export default function useFetchSingle(url) {
    const [data, setData] = useState([])
    console.log(url)
    async function getResources() {
        try {
            const response = await axios.get(url)
            console.log(response.data)
            const data = await response.data
            setData(data)
        } catch(error) {
            console.log(error)
        }
        
    }
    useLayoutEffect(() => {
        getResources()
    },[url])
    return data
}