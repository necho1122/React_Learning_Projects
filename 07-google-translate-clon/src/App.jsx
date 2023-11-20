import { useState } from 'react';
import translateText from './logic/translateText.js';
import translateIcon from '../public/translate-icon.svg';
import switchButton from '../public/switch-horizontal.svg';
import { languages } from './services/languages.js';
import './App.css';

function App() {
	const [translatedText, setTranslatedText] = useState('');

	

	const handleTranslation = async () => {
		const text = document.querySelector('input').value;
		const fromLanguage = document.querySelector('#from').value;
		const toLanguage = document.querySelector('#to').value;

		const translatedText = await translateText(text, fromLanguage, toLanguage);
		setTranslatedText(translatedText);
	};

	const handleSwitch = () => {
		const fromLanguage = document.querySelector('#from').value;
		const toLanguage = document.querySelector('#to').value;

		document.querySelector('#from').value = toLanguage;
		document.querySelector('#to').value = fromLanguage;

		const input = document.querySelector('input').value;
		document.querySelector('input').value = translatedText;

		setTranslatedText(input);

		handleTranslation();
	}

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
			<div className="languages-container">
			<div className="input-languages"></div>
			<div className="language-selector">
				<select name="from" id="from" onChange={handleTranslation}>
					{languages.map((language) => (
						<option value={language.code} key={language.code}>
							{language.name}
						</option>
					))}
				</select>
				<button onClick={handleSwitch}><img src={switchButton} alt="switch button" /></button>
				<select name="to" id="to" onChange={handleTranslation}>
					{languages.map((language) => (
						<option value={language.code} key={language.code} disabled={language.name === 'Auto'}>
							{
								language.name === 'Auto' ? 'English' : language.name
							}
						</option>
					))}
				</select>
				<div className="output-languages"></div>
			</div>
			</div>
			<div className='translate-body'>
				<input
					type='text'
					placeholder='Escribe algo'
					onChange={handleTranslation}
				/>
				<p className='output'>{translatedText}</p>
			</div>
		</div>
	);
}

export default App;
