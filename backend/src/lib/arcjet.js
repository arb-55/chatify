import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

import { ENV } from "./env.js";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "DRY_RUN" }), // DRY_RUN: logs but doesn't block (LIVE mode blocks base64 image payloads)

    // Bot detection in DRY_RUN so real browsers are never falsely blocked.
    // The slidingWindow rate limiter below still protects against abuse.
    detectBot({
      mode: "DRY_RUN", // Logs bot activity without blocking
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // "CATEGORY:MONITOR",  // Uptime monitoring services
        // "CATEGORY:PREVIEW",  // Link previews e.g. Slack, Discord
      ],
    }),

    // Rate limiting: max 100 requests per 60 seconds per IP
    slidingWindow({
      mode: "LIVE", // Actively blocks excessive requests
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;
