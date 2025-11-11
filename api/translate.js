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
    // 判断输入是中文还是英文
    const isChinese = /[\u4e00-\u9fa5]/.test(text);
    const langpair = isChinese ? "zh-CN|en" : "en|zh-CN";

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`
    );
    const data = await response.json();
    const translation = data.responseData.translatedText;

    return res.status(200).json({ translation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Translation failed" });
  }
}
