import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Row } from 'react-bootstrap'
import Link from 'next/link'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { IoSearch } from 'react-icons/Io5'



const ListaDeputados = () => {

    const [deputados, setDeputados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchChange = (newSearch) => {
        setSearch(newSearch);
        setDeputados([]); // Reseta deputados
        setCurrentPage(1); // Começa da primeira pagina
    };

    const searchLowerCase = search.toLowerCase(); //Buscar letras caixa alto e baixa
    const deputs = deputados
        .filter((item) => item.nome.toLowerCase().includes(searchLowerCase))


    useEffect(() => {

        if (!isLoading) {

            const ENDPOINT = 'https://dadosabertos.camara.leg.br/api/v2/deputados';
            const URL = `${ENDPOINT}?pagina=${currentPage}&itens=10&ordem=ASC&ordenarPor=nome`;

            setIsLoading(true)

            fetch(URL)
                .then((response) => response.json())
                .then((newDeputados) => {
                    setDeputados((prevDeputados) => [...prevDeputados, ...newDeputados.dados]);
                    setIsLoading(false);
                });
        }
    }, [currentPage]);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (!isLoading && entries.some((entry) => entry.isIntersecting)) {
                console.log('Elemento esta visivel')
                setCurrentPage((currentPageInsideState) => currentPageInsideState + 1)
            }
        });

        intersectionObserver.observe(document.querySelector('#sentinela'));

        return () => intersectionObserver.disconnect();
    }, [isLoading]);

    return (
        <>

            <Header />

            <div className='container sticky top-0 pt-[13px] z-10 flex items-center justify-center'>
                <IoSearch className="absolute text-slate-400 me-96 h-8 w-6 ms-1" />
                <input
                    className="rounded-3xl shadow-md shadow-black w-[15rem] md:w-[25rem] bg-gray-200 outline-none py-1 px-40 text-lg focus:px-7  focus: duration-500"
                    type='search'
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Procurar"
                />
            </div>

            <Container className='pt-4'>

                <Row md={5}>
                    {deputs.map(item => (
                        <Col key={item.id}>
                            <Card bg='primary' text='light' className="mb-4 rounded-5" >
                                <Card.Body className='text-center'>
                                    <Link href={'/deputados/' + item.id}>
                                        <Card.Img className='rounded-lg shadow-2xl shadow-black transition duration-300 ease-in-out hover:scale-105' variant="top" src={item.urlFoto} alt={item.nome} />
                                    </Link>
                                    <Card.Text>{item.nome}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className='container font-bold text-center' id='sentinela'>
                    <h3 className='text-white bg-blue-900 bg-opacity-80 mx-[400px] rounded-full'>Fim da Lista de Deputados</h3>
                </div>

            </Container>
            <Footer />
        </>
    )
}

export default ListaDeputados