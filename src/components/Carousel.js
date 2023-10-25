import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";


const Carousel = () => {

    const [news, setNews] = useState([]);


    useEffect(() => {

        const ENDPOINT = 'https://servicodados.ibge.gov.br/api/v3';
        const URL = `${ENDPOINT}/noticias/?qtd=10`;
        fetch(URL)
            .then((response) => response.json())
            .then((newNews) => {
                if (Array.isArray(newNews.items)) {
                    setNews((prevNews) => [...prevNews, ...newNews.items])
                } else {
                    console.error('newNews.articles não é um array!');
                }
            });
    }, [])

    const settings = {

        centerMode: false,
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,

        appendDots: (dots) => (
            <div
                style={{
                    bottom: '10px',
                    borderRadius: '10px',
                    padding: '10px',
                }}
            >
                <ul className='[&>li]:mx-[2px]' style={{ margin: '0px' }}>
                    {dots}
                </ul>
            </div>
        ),
        customPaging: (i) => <div className='bgcolor w-3 h-3 mx-0 bg-[#ffffff80] rounded-full '></div>,
    };
    return (
        <div className="p-4">

            <Slider {...settings}>
                {news.map((item) => (
                    <div key={item.id} className="p-2">
                        <div className='text-white px-3 pl-[28px] sm:pl-[36px] md:pl-[48px] lg:pl-[60px] w-screen h-96 rounded-2xl'>
                         
                            <div className='absolute bottom-[80px] text-white px-3 pl-[28px] sm:pl-[36px] md:pl-[48px] lg:pl-[60px] w-screen'>
                                <h2 className='font-bold text-xl sm:text-3xl md:text-3xl lg:text-6xl xl:text-6xl me-60'>{item.titulo}</h2>
                                <p className='sm:text-left sm:pr-4 sm:mb-6 text-ellipsis overflow-hidden md:text-lg'>{item.editorias}</p>
                                <p className="shadow-black drop-shadow-2xl font-semibold me-32 sm:text-left sm:pr-4 sm:mb-6 overflow-hidden md:text-lg">{item.introducao}</p>
                                <Link href={item.link} target="_blanck">
                                    <button className="bg-gray-800 hover:bg-slate-500 font-extrabold p-3 rounded-3xl text-white">Veja mais</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );

}
export default Carousel
