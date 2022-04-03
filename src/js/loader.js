import {parseMetrics} from "./parser";
import {HEALTH_ENDPOINT, LEDGER_ENDPOINT} from "./consts";
import {updateData} from "./updater";

export const loadApiData = async (path = LEDGER_ENDPOINT) => {
    if (!nodeAddress || !apiPort) return

    try {
        const link = `http://${nodeAddress}:${Math.abs(apiPort)}${path}`
        const request = await fetch(link)

        if (request.ok) {
            if (path === LEDGER_ENDPOINT) {
                data.api = await request.json()
            } else if (path === HEALTH_ENDPOINT) {
                data.health = await request.text()
            } else {

            }
        } else {
            // data.api = false
        }
    } catch (e) {
        data.api = false
        data.health = "aptos-node:error"
    }
}

export const loadMetricData = async () => {
    if (!nodeAddress || !metricPort) return

    const link = `http://${nodeAddress}:${Math.abs(metricPort)}/metrics`
    const request = await fetch(link, {mode: 'cors'})


    if (request.ok) {
        data.metric = parseMetrics(await request.text())
    } else {
        data.metric = false
    }
}

export const loadData = async () => {
    if (nodeAddress) {
        await loadApiData(LEDGER_ENDPOINT)
        await loadApiData(HEALTH_ENDPOINT)

        updateData()
    }

    setTimeout( loadData, 5000)
}