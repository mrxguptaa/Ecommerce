import { Link } from 'react-router-dom';

const Popup = ({ data, onClose }) => {
    return (
        <div className="border-2 w-[80%] ml-[10%] p-4 bg-sky-200 font-medium absolute top-[15vh]  border-black rounded-2xl">
            <h1 className="text-2xl font-bold font-mono">Confirm?</h1>
            <div className="mb-2 capitalize">
                <strong>Full Name:</strong> {data.FullName}
            </div>
            <div className="mb-2 capitalize">
                <strong>Username:</strong> {data.Username}
            </div>
            <div className="mb-2 capitalize">
                <strong>Phone No:</strong> {data.Number}
            </div>
            <div className="mb-2 capitalize">
                <strong>Address Type:</strong> {data.AddressType}
            </div>
            <div className="mb-2 capitalize">
                <strong>Street:</strong> {data.Street}
            </div>
            <div className="mb-2 capitalize">
                <strong>Locality:</strong> {data.Locality}
            </div>
            <div className="mb-2 capitalize">
                <strong>City:</strong> {data.City}
            </div>
            <div className="mb-2 capitalize">
                <strong>State:</strong> {data.State}
            </div>
            <div className="mb-2 capitalize">
                <strong>Country:</strong> {data.Country}
            </div>
            <div className="mb-2 capitalize">
                <strong>Postal Code:</strong> {data.Postal}
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    <Link to='/Home'>Confirm</Link>
                </button>
            </div>
        </div>
    )
}

export default Popup;