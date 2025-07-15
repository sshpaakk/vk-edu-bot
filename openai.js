// openai.js
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askGPT(question) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // можно заменить на "gpt-4", если есть доступ
      messages: [
        {
          role: "system",
          content: "Ты помощник VK Education Projects. Отвечай понятно и кратко на вопросы студентов и ВСЮ ИНФОРМАЦИЮ ДЛЯ ОТВЕТА БЕРИ СТРОГО С САЙТА https://education.vk.company/education_projects."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Ошибка OpenAI:", error);
    return "⚠️ Не удалось получить ответ от ChatGPT.";
  }
}
