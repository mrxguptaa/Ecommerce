const Home = () => {
    const userName = localStorage.getItem('userEmail')
    return <>
    {/* {userName ? <p className="text-center ">Hey {userName} </p> : ''} */}
    <h1 className="text-center items-center mt-14">This is Home Page</h1>
    </>
}

export default Home