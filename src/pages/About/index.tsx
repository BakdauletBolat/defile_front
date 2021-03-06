import { Row, Col } from "antd";
import { useState } from "react";
import SizedBox from "../../components/sized-box";
import Main from "../../layouts/main";
import MapComponent from './map';

const contents = [
    {
        title: 'О компаний',
        description: `
        «Дефиле» — это салоны №1 женской одежды в городе Шымкент. Самые модные брендовые коллекции, вы найдете у нас! Одевайтесь в лучшее вместе с «Дефиле»! Миссия нашей компании – одеть граждан Казахстана в лучшую одежду: предоставить им последние модные тенденции в совокупности с высочайшим качеством продукции по разумным ценам, создавая неповторимый стиль и формируя эстетический вкус у каждого, с помощью команды профессионалов. Мы – лучшая компания в сфере продажи модной и качественной одежды, создающая индивидуальный стиль и формирующая эстетический вкус, для каждого человека с помощью профессиональной команды.
        `
    },
    {
        title: 'История',
        description: `
        История создания «Дефиле»
Сейчас торговая марка «Дефиле» — это одна из самых успешных и узнаваемых торговых марок г. Шымкента. Супер-популярные магазины модной одежды с удобным месторасположением приглашают жителей совершить приносящий удовольствие шопинг.

А много лет назад…

Все начиналось в далеком 1996-м году с открытия торговой палатки на рынке «Караван» г. Шымкента. В то время наше население не имело возможности приобретать качественную и стильную одежду по доступной цене. Рынок был заполнен моделями сомнительного качества и еще более сомнительного внешнего вида, а за тем, что хоть как-то напоминало страницы журналов мод приходилось специально ехать в г. Алматы. Тогда и появилась идея — одеть наших женщин в лучшую одежду, сделать так, чтобы они смогли получить высокое качество в совокупности с эстетическим удовольствием, создать свой неповторимый образ здесь и сейчас, не выезжая за пределы родного города и не затрачивая много времени и сил». Впоследствии эта бизнес идея станет девизом компании и отразится в ее слогане: «Одевайся в лучшее!»

Шло время. Изучался рынок, потребности и вкус населения в области брендовой одежды. Налаживались контакты с производителями. За нами закреплялась репутация новаторов. Мы стали одними из первых, кто начал в Шымкенте предлагать клиентам брендовую одежду. Продолжительное сотрудничество с маркой «BGN» (с 2000 по 2005 гг.) принесло положительный результат. Под этой маркой мы работали в торговом доме «Шымкент». Жители нашего города были готовы увидеть и приобрести одежду брендовых марок.

2001-й год стал годом основания компании «Дефиле». 18-го октября 2001-го года открылся первый магазин под названием «Дефиле» по адресу: пр. Республики, 2.

6-го декабря 2005г. состоялось открытие магазина «Дефиле Люкс» по адресу: ул. Гани Иляева, 4. Установление самых высоких стандартов обслуживания посетителей, огромный выбор моделей модной мужской и женской одежды  отменного качества – все это сыграло свою роль, и магазин стал бешено популярен.


 Компания «Дефиле» дорожит закрепившейся за долгие годы работы репутацией экспертов в области продажи модной одежды.

12-го ноября 2011 года в самом центре бульвара Кунаева состоялась торжественная презентация магазина «Дефиле». Двухэтажный магазин, площадью в 1 000 кв. метров, стал достойным украшением города! В магазине представлены женская и мужская коллекции одежды, как эксклюзивные дорогие бренды, так и более демократичные по ценовой политике.

С сентября 2011 года лицом Компании является абсолютная чемпионка по художественной гимнастике Алия Юсупова.

На сегодняшний день «Дефиле» — это не просто торговая марка, мы – команда специалистов, которая шагает в ногу с модой, держит руку на пульсе желаний наших клиентов и уверенно смотрит в будущее.
        `
    },
    {
        title: 'От директора',
        description: `
        Обращение руководителя
Уважаемые господа!

Спасибо за Ваш интерес, проявленный к деятельности нашей Компании.
Компания заинтересована в эффективном развитии бизнеса и стремится предложить своим клиентам всё самое лучшее из мира моды и красоты!

Опираясь на многолетний опыт работы, мы с уверенностью можем сказать, что являемся лучшими знатоками модных предпочтений наших горожан, имеем самый широкий ассортимент женской одежды, предоставляем Вам лучший сервис и удовольствие от шопинга!

Главной идеей Компании является желание предоставить  Вам возможность воплощать свои самые сокровенные мечты и выглядеть сногсшибательно, не выезжая за пределы страны.
Мы вносим в жизнь города модные веяния, разнообразия и роскошь!

Учитывая интересы и возможности всех слоев населения города, мы предоставляем огромный выбор сегментируя магазины —  от  дорогих с эксклюзивными брендами для клиентов бизнес — класса, до недорогих с доступными ценами для клиентов эконом — класса.

Самый главный принцип — это качество товара, в независимости от ценовой политики, в чем Вы можете убедиться, придя в наши магазины!

Приглашаем Вас посетить наши магазины — мы сделаем всё, чтоб вы остались довольны. Мы постараемся угодить вашему вкусу, сделать вас самой модной и уверенной в себе!
Одевайтесь в лучшее вместе с «Дефиле»!

 

С уважением,
Генеральный директор
торговой компании «Дефиле»
Нурманова Патима Октамовна
        `
    }
]

function About() {

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const activeItem = contents[activeIndex];
    return (
        <Main>
            <SizedBox height={38}></SizedBox>
            <div className="container">
                <Row gutter={[40, 40]} align="top">
                    <Col  xs={24} sm={7}  className='about-us__sidebar-container'>
                        <div className="about-us__sidebar">
                            {contents.map((content, index) => (
                                <div onClick={() => setActiveIndex(index)} className={content.title == activeItem.title ? 'about-us__button about-us__button--active' : 'about-us__button'}>{content.title}</div>
                            ))}
                            <div></div>
                        </div>
                    </Col>
                    <Col  xs={24} sm={{
                        span: 17
                    }}  >
                        <div className="about-us__content">
                            <div className="about-us__content-title">{activeItem.title}</div>
                            <div className="about-us__content-desc">{activeItem.description}</div>
                        </div>
                    </Col>
                </Row>
                <SizedBox height={40}></SizedBox>
                <MapComponent></MapComponent>
            </div>
        </Main>

    );
}

export default About;