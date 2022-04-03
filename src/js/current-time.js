import {DATE_TIME_FORMAT} from "./consts";

export const currentTime = () => {
    $("#current-time").html(datetime().format(DATE_TIME_FORMAT))
    setTimeout( currentTime, 1000)
}