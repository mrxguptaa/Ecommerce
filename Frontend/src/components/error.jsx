const ErrorBox = ({errorName}) =>  {
    return (
        <>
        <div className="fixed flex flex-col p-4 border-2 border-red-200 rounded-2xl gap-3 top-[30vh] w-[80%] left-[10%] animate-bounce  ">
        <h1 className="text-2xl text-red-700 font-bold font-mono ">Error</h1>
        <p>{errorName}</p>
        </div>
        </>
    )
}

export default ErrorBox