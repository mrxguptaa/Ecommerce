
const Newsletter = () => {
    return (
        <>
        <div>
            <div className="flex items-center flex-col gap-2 text-center border-t-2 pt-2">
                <h1 className='font-bold text-xl '>Newsletter</h1>
                <form action="/newsletter.jsx" method="POST" className="flex justify-around border">
                <input type="email" placeholder="Enter your Email" className="p-2"/>
                <input type="submit" value='Subscribe' className="bg-gray-200 px-2"/>
                </form>
                <p className='px-4 text-sm'>Subscribe to get Emails of Offers , News , Updates and more.</p>
            </div>
            <div></div>
        </div>
        </>
    )
}

export default Newsletter