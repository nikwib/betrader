// const initialState = { sectors: null}
export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export const BASEURL = "https://apiservice.borsdata.se/v1/";
export const APIKEY = `?authKey=${process.env.NEXT_PUBLIC_BD_API_KEY}`;
export const ALL_INSTRUMENTS_URL = `instruments`;
