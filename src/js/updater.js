import {DATE_TIME_FORMAT} from "./consts";
import {parseMetrics} from "./parser";
import {n2f} from "./utils";

export const updateApiData = () => {
    const ledger = data.api
    const apiStatus = $("#api_status")
    const chainStatus = $("#chain_status")

    if (ledger) {
        $("#chain_id").text(ledger.chain_id)
        $("#epoch").text(ledger.epoch)
        $("#ledger_version").text(ledger.ledger_version)
        $("#ledger_timestamp").text(datetime(ledger.ledger_timestamp / 1000).format(DATE_TIME_FORMAT))
    } else {
        $("#chain_id").text(0)
        $("#epoch").text(0)
        $("#ledger_version").text(0)
        $("#ledger_timestamp").text(DATE_TIME_FORMAT)
    }

    apiStatus.parent().removeClassBy("bg-")
    if (ledger && ledger.chain_id) {
        apiStatus.parent().addClass("bg-green")
        apiStatus.text("CONNECTED")
    } else {
        apiStatus.parent().addClass("bg-red")
        apiStatus.text("NOT CONNECTED")
    }

    chainStatus.parent().removeClassBy("bg-")
    if (ledger && +ledger.chain_id === 6) {
        chainStatus.parent().addClass("bg-green")
        chainStatus.text("IN CHAIN")
    } else {
        chainStatus.parent().addClass("bg-red")
        chainStatus.text("UPDATE NODE")
    }
}

export const updateHealthData = () => {
    const h = data.health
    const c = h && !h.includes("error") ? "fg-green" : "fg-red"
    const n = $("#node_health")

    n.removeClassBy("fg-").addClass(c).text(h ? h : "aptos-node:error")
}

export const updateMetricData = (d) => {
    let metric
    const status = !!d

    if (!d) {
        metric = {
            "connections_inbound": "0",
            "connections_outbound": "0",
            "sent_requests_total": "0",
            "sent_requests_summary_server": "0",
            "jellyfish_internal_encoded_bytes": "0",
            "jellyfish_leaf_encoded_bytes": "0",
            "jellyfish_storage_reads": "0",
            "metrics_families_over_1000": "0",
            "metrics_total": "0",
            "metrics_total_bytes": "0",
            "network_direct_send_bytes_received": "0",
            "network_direct_send_bytes_sent": "0",
            "network_direct_send_messages_received": "0",
            "network_direct_send_messages_sent": "0",
            "network_pending_health_check_events_dequeued": "0",
            "network_pending_health_check_events_enqueued": "0",
            "network_rpc_bytes_received_request": "0",
            "network_rpc_bytes_received_response": "0",
            "network_rpc_bytes_sent_request": "0",
            "network_rpc_bytes_sent_response": "0",
            "network_rpc_messages_received_request": "0",
            "network_rpc_messages_received_response": "0",
            "network_rpc_messages_sent_request": "0",
            "network_rpc_messages_sent_response": "0",
            "secure_net_events_connect": "0",
            "secure_net_events_read": "0",
            "simple_onchain_discovery_counts": "0",
            "state_sync_pending_network_events_dequeued": "0",
            "state_sync_pending_network_events_enqueued": "0",
            "state_sync_reconfig_count": "0",
            "state_sync_timeout_total": "0",
            "sync_committed": "0",
            "sync_highest": "0",
            "sync_synced": "0",
            "sync_target": "0",
            "storage_committed_txns": "0",
            "storage_latest_account_count": "0",
            "storage_latest_transaction_version": "0",
            "storage_ledger_events_created": "0",
            "storage_ledger_new_state_leaves": "0",
            "storage_ledger_new_state_nodes": "0",
            "storage_ledger_stale_state_leaves": "0",
            "storage_ledger_stale_state_nodes": "0",
            "storage_ledger_version": "0",
            "storage_next_block_epoch": "0",
            "storage_service_server_pending_network_events_dequeued": "0",
            "storage_service_server_pending_network_events_enqueued": "0",
            "storage_service_server_requests_received": "0",
            "storage_service_server_responses_sent": "0",
            "struct_log_count": "0",
            "struct_log_processed_count": "0",
            "vm_num_txns_per_block_sum": "0",
            "vm_num_txns_per_block_count": "0",
            "vm_system_transactions_executed": "0",
            "vm_txn_gas_usage_sum": "0",
            "vm_txn_gas_usage_count": "0",
            "vm_user_transactions_executed": "0",
            "core_mempool_gc_event_count_client_expiration": "0",
            "core_mempool_gc_event_count_system_ttl": "0",
            "shared_mempool_events_new_peer": "0",
            "system_physical_core_count": "0",
            "system_total_memory": "0",
            "system_used_memory": "0"
        }
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

    syncStatus.parent().removeClassBy("bg-")
    if (+metric.sync_synced > 0 && Math.abs(metric.sync_synced - metric.sync_target) <= 2 ) {
        syncStatus.parent().addClass("bg-green")
        syncStatus.text("SYNCED")
    } else {
        syncStatus.parent().addClass("bg-red")
        syncStatus.text("NOT SYNCED")
    }

    const peerStatus = $("#peer_status")

    peerStatus.parent().removeClassBy("bg-")
    if (+metric.connections_outbound > 0 ) {
        peerStatus.parent().addClass("bg-green")
        peerStatus.text("OK")
    } else {
        peerStatus.parent().addClass("bg-red")
        peerStatus.text("NO PEERS")
    }

    const metricStatus = $("#metric_status")

    metricStatus.parent().removeClassBy("bg-")
    if (status) {
        metricStatus.parent().addClass("bg-green")
        metricStatus.text("CONNECTED")
    } else {
        metricStatus.parent().addClass("bg-red")
        metricStatus.text("NOT CONNECTED")
    }
}


export const updateData = () => {
    updateApiData()
    updateHealthData()
}
