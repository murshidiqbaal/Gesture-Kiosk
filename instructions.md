
# 🍔 Gesture-Controlled Kiosk Implementation Guide

This project provides a production-grade UI for a contactless food ordering kiosk.

## 🚀 How to Run Locally

1. Ensure you have Node.js installed.
2. In the project root, run:
   ```bash
   npm install
   npm run dev
   ```
3. Use the following keyboard shortcuts to simulate hand gestures:
   - **`N` or `Right Arrow`**: Trigger **NEXT** (Cycle through items)
   - **`S` or `Enter`**: Trigger **SELECT** (Confirm / Add to cart)
   - **`B` or `Escape`**: Trigger **STOP** (Go back / Cancel)

## 🔌 Connecting Python Gesture Backend

To integrate with a real-time computer vision backend (e.g., MediaPipe + Python), follow these steps:

1. **Python Side**: Create a WebSocket server (using `fastapi` or `websockets` library).
2. **Detection**: Run your gesture recognition loop. When a gesture is detected, broadcast a JSON message:
   ```json
   { "gesture": "SELECT" }
   ```
3. **React Side**: Uncomment the WebSocket logic in `hooks/useGesture.ts`:
   ```typescript
   const ws = new WebSocket('ws://localhost:8000/gestures');
   ws.onmessage = (event) => {
     const data = JSON.parse(event.data);
     handleGesture(data.gesture);
   };
   ```

## 🛠 Suggested Future Improvements

1. **Payment Integration**: Add a screen for "Scan QR to Pay" using Stripe or local UPI/Digital Wallets.
2. **Accessibility+**: Add Text-to-Speech (TTS) using the `Web Speech API` to announce the selected items.
3. **Dynamic Menu**: Connect to a Headless CMS (like Strapi) to allow restaurant managers to update prices and items.
4. **Admin Dashboard**: Create a hidden "Staff View" to track incoming orders in real-time.
5. **Multi-Language**: Add a language toggle (English/Spanish/Hindi, etc.) navigable via gestures.

---
*Created for AI Project Demo Excellence.*
