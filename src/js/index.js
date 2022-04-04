import {currentTime} from "./current-time";
import {connect} from "./websocket";

;$(() => {

    const address = Metro.utils.getURIParameter(window.location.href, "address")
    const api = Metro.utils.getURIParameter(window.location.href, "api")
    const metric = Metro.utils.getURIParameter(window.location.href, "metric")

    if (address) {
        $("#address-form")[0].elements['node_address'].value = address
        nodeAddress = address
    }

    if (api) {
        $("#address-form")[0].elements['api_port'].value = api
        apiPort = api
    }

    if (metric) {
        $("#address-form")[0].elements['metric_port'].value = metric
        metricPort = metric
    }

    currentTime()
    connect()
})