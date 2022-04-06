import {currentTime} from "./current-time";
import {connect} from "./websocket";

;$(() => {

    const ports = {
        api: apiPort,
        metrics: metricPort,
        seed: seedPort
    }
    const portsWrapper = $(".ports-wrapper")
    for(let p in ports) {
        portsWrapper.append(
            $("<div>").addClass("cell-fs-one-third").attr("title", `${(""+p).toUpperCase()} Port`).append(
                $("<div>").addClass("border bd-default p-2").append(
                    $("<span>").attr("id", `port-${p}`).text(`${p} port`)
                )
            )
        )
    }

    const address = Metro.utils.getURIParameter(window.location.href, "address")
    const api = Metro.utils.getURIParameter(window.location.href, "api")
    const metric = Metro.utils.getURIParameter(window.location.href, "metrics")
    const seed = Metro.utils.getURIParameter(window.location.href, "seed")

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

    if (seed) {
        $("#address-form")[0].elements['seed_port'].value = seed
        seedPort = seed
    }

    currentTime()
    connect()
})