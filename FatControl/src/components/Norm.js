import React, { Fragment } from 'react';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';


const Norm = ({ sex, height, resultText }) => {

    const minNormCount = () => {
        if (sex === 'f') {
            return (19 * Math.pow(height/100, 2)).toFixed(1);
        } else if (sex === 'm') {
            return (20 * Math.pow(height/100, 2)).toFixed(1);
        }
    }

    const maxNormCount = () => {
        if (sex === 'f') {
            return (24 * Math.pow(height/100, 2)).toFixed(1);
        } else if (sex === 'm') {
            return (25 * Math.pow(height/100, 2)).toFixed(1);
        }
    }

    return (
        <Fragment>
            <CardGrid>

                <Card size='l'>
                    <Div className='KkalCard'>
                        <h3 className='KkalHeader'>Оптимальный диапазон веса:</h3>
                    </Div>
                    <h3 className='KkalHeader'><u>{minNormCount()} – {maxNormCount()}</u></h3>
                </Card>

                <Card size='l'>
                    <Div className='KkalCard'>
                        <h3 className='KkalHeader'>Результат:</h3>
                    </Div>
                    <h3 className='KkalHeader'>У Вас {resultText}</h3>
                </Card>

                <Card size='l'>
                    <h3 className='SubHeader'>Почему такой диапазон?</h3>
                    <Div>
                         По мнению Всемирной Организации Здравоохранения это нормальное соотношение веса и роста. В таком диапазоне 
                         ваш организм будет чувствовать себя комфортно, а вероятность возникновения каких-либо заболеваний приблизится 
                         к нулю. Важно помнить, что ориентироваться в первую очередь нужно на свои ощущения и отражение в зеркале. 
                         Главное - не выходить за рамки предложенного диапозона и питаться по своему плану КБЖУ, иначе самочувствие 
                         может ухудшиться.  
                    </Div>
                </Card>

            </CardGrid>
        </Fragment>
    );
};

export default Norm;