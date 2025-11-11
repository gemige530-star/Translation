// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { messages } = req.body || {};
  if (!messages) {
    res.status(400).json({ error: 'Missing messages' });
    return;
  }

  try {
    // 这里示范调用 OpenAI 的 Chat Completions API（用你在 Vercel 设置的环境变量）
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages,
      }),
    });

    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upstream error' });
  }
}
