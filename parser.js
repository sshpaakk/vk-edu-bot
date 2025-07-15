const axios = require('axios');
const cheerio = require('cheerio');

async function getProjectInfo() {
  try {
    const { data } = await axios.get("https://education.vk.company/education_projects");
    const $ = cheerio.load(data);
    const result = [];

    $('h2, p').each((_, elem) => {
      result.push($(elem).text().trim());
    });

    return result.slice(0, 5).join('\n');
  } catch (error) {
    return "Не удалось получить данные с сайта.";
  }
}

module.exports = { getProjectInfo };
