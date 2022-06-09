import {useState, useCallback} from 'react'

function useHttp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setPropess] = useState('waiting')

    const request = useCallback(async (url, method = 'GET', body = null, 

    headers = {'Content-Type': 'application/json'}) => {
        setError(false)
        setLoading(true);
        setPropess('loading')
        try {
          const response = await fetch(url, {method, body, headers})
          
          if(!response.ok){
            throw new Error(`Could not fets ${url}`);
          }
          const data = await response.json()

          setLoading(false)
          return data
        }
         catch (e) {
           setPropess('error')
           setLoading(false)
           setError(true)
           throw e
        }
        
    }, [])

    const clearErr = useCallback(() => setError(false), []);

    return {loading, request, error, clearErr, process, setPropess}
}

export default useHttp