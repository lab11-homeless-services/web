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

// export default function useEndpoint(req) {
//     const [res, setRes] = useState({
//       data: null,
//       pending: false,
//       completed: false,
//       error: false,
//     });
    
//     useEffect(() => {
//       setRes({
//         data: null,
//         pending: true,
//         completed: false,
//         error: false,
//       });
//       axios(req)
//         .then(res =>
//           setRes({
//             data: res.data,
//             pending: false,
//             error: false,
//             complete: true
//           }),
//         )
//         .catch(() =>
//           setRes({
//             data: null,
//             pending: false,
//             error: true,
//             complete: true
//           }),
//         );
//     }, [req.url]);
//     return res;
//   }