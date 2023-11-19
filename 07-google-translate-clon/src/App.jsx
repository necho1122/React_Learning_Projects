import { useState } from 'react';
import translateText from './logic/translateText.js';
import translateIcon from '../public/translate-icon.svg';
import './App.css';

function App() {
	const [translatedText, setTranslatedText] = useState('');

	const handleTranslation = async () => {
		const text = document.querySelector('input').value;
		const fromLanguage = 'auto';
		const toLanguage = 'en';

		const translatedText = await translateText(text, fromLanguage, toLanguage);
		setTranslatedText(translatedText);
	};

	return (
		<div className='container'>
			<div className='options-bar'>
				<ul>
					<li>
						<img src={translateIcon} alt="translate icon" />
						<span>
            Texto
            </span>
					</li>
					<li>
          <i className="fa-solid fa-image"></i>
            <span>
            Images
            </span>
          </li>
					<li>
          <i className="fa-solid fa-file"></i>
            <span>
            Documentos
            </span>
          </li>
					<li>
          <i className="fa-solid fa-globe"></i>
            <span>
            Sites
            </span>
          </li>
				</ul>
			</div>
			<div className='translate-body'>
				<input
					type='text'
					placeholder='escribe algo'
					onChange={handleTranslation}
				/>
				<p className='output'>{translatedText}</p>
			</div>
		</div>
	);
}

export default App;
