import { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useMemberContext } from '../../contexts/MemberContext';

function QRScanner() {
  const { members } = useMemberContext();
  const [scanning, setScanning] = useState(true);
  const [scanHistory, setScanHistory] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    // Request camera permission on component mount
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setHasPermission(true);
      })
      .catch((error) => {
        setHasPermission(false);
        toast.error('Camera permission is required for QR scanning');
        console.error('Camera permission error:', error);
      });

    // Cleanup
    return () => {
      if (hasPermission) {
        // Stop all video streams
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            stream.getTracks().forEach(track => track.stop());
          });
      }
    };
  }, []);

  const handleScan = (data) => {
    if (data) {
      const memberId = data.text;
      const timestamp = new Date();
      
      // Find member from context
      const member = members.find(m => m.memberId === memberId);

      if (member) {
        // Add to scan history
        const scanRecord = {
          memberId,
          timestamp,
          memberName: member.name,
          paymentStatus: member.renewalStatus,
          type: 'check-in'
        };

        setScanHistory(prev => [scanRecord, ...prev]);
        
        // Show different messages based on payment status
        if (member.renewalStatus === 'paid') {
          toast.success(`Welcome ${member.name}! Attendance marked successfully.`);
        } else {
          toast.warning(`Welcome ${member.name}! Please note your membership payment is pending.`);
        }
      } else {
        toast.error('Invalid membership QR code!');
      }
      
      // Pause scanning briefly after successful scan
      setScanning(false);
      setTimeout(() => setScanning(true), 2000);
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner error:', err);
    toast.error('Error scanning QR code. Please try again.');
  };

  // QR Reader configuration
  const previewStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const scannerProps = {
    delay: 300,
    onError: handleError,
    onScan: handleScan,
    style: previewStyle,
    constraints: {
      video: { facingMode: 'environment' }
    }
  };

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">QR Scanner</h2>
          <div className="aspect-square relative">
            {hasPermission === false && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center p-4">
                  <p className="text-lg font-semibold text-red-600 mb-2">Camera Access Required</p>
                  <p className="text-gray-600">Please enable camera access to use the QR scanner.</p>
                </div>
              </div>
            )}
            {hasPermission === true && scanning && (
              <QrReader {...scannerProps} />
            )}
            {hasPermission === true && !scanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-600">Processing scan...</p>
              </div>
            )}
            {hasPermission === null && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-gray-600">Requesting camera access...</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setScanning(!scanning)}
              className="px-4 py-2 bg-primary text-white rounded-lg"
              disabled={!hasPermission}
            >
              {scanning ? 'Pause Scanner' : 'Resume Scanner'}
            </button>
          </div>
        </div>

        {/* Scan History */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Scans</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {scanHistory.map((scan, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{scan.memberName}</p>
                    <p className="text-sm text-gray-600">
                      {format(scan.timestamp, 'PPpp')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${scan.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {scan.paymentStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Member ID: {scan.memberId}
                </p>
              </div>
            ))}
            {scanHistory.length === 0 && (
              <p className="text-gray-500 text-center">No recent scans</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRScanner;