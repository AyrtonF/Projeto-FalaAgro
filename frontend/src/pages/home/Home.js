import React from 'react'
import './Home.css'
import Carrossel from '../../components/Carrossel/Carrossel'
import Categories from '../../components/Categories/Categories'
import DestaquesProdutos from '../../components/DestaquesProdutos/DestaquesProdutos'
import Footer from '../../components/Footer/Footer'
const Home = ()=>{
    return(
        <>
        <Carrossel/>
        <Categories className="categories"/>
        <DestaquesProdutos title={"Grãos"}/>
        <DestaquesProdutos title={"Maquinário"}/>
        <DestaquesProdutos title={"Animais"}/>


        <Footer/>
        </>
    )
}


export default Home