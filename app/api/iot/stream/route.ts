import { fetchAllIoTData } from "@/lib/thingspeak";
import { CORS_HEADERS } from "@/lib/api-service";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const encoder = new TextEncoder();

    // Create a ReadableStream for Server-Sent Events (per-request stream suitable for Serverless)
    let isCancelled = false;
    let timer: NodeJS.Timeout | null = null;

    const stream = new ReadableStream({
        async start(controller) {
            // Send initial connection message
            const connectionMessage = {
                type: "connection",
                message: "Connected to IoT data stream",
                timestamp: new Date().toISOString(),
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(connectionMessage)}\n\n`));

            const sendIoTUpdate = async () => {
                if (isCancelled) return;
                try {
                    const data = await fetchAllIoTData();
                    if (isCancelled) return;

                    const message = {
                        type: "iot-update",
                        data: data,
                        timestamp: new Date().toISOString(),
                    };
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
                } catch (error) {
                    if (isCancelled) return;
                    console.error("Error fetching IoT data in stream:", error);
                    const errorMessage = {
                        type: "error",
                        message: "Failed to fetch IoT data",
                        timestamp: new Date().toISOString(),
                    };
                    try {
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorMessage)}\n\n`));
                    } catch {
                        // ignore enqueue errors if closed
                    }
                }
            };

            // Send first data immediately
            await sendIoTUpdate();

            // Periodic updates every 15s per connection
            timer = setInterval(() => {
                sendIoTUpdate();
            }, 15000);
        },

        cancel() {
            isCancelled = true;
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        },
    });

    // Also listen to request abort signal
    req.signal.addEventListener("abort", () => {
        isCancelled = true;
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": CORS_HEADERS["Access-Control-Allow-Origin"],
            "Access-Control-Allow-Headers": "Cache-Control",
        },
    });
}
