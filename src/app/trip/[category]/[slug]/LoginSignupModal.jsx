import React, { useState } from 'react';
import { useAuth } from '@/app/auth/AuthLogic';
import { Button } from '@/components/ui/button';

const LoginSignupModal = ({ onClose, onSuccess }) => {
  const auth = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: enter mobile, 2: enter OTP

  const handleSendOtp = async () => {
    if (!mobileNumber) return alert('Enter mobile number');
    if (mode === 'login') {
      await auth.login({ mobileNumber });
    } else {
      await auth.signup({ mobileNumber, name, email });
    }
    setStep(2);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert('Enter OTP');
    if (mode === 'login') {
      await auth.verifyLoginOtp(otp);
    } else {
      await auth.verifyOtp(otp);
    }
    if (auth.user) {
      onSuccess && onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <div className="flex gap-2 mb-4">
          <Button variant={mode === 'login' ? 'default' : 'outline'} onClick={() => setMode('login')}>Login</Button>
          <Button variant={mode === 'signup' ? 'default' : 'outline'} onClick={() => setMode('signup')}>Sign Up</Button>
        </div>
        {step === 1 && (
          <form onSubmit={e => { e.preventDefault(); handleSendOtp(); }}>
            {mode === 'signup' && (
              <>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full mb-2 p-2 border rounded" />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-2 p-2 border rounded" />
              </>
            )}
            <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} className="w-full mb-2 p-2 border rounded" />
            <Button type="submit" className="w-full">Send OTP</Button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={e => { e.preventDefault(); handleVerifyOtp(); }}>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} className="w-full mb-2 p-2 border rounded" />
            <Button type="submit" className="w-full">Verify OTP</Button>
            <Button variant="outline" className="w-full mt-2" onClick={auth.resendOtp}>Resend OTP</Button>
          </form>
        )}
        <Button onClick={onClose} className="mt-4 w-full">Close</Button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
