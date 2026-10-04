/**
 * Real-time Multi-Channel Notification Service
 * Supports: Telegram Bot, Discord Webhooks, and Formspree/Email
 */

interface VisitorNotificationPayload {
  country?: string;
  city?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  referrer?: string;
  durationSeconds?: number;
  sectionsViewed?: string[];
}

interface MessageNotificationPayload {
  name: string;
  email: string;
  message: string;
  country?: string;
  city?: string;
}

// Environment variables for notification channels (can be set in .env)
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || '';

/**
 * Dispatch an alert to Telegram Bot if configured
 */
export async function sendTelegramAlert(text: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return false;
  }
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Telegram alert failed:', err);
    return false;
  }
}

/**
 * Dispatch an alert to Discord Webhook if configured
 */
export async function sendDiscordAlert(title: string, description: string, fields: Array<{ name: string; value: string; inline?: boolean }>): Promise<boolean> {
  if (!DISCORD_WEBHOOK_URL) {
    return false;
  }
  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title,
            description,
            color: 0x38bdf8, // Sky Blue
            fields,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Discord webhook alert failed:', err);
    return false;
  }
}

/**
 * Trigger notification on a new website visit
 */
export async function notifyNewVisitor(data: VisitorNotificationPayload): Promise<void> {
  const location = [data.city, data.country].filter(Boolean).join(', ') || 'Unknown Location';
  const device = `${data.deviceType || 'Desktop'} (${data.os || 'Unknown OS'} / ${data.browser || 'Browser'})`;
  const ref = data.referrer || 'Direct / Resume';

  // 1. Telegram
  const tgMessage = `?? *New Portfolio Visitor!*\n\n` +
    `?? *Location:* ${location}\n` +
    `?? *Device:* ${device}\n` +
    `?? *Referrer:* ${ref}\n` +
    `?? *Time:* ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })} IST`;

  await sendTelegramAlert(tgMessage);

  // 2. Discord
  await sendDiscordAlert('?? New Portfolio Visitor', `A user just landed on your portfolio!`, [
    { name: '?? Location', value: location, inline: true },
    { name: '?? Device & OS', value: device, inline: true },
    { name: '?? Source', value: ref, inline: false },
  ]);
}

/**
 * Trigger notification on form submission
 */
export async function notifyContactSubmission(data: MessageNotificationPayload): Promise<void> {
  const location = [data.city, data.country].filter(Boolean).join(', ') || 'Unknown Location';

  // 1. Telegram
  const tgMessage = `?? *New Contact Message Received!*\n\n` +
    `?? *From:* ${data.name}\n` +
    `?? *Email:* ${data.email}\n` +
    `?? *Location:* ${location}\n` +
    `?? *Message:*\n"${data.message}"\n\n` +
    `?? *Time:* ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })} IST`;

  await sendTelegramAlert(tgMessage);

  // 2. Discord
  await sendDiscordAlert('?? New Contact Message', `A new message was submitted via your portfolio contact form.`, [
    { name: '?? Name', value: data.name, inline: true },
    { name: '?? Email', value: data.email, inline: true },
    { name: '?? Location', value: location, inline: true },
    { name: '?? Message', value: data.message, inline: false },
  ]);
}
