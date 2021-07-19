import React, { Fragment } from 'react';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';


const Ketle = ({ sex, koef }) => {
    return (
        <Fragment>
            <CardGrid>

                <Card size='l'>
                    <Div className='KetleCard'>
                        <h3 className='KetleHeader'>Индекс Кетле Вашего тела:</h3>
                    </Div>
                    <h3 className='KetleHeader'><u>{koef}</u></h3>
                </Card>

                <Card size='l'>
                    <Div className='KetleCard'>
                        <h3 className='KetleHeader'>Рекомендуемый диапазон:</h3>
                    </Div>
                    <h3 className='KetleHeader'><u>{(sex === 'f') ? '19' : '20'} – {(sex === 'f') ? '24' : '25'}</u></h3>
                </Card>

                <Card size='l'>
                    <h3 className='SubHeader'>Что такое индекс Кетле?</h3>
                    <Div>
                        Индекс Кетле (он же индекс массы тела) - величина, позволяющая оценить соотношение массы тела к его росту. Индекс 
                        Кетле используется в качестве основного инструмента для определения состояние массы тела, которая может быть 
                        нормально, избыточной или недостаточной.
                    </Div>
                </Card>

                <Card size='l'>
                    <h3 className='SubHeader'>Почему необходимо знать свой индекс?</h3>
                    <Div>
                        Мышцы тяжелее жира , поэтому даже при одинаковом весе два человека могут иметь совершенно разное качество 
                        тело. Чем меньше процент жира в организме и больше процент мышц, тем рельефнее тело. Спортивное тело - это не 
                        килограммы на весах, а отражение в зеркале.
                    </Div>
                </Card>

                <Card size='l'>
                    <h3 className='SubHeader'>Дополнительная информация</h3>
                    <Div>
                        Этот способ не подходит для спортсменов с гипертрофированной мускулатурой и для беременных, но для 
                        большинства людей Индекс Кетле довольно точно отражает наличие или отсутствие избыточной жировой массы.
                    </Div>
                </Card>

            </CardGrid>
        </Fragment>
    );
};

export default Ketle;