import {updateMetricData} from "./updater";

const isOpen = (ws) => ws && ws.readyState === ws.OPEN

export const connect = () => {
    const host = "95.216.7.245", port = 80, secure = false
    const ws = new WebSocket(`${secure ? 'wss' : 'ws'}://${host}:${port}`)

    globalThis.webSocket = ws

    ws.onmessage = event => {
        try {
            const content = JSON.parse(event.data)
            if (typeof wsMessageController === 'function') {
                wsMessageController.apply(null, [ws, content])
            }
        } catch (e) {
            console.log(e.message)
            console.log(event.data)
            console.log(e.stack)
        }
    }

    ws.onerror = error => {
        console.log('Socket encountered error: ', error.message, 'Closing socket');
        ws.close();
    }

    ws.onclose = event => {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', event.reason);
        setTimeout(connect, 1000)
    }

    ws.onopen = event => {
        console.log('Connected to Aptos Node Monitor');
    }
}

const wsMessageController = (ws, response) => {
    const {channel, data} = response

    if (!channel) {
        return
    }

    const requestData = ws => {
        if (isOpen(ws) && nodeAddress) {
            $("#activity").show()
            ws.send(JSON.stringify({
                channel: 'metrics2',
                data: {
                    host: nodeAddress,
                    port: metricPort,
                    prot: "http"
                }
            }))
        }

        setTimeout(requestData, 5000, ws)
    }

    switch(channel) {
        case 'welcome': {
            requestData(ws)
            break
        }
        case 'metrics2': {
            updateMetricData(data)
            $("#activity").hide()
            break
        }
    }
}
