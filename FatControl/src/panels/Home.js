import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import View from '@vkontakte/vkui/dist/components/View/View';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import bridge from '@vkontakte/vk-bridge';

import Result from '../components/Result';
import Inputs from '../components/Inputs';
import Ketle from '../components/Ketle';
import Norm from '../components/Norm';
import Kkal from '../components/Kkal';
import Protein from '../components/Protein';
import Carbohydrates from '../components/Сarbohydrates';
import Fats from '../components/Fats';
import AboutKal from '../components/AboutKal';

import './Home.css';

const DEFAULT_SEX = "n";
const DEFAULT_AGE = 18;
const DEFAULT_WEIGHT = 60;
const DEFAULT_HEIGHT = 170;
const DEFAULT_OPTION = 'maintenance';

const Home = ({ id, snackbarError, fetchedState}) => {

	const [sex, setSex] = useState(fetchedState.hasOwnProperty('sex') ? fetchedState.sex : DEFAULT_SEX);
	const [age, setAge] = useState(fetchedState.hasOwnProperty('age') ? fetchedState.age : DEFAULT_AGE);
	const [weight, setWeight] = useState(fetchedState.hasOwnProperty('weight') ? fetchedState.weight : DEFAULT_WEIGHT);
	const [height, setHeight] = useState(fetchedState.hasOwnProperty('height') ? fetchedState.height : DEFAULT_HEIGHT);
	const [resultText, setResultText] = useState('error');
	const [koef, setKoef] = useState(0);
	const [option, setOption] = useState(fetchedState.hasOwnProperty('option') ? fetchedState.option : DEFAULT_OPTION);

	const [activePanel, setActivePanel] = useState(id);
	const [history, setHistory] = useState([id]) // Заносим начальную панель в массив историй.

	bridge.subscribe(({ detail: { type, data }}) => {
		if (type === 'VKWebAppUpdateConfig') {
			const schemeAttribute = document.createAttribute('scheme');
			schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
			document.body.attributes.setNamedItem(schemeAttribute);
		}
	});

	useEffect(() => {
		window.addEventListener('popstate', () => goBack());
	})

	function throttle(callback, delay) {
		let isThrottled = false, args, context;
	
		function wrapper() {
			if (isThrottled) {
				args = arguments;
				context = this;
				return;
			}
	
			isThrottled = true;
			callback.apply(this, arguments);
			
			setTimeout(() => {
				isThrottled = false;
				if (args) {
					wrapper.apply(context, args);
					args = context = null;
				}
			}, delay);
		}
		return wrapper;
	}

	const goBack = () => {
		if( history.length === 1 ) {  // Если в массиве одно значение:
		  bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
		} else if( history.length > 1 ) { // Если в массиве больше одного значения:
			// setHistory(history.pop()); // удаляем последний элемент в массиве.
		  history.pop() // удаляем последний элемент в массиве.
		  setActivePanel( history[history.length - 1] ) // Изменяем массив с иторией и меняем активную панель.
		}
	}

	function goToPage( name ) { // В качестве аргумента принимаем id панели для перехода
		window.history.pushState( {panel: name}, name ); // Создаём новую запись в истории браузера
		setActivePanel( name ); // Меняем активную панель
		// setHistory(history.push( name )); // Добавляем панель в историю
		history.push( name ); // Добавляем панель в историю
	};

	const setStorage = async function(properties) {
		await bridge.send('VKWebAppStorageSet', {
			key: 'state',
			value: JSON.stringify({
				sex,
				age,
				weight,
				height,
				...properties
			})
		});
	}

	return (
		<View 
		activePanel={activePanel}
		history={history}
		onSwipeBack={goBack}
		>

			<Panel id={id}>
				<PanelHeader>Введите данные</PanelHeader>
				{fetchedState && <Inputs goToPage={goToPage} throttle={throttle} setStorage={setStorage} snackbarError={snackbarError} sex={sex} setSex={setSex} age={age} setAge={setAge} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} setResultText={setResultText} setKoef={setKoef} />}
			</Panel>

			<Panel id='result'>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => goBack()}>
							<Icon24BrowserBack/>
						</PanelHeaderButton>
				}
				>Результат</PanelHeader>
				<Result goBack={goBack} goToPage={goToPage} sex={sex} height={height} koef={koef} weight={weight} age={age} />
			</Panel>

			<Panel id='ketle'>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => goBack()}>
							<Icon24BrowserBack/>
						</PanelHeaderButton>
				}
				>Индекс Кетле</PanelHeader>
				<Ketle sex={sex} koef={koef}></Ketle>
			</Panel>

			<Panel id='norm'>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => goBack()}>
							<Icon24BrowserBack/>
						</PanelHeaderButton>
				}
				>Норма веса</PanelHeader>
				<Norm sex={sex} height={height} resultText={resultText} ></Norm>
			</Panel>

			<Panel id='kkal'>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => goBack()}>
							<Icon24BrowserBack/>
						</PanelHeaderButton>
				}
				>КБЖУ</PanelHeader>
				<Kkal goToPage={goToPage} throttle={throttle} setStorage={setStorage} weight={weight} height={height} age={age} sex={sex} option={option} setOption={setOption} ></Kkal>
			</Panel>

			<Panel id='protein'>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => goBack()}>
							<Icon24BrowserBack/>
						</PanelHeaderButton>
				}
				>Белки</PanelHeader>
				<Protein></Protein>
			</Panel>

			<Panel id='carbohydrates'>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => goBack()}>
							<Icon24BrowserBack/>
						</PanelHeaderButton>
				}
				>Углеводы</PanelHeader>
				<Carbohydrates></Carbohydrates>
			</Panel>

			<Panel id='fats'>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => goBack()}>
							<Icon24BrowserBack/>
						</PanelHeaderButton>
				}
				>Жиры</PanelHeader>
				<Fats></Fats>
			</Panel>

			<Panel id='aboutKal'>
				<PanelHeader
					left={
						<PanelHeaderButton onClick={() => goBack()}>
							<Icon24BrowserBack/>
						</PanelHeaderButton>
				}
				>Калории</PanelHeader>
				<AboutKal></AboutKal>
			</Panel>

		</View>
	);
};

export default Home;