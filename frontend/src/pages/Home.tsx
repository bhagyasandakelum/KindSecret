import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type FormData = {
  recipientEmail: string;
  subject?: string;
  message: string;
};

export default function Home() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setErrorMsg('');
    try {
      // Connect to backend
      const response = await axios.post('http://localhost:5000/api/send-secret', data);
      if (response.data.success) {
        navigate(`/success/${response.data.secretId}`);
      }
    } catch (err: any) {
      if (err.response?.status === 429) {
        setErrorMsg('Rate limit exceeded. Please try again later.');
      } else {
        setErrorMsg(err.response?.data?.error || 'An error occurred while sending.');
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 mb-4 tracking-tight">
          Send a Surprise
        </h2>
        <p className="text-lg text-gray-600">
          Make someone's day. Write a kind message and we'll deliver it completely anonymously.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full opacity-50 -z-10" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          
          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Email <span className="text-secondary-500">*</span></label>
            <input
              type="email"
              {...register('recipientEmail', { 
                required: 'Recipient email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              placeholder="friend@example.com"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white/50"
            />
            {errors.recipientEmail && <p className="text-red-500 text-xs mt-2">{errors.recipientEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input
              type="text"
              {...register('subject')}
              placeholder="Someone sent you a KindSecret 💌"
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message <span className="text-secondary-500">*</span></label>
            <textarea
              {...register('message', { 
                required: 'Message is required',
                maxLength: { value: 2000, message: 'Message too long' }
              })}
              rows={5}
              placeholder="Write something kind..."
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none bg-white/50"
            />
            <div className="flex justify-between mt-2">
              {errors.message ? (
                <p className="text-red-500 text-xs">{errors.message.message}</p>
              ) : <div/>}
              <p className="text-xs text-gray-400 text-right">Max 2000 chars</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
          >
            {isSubmitting ? 'Sending...' : (
              <>
                Send Anonymously
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center flex items-center justify-center gap-2 text-gray-500 text-sm">
        <HeartHandshake className="w-4 h-4" />
        <p>100% anonymous & secure</p>
      </div>
    </div>
  );
}
