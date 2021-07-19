import React, { useState, Fragment } from 'react';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import PromoBanner from '@vkontakte/vkui/dist/components/PromoBanner/PromoBanner';
import bridge from '@vkontakte/vk-bridge';
import Icon24Error from '@vkontakte/icons/dist/24/error';

import { platform, IOS, ANDROID } from '@vkontakte/vkui';

const osName = platform();


const Inputs = ({ goToPage, throttle, setStorage, snackbarError, sex, setSex, age, setAge, weight, setWeight, height, setHeight, setResultText, setKoef }) => {

	const [snackbar, setSnackbar] = useState(snackbarError);

	const [ads, setAds] = useState(null);
	const [isAdsClosed, setIsAdsClosed] = useState(false);

	const onTypeError = (text) => {
		setSnackbar(<Snackbar
			layout='vertical'
			onClose={() => setSnackbar(null)}
			before={<Avatar size={24} style={{backgroundColor: 'var(--accent)'}}><Icon24Error fill='#fff' width={14} height={14} /></Avatar>}
			duration={1500}
		>
			{text}
		</Snackbar>);
	}

    const onWeightChange = throttle(() => {
		const userWeight = document.getElementById("weight").value;
		if (weight === userWeight) return;
		if (isNaN(userWeight)) {
			onTypeError('Пожалуйста, введите число.');
		} else {
			setWeight(Number(userWeight));
        	setStorage({weight: userWeight});
		}
    }, 200)

    const onHeightChange = throttle(() => {
		const userHeight = document.getElementById("height").value;
		if (height === userHeight) return;
		if (isNaN(userHeight)) {
			onTypeError('Пожалуйста, введите число.');
		} else {
			setHeight(Number(userHeight));
        	setStorage({height: userHeight});
		}
    }, 200)

    const onSexChange = throttle(() => {
		const userSex = document.getElementById("sex").value;
		if (sex === userSex) return;
		setSex(userSex);
        setStorage({sex: userSex});
    }, 200)

    const onAgeChange = throttle(() => {
		const userAge = document.getElementById("age").value;
		if (age === userAge) return;
		if (isNaN(userAge)) {
			onTypeError('Пожалуйста, введите число.');
		} else {
			console.log(age)
			setAge(Number(userAge));
			console.log(age)
        	setStorage({age: userAge});
		}
	}, 200)
	
	const processText = (koef) => {
		if (koef <= 18.5) {
			setResultText('дифицит массы тела');
		} else if (koef > 18.5 && koef <= 25) {
			setResultText('нормальная масса тела');
		} else if (koef > 25 && koef <= 30) {
			setResultText('избыточная масса тела (предожирение)');
		} else if (koef > 30 && koef <= 35) {
			setResultText('ожирение I степени');
		} else if (koef > 35 && koef < 40) {
			setResultText('ожирение II степени');
		} else if (koef > 40) {
			setResultText('ожирение III степени');
		}
	}

    const onCountClick = () => {
		if (sex === 'n') {
			onTypeError('Пожалуйста, выберете пол.');
		} else {
			if (Number(weight <= 30) || Number(height <= 130) || Number(age <= 10) || Number(weight >= 300) || Number(height >= 230) || Number(age >= 100)) {
				onTypeError('К сожалению, мы не можем посчитать норму для вас. Пожалуйста, введите корректные данные.');
				return;
			}
			const koef = (weight / (Math.pow(height/100, 2))).toFixed(1);
			setKoef(koef);
			processText(koef);
			setStorage();
			goToPage('result');
		}
	}
	
	const getAds = async () => {
		const adv = await bridge.send("VKWebAppGetAds", {});
		setAds(adv);
	}

	if (!ads && !isAdsClosed && (osName === IOS || osName === ANDROID)) {
		getAds();
	}

	const onPromoClose = () => {
		setAds(null);
		setIsAdsClosed(true);
	}

	return (
		<Fragment>
			<FormLayout>
					<Select
						id="sex"
						value={sex}
						top={
							<Header>
								<span role='img' aria-label='Tick'>✔️</span> Ваш пол
							</Header>
                        }
						onChange={() => onSexChange()}
					>
                        <option value="n">Выберете пол</option>
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>
					<Input
						id="age"
						maxLength={3}
						value={age}
						top={
                        <Header indicator={<Counter size='m' mode='primary'>лет</Counter>}>
								<span role='img' aria-label='Romb'>🔹</span> Ваш возраст
							</Header>
						}
						onChange={() => onAgeChange()}
					/>
                    <Input
						id="weight"
						maxLength={3}
						value={weight}
						top={
                        <Header indicator={<Counter size='m' mode='primary'>кг</Counter>}>
								<span role='img' aria-label='Romb'>🔸</span> Ваш вес
							</Header>
						}
						onChange={() => onWeightChange()}
					/>
                    <Input
						id="height"
						maxLength={3}
						value={height}
						top={
							<Header indicator={<Counter size='m' mode='primary'>см</Counter>}>
								<span role='img' aria-label='Tree'>🌳</span> Ваш рост
							</Header>
						}
						onChange={() => onHeightChange()}
					/>
			</FormLayout>

            <Div className='BtnContainer'>
                <Button mode='commerce' size='xl' onClick={() => onCountClick()}>Рассчитать</Button>
            </Div>

			{ ads && <PromoBanner bannerData={ ads } onClose={() => onPromoClose()} /> }
			{snackbar}
		</Fragment>
	);
};

export default Inputs;