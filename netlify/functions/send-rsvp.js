exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return { statusCode: 500, body: 'Telegram env vars are not configured' };
  const data = JSON.parse(event.body || '{}');
  const text = `💌 RSVP на свадьбу Романа и Анны\n\nИмя: ${data.name || '-'}\nПрисутствие: ${data.attendance || '-'}\nГость: ${data.guest || '-'}\nАлкоголь: ${(data.alcohol || []).join(', ') || '-'}\nКомментарий: ${data.comment || '-'}`;
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
  });
  return { statusCode: response.ok ? 200 : 500, body: response.ok ? 'ok' : 'Telegram error' };
};
