import {DATE_TIME_FORMAT, METRIC_DEFAULT} from "./consts";
import {n2f} from "./utils";

export const updateLedgerData = (data) => {
    const ledger = data.ledger
    const target = data.target
    const error = typeof ledger.error !== "undefined"
    const apiStatus = $("#api_status")
    const chainStatus = $("#chain_status")
    const errorLog = $("#error-log-api").clear()

    if (!error) {
        $("#chain_id").text(ledger.chain_id)
        $("#epoch").text(ledger.epoch)
        $("#ledger_version").text(ledger.ledger_version)
        $("#ledger_timestamp").text(datetime(ledger.ledger_timestamp / 1000).format(DATE_TIME_FORMAT))
    } else {
        errorLog.clear().append(
            $("<div>").addClass("remark alert").text(`API: ${ledger.error}`)
        )
        $("#chain_id").text(0)
        $("#epoch").text(0)
        $("#ledger_version").text(0)
        $("#ledger_timestamp").text(DATE_TIME_FORMAT)
    }

    apiStatus.parent().removeClassBy("bg-").addClass("fg-white")
    if (!error && ledger && ledger.chain_id) {
        apiStatus.parent().addClass("bg-green")
        apiStatus.text("CONNECTED")
    } else {
        apiStatus.parent().addClass("bg-red")
        apiStatus.text("PORT CLOSED")
    }

    chainStatus.parent().removeClassBy("bg-").addClass("fg-white")
    if (!error && ledger && +ledger.chain_id) {
        if (+ledger.chain_id === 6) {
            chainStatus.parent().addClass("bg-green")
            chainStatus.text("IN CHAIN")
        } else {
            chainStatus.parent().addClass("bg-red")
            chainStatus.text("UPDATE NODE")
        }
    } else {
        chainStatus.parent().addClass("bg-red")
        chainStatus.text("NO CHAIN DATA")
    }

    if (target && target.host) {
        $("#node_host").text(target.host)
    }
}

export const updateHealthData = (data) => {
    const error = data.health.includes(":error:")
    const n = $("#node_health").removeClassBy("fg-")

    if (error) {
        n.addClass("fg-red").text("aptos-node:error")
    } else {
        const h = data.health
        const c = h && !h.includes("error") ? "fg-green" : "fg-red"

        n.removeClassBy("fg-").addClass(c).text(h ? h : "aptos-node:error")
    }
}

export const updateMetricData = (d) => {
    let metric
    const status = typeof d.system_physical_core_count !== "undefined"
    const errorLog = $("#error-log-metric").clear()

    if (!status) {
        errorLog.html(
            `<div class="remark alert">Metric: ${d.split(":error:")[1]}</div>`
        )
        metric = METRIC_DEFAULT
    } else {
        metric = (d)
    }

    for (let o in metric) {
        if (["sync_timestamp_committed", "sync_timestamp_real", "sync_timestamp_synced"].includes(o)) {
            $(`#${o}`).text(datetime(+metric[o]).format(DATE_TIME_FORMAT))
        } else {
            $(`#${o}`).text(n2f(metric[o]))
        }
    }

    const syncStatus = $("#sync_status")

    syncStatus.parent().removeClassBy("bg-").addClass("fg-white")
    if (+metric.sync_synced > 0 && Math.abs(metric.sync_synced - metric.sync_target) <= 2 ) {
        syncStatus.parent().addClass("bg-green")
        syncStatus.text("SYNCED")
    } else {
        syncStatus.parent().addClass("bg-red")
        syncStatus.text(!status ? "NO DATA" : "NOT SYNCED")
    }

    const peerStatus = $("#peer_status")

    peerStatus.parent().removeClassBy("bg-").addClass("fg-white")
    if (+metric.connections_outbound > 0 ) {
        peerStatus.parent().addClass("bg-green")
        peerStatus.text("OK")
    } else {
        peerStatus.parent().addClass("bg-red")
        peerStatus.text("NO PEERS")
    }

    const metricStatus = $("#metric_status")

    metricStatus.parent().removeClassBy("bg-").addClass("fg-white")
    if (status) {
        metricStatus.parent().addClass("bg-green")
        metricStatus.text("CONNECTED")
    } else {
        metricStatus.parent().addClass("bg-red")
        metricStatus.text("PORT CLOSED")
    }
}


export const updateApiData = (data) => {
    updateLedgerData(data)
    updateHealthData(data)
}


export const updatePortTest = data => {
    const ports = data.test
    const targets = data.target.ports

    if (!ports) return

    for(let port in targets){
        const el = $("#port-"+port)
        const pr = el.parent()
        pr.removeClassBy("bg-").addClass(ports[port] ? "bg-green" : "bg-red").addClass("fg-white")
        el.html(`${(""+port).toUpperCase()}: <span class="text-bold">${targets[port]}</span>`)
    }
}