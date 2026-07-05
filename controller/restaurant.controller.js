import RestaurantModel from "../Models/Restaurant.model.js"
import axios from "axios";
//Create 
export default async function createRestaurant(req,res){
const{name,imageUrl,rating,cuisines,deliveryTime} = req.body

try{
    const newRestaurant = await RestaurantModel.create(
        {name,imageUrl,rating,cuisines,deliveryTime}
    )
    return res.status(201).json({'newRestaurant': newRestaurant})
}
catch(err){
return res.status(500).json({"errorMes":err})
}
}


// Read 
 
export async function fetchRestaurants(req,res){
    try{
        const data = await RestaurantModel.find({})
    if(!data){
        return res.status(404).json({"message":"not Found"})
    }
    return res.status(201).json(data)
}
catch(err){
return res.status(500).json({"errorMes":err})
}
}

//Update

export async function updateRestaurant(req,res){
    try{
        const iddd =req.params.id
        //  console.log(iddd)
        let updatedRestaurant = await RestaurantModel.findByIdAndUpdate(iddd,req.body,{new:true})
        return res.status(200).json(updatedRestaurant)
    }
    catch(err){
return res.status(500).json({"errorMes":err})
}
}


//delete 

export  async function deleteRestaurant(req,res){
  try{
      const iddd = req.params.id
    let deletedRestaurant = await RestaurantModel.findByIdAndDelete(iddd)
    return res.status(200).json({"delete Restaurant":deletedRestaurant})

  }
     catch(err){
return res.status(500).json({"errorMes":err})
}
}


export async function getSwiggyRestaurants(req, res) {
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.69230&lng=76.98600&page_type=DESKTOP_WEB_LISTING"
    );

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

//Menu controller

export async function getRestaurantMenu(req, res) {
  try {
    const menuData = {
      data: {
        cards: [
          {
            card: {
              card: {
                itemCards: [
                  {
                    card: {
                      info: {
                        id: "1",
                        name: "Margherita Pizza",
                        price: 25000,
                        category: "Pizza",
                        imageId: ""
                      }
                    }
                  },
                  {
                    card: {
                      info: {
                        id: "2",
                        name: "Veg Burger",
                        price: 12000,
                        category: "Burger",
                        imageId: ""
                      }
                    }
                  },
                  {
                    card: {
                      info: {
                        id: "3",
                        name: "Cold Coffee",
                        price: 8000,
                        category: "Drinks",
                        imageId: ""
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    };

    return res.status(200).json(menuData);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}