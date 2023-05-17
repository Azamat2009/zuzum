import axios from "axios";
// import {cardReload} from '/modules/ui'
// import {getData} from '/modules/HTTP.reuest'
// import {createGoods} from '/modules/goods'


let locData = JSON.parse(localStorage.getItem("users"))

if (!locData) {
    location.assign("/pages/registration.html")
}
