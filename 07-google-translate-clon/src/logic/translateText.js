import axios from 'axios';

const translateText = async (text, fromLanguage, toLanguage) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('text', text);
  encodedParams.set('from', fromLanguage);
  encodedParams.set('to', toLanguage);

  const options = {
  method: 'POST',
  url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '6b061e1c64msh03b455228369c03p1867bejsndba2a16330d9',
    'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
  },
  data: encodedParams,
};

  try {
    const response = await axios.request(options);
    return response.data.trans;
  } catch (error) {
    console.error(error);
  }
};

export default translateText;
