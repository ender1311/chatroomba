//custom hook 
// takes code that runs asyncronously like getPosts that returns value, error, and loading state

import { useCallback, useEffect, useState } from "react"

// automatically run useEffect when anything changes like new posts
// need to get loading, error, and value
// when dependencies change, then execute is run

export function useAsync(func, dependencies = []) {
    const { execute, ...state } = useAsyncInternal(func, dependencies, true)
  
    useEffect(() => {
      execute()
    }, [execute])
  
    return state
  }

//manual run useEffect when I need it
//return the results of the useAsyncInternal
export function useAsyncFn(func, dependencies = []) {
    return useAsyncInternal(func, dependencies, false)
  }

//creating state to inform us if loading, error, and value
// func would be getPosts() from Postlist.js
function useAsyncInternal(func, dependencies, initialLoading = false) {
    const [loading, setLoading] = useState(initialLoading)
    const [error, setError] = useState()
    const [value, setValue] = useState()
  
    const execute = useCallback((...params) => {
      setLoading(true)
      return func(...params)
        .then(data => {
          setValue(data)
          setError(undefined)
          return data
        })
        .catch(error => {
          setError(error)
          setValue(undefined)
          return Promise.reject(error)
        })
        .finally(() => {
          setLoading(false)
        })
        //only execute this when dependencies change
    }, dependencies)

    return {loading, error, value, execute}
}