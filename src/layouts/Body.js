import { BrowserRouter, Switch, Route } from "react-router-dom";
import DishesAndDrink from "../components/DishesAndDrink";
import Menus from "../components/Menus";
import Services from "../components/Services";
import WeddingHalls from "../components/WeddingHalls";
import Weddings from "../components/Weddings";
import Footer from "./Footer";
import Header from "./Header";
import WeddingRent from "../components/WeddingRent";
import Register from "../components/Register";
import Login from "../components/Login";
import WeddingDetail from "../components/WeddingDetail";
import CreateWedding from "../components/CreateWedding";
import WeddingHallDetail from "../components/WeddingHallDetail";
import ServiceDetail from "../components/ServiceDetail";
import UpdateUser from "../components/UpdateUser";

export default function Body(){
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/weddinghalls" component={WeddingHalls} />
                <Route exact path="/weddinghalls/:weddinghallId" component={WeddingHallDetail} />
                <Route exact path="/services" component={Services} />
                <Route exact path="/services/:serviceId" component={ServiceDetail} />
                <Route exact path="/menus" component={Menus} />
                <Route exact path="/menus/:menuId/dishes-and-drink/" component={DishesAndDrink} />
                <Route exact path="/weddings" component={Weddings} />
                <Route exact path="/weddings/create-wedding/" component={CreateWedding} />
                <Route exact path="/weddings/:weddingId/wedding-rent/" component={WeddingRent} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/weddings/:weddingId/" component={WeddingDetail} />
                <Route exact path="/users/:userId/" component={UpdateUser} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}