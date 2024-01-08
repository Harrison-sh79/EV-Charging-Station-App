import axios from "axios";

const url = `https://api.geoapify.com/v2/places?
categories=service.vehicle
&filter=circle:-73.586113,45.507303,5000
&bias=proximity:-73.586113,45.507303
&lang=en&limit=5&apiKey=YOUR_API_KEY`

const category = "service.vehicle.charging_station"
const base_url = "https://api.geoapify.com/v2/places"
const limit = 10
const apiKey = "1ea55f028a9e41b182d7c3741a5c2ebd"
const radius = 5000
const language = "en"

export const getNearByPlaces = async (location:any) =>{
  const url = `${base_url}?categories=${category}&filter=circle:${location?.lng},${location.lat},${radius}&bias=proximity:${location?.lng},${location.lat}&lang=${language}&limit=${limit}&apiKey=${apiKey}`
  const response = await axios.get(url)
  return response.data
}