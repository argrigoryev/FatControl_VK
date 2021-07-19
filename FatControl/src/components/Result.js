import React, { Fragment } from 'react';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import weightImg from '../img/weight.jpg';
import ketleImg from '../img/ketle.jpg';
import kkalImg from '../img/kkal.jpg';


const NORMAL_MAN_KOEF = 22;
const NORMAL_WOMAN_KOEF = 21;

const Result = ({ goToPage, sex, height, koef, weight, age }) => {

    const normCount = () => {
        if (sex === 'f') {
            return Math.round(NORMAL_WOMAN_KOEF * Math.pow(height/100, 2))
        } else if (sex === 'm') {
            return Math.round(NORMAL_MAN_KOEF * Math.pow(height/100, 2))
        }
    }

    const bmrCount = () => {
        if (sex === 'f') {
            return Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age));
        } else if (sex === 'm') {
            return Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age));
        }
    }

	return (
        <Fragment>

            <CardGrid>

                <Card size='l' mode="shadow">
                    <Div className='ResultCard'>
                        <img src={weightImg} alt='Weight Img' className='CardImg' />
                        <h3 className='CardText'>Норма веса для вашего тела</h3>
                        <Div className='CardBtnContainer'>
                            <Div className='CardInfo'><span>{normCount()}</span></Div>
                            <Button size='l' className='CardBtn' onClick={() => goToPage('norm')}>Подробнее</Button>
                        </Div>
                    </Div>
                </Card>

                <Card size='l' mode="shadow">
                    <Div className='ResultCard'>
                        <img src={kkalImg} alt='Kkal Img' className='CardImg' />
                        <h3 className='CardText'>Суточная норма калорий</h3>
                        <Div className='CardBtnContainer'>
                            <Div className='CardInfo'><span>{bmrCount()}</span></Div>
                            <Button size='l' className='CardBtn' onClick={() => goToPage('kkal')}>Подробнее</Button>
                        </Div>
                    </Div>
                </Card>

                <Card size='l' mode="shadow">
                    <Div className='ResultCard'>
                        <img src={ketleImg} alt='Ketle Img' className='CardImg' />
                        <h3 className='CardText'>Индекс Кетле для вашего тела</h3>
                        <Div className='CardBtnContainer'>
                            <Div className='CardInfo'><span>{Math.round(koef)}</span></Div>
                            <Button size='l' className='CardBtn' onClick={() => goToPage('ketle')}>Подробнее</Button>
                        </Div>
                    </Div>
                </Card>

            </CardGrid>

        </Fragment>
	);
};

export default Result;