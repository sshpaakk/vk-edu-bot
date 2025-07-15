// index.js
import { VK } from 'vk-io';
import 'dotenv/config';
import { askGPT } from './openai.js';

const vk = new VK({
  token: process.env.VK_TOKEN,
});

vk.updates.on('message_new', async (context) => {
  const userText = context.text;

  if (!userText || userText.length < 2) {
    await context.send("Напиши свой вопрос, и я постараюсь помочь!");
    return;
  }

  try {
    const gptReply = await askGPT(userText);
    await context.send(gptReply);
  } catch (err) {
    console.error("❌ Ошибка в VK-боте:", err);
    await context.send("Что-то пошло не так. Попробуйте позже.");
  }
});

vk.updates.start().then(() => {
  console.log("🤖 Бот запущен и ждёт сообщения!");
});
