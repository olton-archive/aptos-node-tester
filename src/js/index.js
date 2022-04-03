import {currentTime} from "./current-time";
import {loadData} from "./loader";
import {connect} from "./websocket";

;$(() => {
    currentTime()
    loadData()
    connect()
})