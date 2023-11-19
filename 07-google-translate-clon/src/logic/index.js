/* eslint-disable no-undef */
import axios from 'axios';

const encodedParams = new URLSearchParams();
encodedParams.set('from', 'auto');
encodedParams.set('to', 'en');
encodedParams.set('text', 'xin chào');

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
	console.log(response.data);
    const output = document.getElementById('out-put');
    output.innerHTML = response.data.trans;
} catch (error) {
	console.error(error);
}

