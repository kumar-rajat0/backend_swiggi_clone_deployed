import createRestaurant, { deleteRestaurant, fetchRestaurants, updateRestaurant ,  getSwiggyRestaurants} from "../controller/restaurant.controller.js";
import { verifyTOken } from "../middleware/verifyToken.js";

export default function restaurantRoute(app){
    app.post('/api/restaurant',createRestaurant)

    app.get('/api/restaurants',verifyTOken,fetchRestaurants)

    app.patch('/api/restaurant/:id' ,updateRestaurant )

    app.delete('/api/restaurant/:id' ,  deleteRestaurant)

    app.get("/api/swiggy-restaurants", getSwiggyRestaurants);

}