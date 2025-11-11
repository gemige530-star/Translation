// api/translate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    // 使用免费的 MyMemory 翻译 API（无需 Key）
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|zh-CN`
    );
    const data = await response.json();
    const translation = data.responseData.translatedText;

    return res.status(200).json({ translation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Translation failed" });
  }
}
