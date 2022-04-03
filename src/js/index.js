import {currentTime} from "./current-time";
import {connect} from "./websocket";

;$(() => {
    currentTime()
    connect()
})