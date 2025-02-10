import { QRCodeSVG } from 'qrcode.react'

function QRCodeModal({ isOpen, onClose, qrData, paymentStatus, memberId, expiryDate }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                  Your Gym Access QR Code
                </h3>
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <QRCodeSVG value={qrData} size={200} />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">
                      Member ID: <span className="font-semibold">{memberId}</span>
                    </p>
                    <p className="text-gray-600 mb-2">
                      Payment Status: {' '}
                      <span className={`font-semibold ${paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                        {paymentStatus}
                      </span>
                    </p>
                    {expiryDate && (
                      <p className="text-gray-600">
                        Expires: {new Date(expiryDate).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodeModal