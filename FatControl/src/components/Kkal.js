import React, { Fragment, useState } from 'react';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import Button from '@vkontakte/vkui/dist/components/Button/Button';


const Kkal = ({ goToPage, throttle, setStorage, weight, height, age, sex, option, setOption }) => {

    const bmrCount = () => {
        if (sex === 'f') {
            return Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age));
        } else if (sex === 'm') {
            return Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age));
        } 
    }

    const kkalCount = () => {
        if (option === 'maintenance') {
            return bmrCount();
        } else if (option === 'losing') {
            return Math.round(bmrCount() * 0.85);
        } else if (option === 'gain') {
            return Math.round(bmrCount() * 1.15);
        }
    }

    const proteinCount = () => {
        if (option === 'maintenance') {
            return Math.round((bmrCount() * 0.3) / 4);
        } else if (option === 'losing') {
            return Math.round((bmrCount() * 0.3) / 4);
        } else if (option === 'gain') {
            return Math.round((bmrCount() * 0.3) / 4);
        }
    }

    const fatsCount = () => {
        if (option === 'maintenance') {
            return Math.round((bmrCount() * 0.2) / 9);
        } else if (option === 'losing') {
            return Math.round((bmrCount() * 0.3) / 9);
        } else if (option === 'gain') {
            return Math.round((bmrCount() * 0.15) / 9);
        }
    }

    const carbohydratesCount = () => {
        if (option === 'maintenance') {
            return Math.round((bmrCount() * 0.5) / 9);
        } else if (option === 'losing') {
            return Math.round((bmrCount() * 0.4) / 9);
        } else if (option === 'gain') {
            return Math.round((bmrCount() * 0.55) / 9);
        }
    }

    const onOptionChange = throttle(() => {
        const userOption = document.getElementById("option").value;
		if (option === userOption) return;
        setOption(userOption);
        setStorage({option: userOption});
    }, 200);

    return (
        <Fragment>

            <CardGrid>

                <Card size='l'>
                    <Header>
				        <span role='img' aria-label='Tick'>✔️</span> Выберете Вашу цель
			        </Header>
                    <Select
                        className='OptSel'
				        id="option"
				        value={option}
				        onChange={() => onOptionChange()}
			        >
                        <option value="maintenance">Поддержание веса</option>
                        <option value="losing">Похудение</option>
                        <option value="gain">Набор массы</option>
                    </Select>
                </Card>

                <Card size='l'>
                    <Div className='KkalCard'>
                        <h3 className='KkalHeader'>Суточная норма калорий для Вас составляет:</h3>
                    </Div>
                    <h3 className='KkalHeader'><u>{kkalCount()}</u></h3>
                    <Button mode="tertiary" className='MoreQ' onClick={() => goToPage('aboutKal')}>?</Button>
                </Card>

                <Card size='l'>
                    <Div className='KkalCard'>
                        <h3 className='KkalHeader'>Суточная норма белков для Вас составляет:</h3>
                    </Div>
                    <h3 className='KkalHeader'><u>{proteinCount()}</u></h3>
                    <Button mode="tertiary" className='MoreQ' onClick={() => goToPage('protein')}>?</Button>
                </Card>

                <Card size='l'>
                    <Div className='KkalCard'>
                        <h3 className='KkalHeader'>Суточная норма жиров для Вас составляет:</h3>
                    </Div>
                    <h3 className='KkalHeader'><u>{fatsCount()}</u></h3>
                    <Button mode="tertiary" className='MoreQ' onClick={() => goToPage('fats')}>?</Button>
                </Card>

                <Card size='l'>
                    <Div className='KkalCard'>
                        <h3 className='KkalHeader'>Суточная норма углеводов для Вас составляет:</h3>
                    </Div>
                    <h3 className='KkalHeader'><u>{carbohydratesCount()}</u></h3>
                    <Button mode="tertiary" className='MoreQ' onClick={() => goToPage('carbohydrates')}>?</Button>
                </Card>

            </CardGrid>
        </Fragment>
    );
};

export default Kkal;