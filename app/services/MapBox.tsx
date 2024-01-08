import axios from "axios";

const address_baseURL = "https://api.mapbox.com/search/searchbox/v1/suggest"
const location_baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places"
const language = "en"
const limit = 5
const session_token = "0afc30e1-dffb-48c1-88ce-37da4ad0aad0"
const country = "US"
const access_token = 'pk.eyJ1IjoiaGFycmlzb25zaCIsImEiOiJjbHFvbW1icWwzb3BnMm1ucGUycWZ1MGtuIn0.BxMObrQvNqtsUFZKeqIVhg'
const proximity = "ip"
const header_config = {
  "Content-Type" : "application/json"
}

export const getAddressList = async (searchText:any) =>{

  const url = `${address_baseURL}?q=${searchText}
  &language=${language}
  &session_token=${session_token}
  &access_token=${access_token}`
  const result = await axios.get(url) 
  return result.data.suggestions
}

export const getLocationList = async (searchText:any) =>{
  const url = `${location_baseURL}/${searchText}\.json?proximity=${proximity}&access_token=${access_token}`
  const result = await axios.get(url) 
  return result.data.features
}

