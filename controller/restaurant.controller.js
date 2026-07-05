import RestaurantModel from "../Models/Restaurant.model.js"

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

