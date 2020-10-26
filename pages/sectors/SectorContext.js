import React, { createContext, useEffect, useReducer } from "react";
import {
  APIKEY,
  BASEURL,
  FAILURE,
  LOADING,
  SUCCESS,
} from "../../util/constants";

export const SectorContext = createContext();

const SectorProvider = ({ children }) => {
  const initialState = {
    result: null,
    loading: null,
    error: null,
  };

  const fetchReducer = (state, action) => {
    console.log("action", action);
    if (action.type === LOADING) {
      return {
        result: null,
        loading: true,
        error: null,
      };
    }
    if (action.type === SUCCESS) {
      return {
        result: action.payload.response,
        loading: false,
        error: null,
      };
    }
    if (action.type === FAILURE) {
      return {
        result: null,
        loading: false,
        error: action.payload.error,
      };
    }
    return state;
  };

  // Creating a Custom Hook
  const useFetch = (command) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);
    useEffect(() => {
      console.log('key',APIKEY);    
      dispatch({ type: LOADING });
      fetch(`${BASEURL}${command}${APIKEY}`)
        .then((response) => response.json())
        .then((response) => {
          dispatch({ type: SUCCESS, payload: { response } });
        })
        .catch((error) => {
          dispatch({ type: FAILURE, payload: error });
        });
    }, [command]);
    return [state.result, state.loading, state.error];
  };
  // Call the Hook
  const [result, loading, error] = useFetch("sectors");

  // USE a provider to share the props
  return (
    <SectorContext.Provider value={{ result, loading, error }}>
      {children}
    </SectorContext.Provider>
  );
};
export default SectorProvider; 