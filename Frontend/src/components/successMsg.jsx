const SuccessMsg = (props) => {
    // console.log('triggred')
    // console.log(props)
    return (
        <>
        <div className="w-[50%] border-2 rounded-2xl fixed top-[30vh] left-[25%] p-5 transition-all scale(1)" id="success">
            <h1 className="text-green-400 font-bold ">Success</h1>
            {props.data}
        </div>
        </>
    )
}

export default SuccessMsg