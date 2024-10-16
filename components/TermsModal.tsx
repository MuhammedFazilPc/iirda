// app/components/TermsModal.tsx
import { Button } from './ui/button';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <h2 className="text-xl font-bold mb-4">Terms of Use</h2>
        <div className="overflow-y-auto max-h-96">
          <p className="text-gray-700">
            {/* Terms content can be replaced with actual text */}
            This is where your Terms of Use content will go. You can place long text here, 
            and it will be scrollable if it exceeds the modal height.
          </p>
        </div>

        {/* Close Button */}
        <Button onClick={onClose} className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">
          Close
        </Button>
      </div>
    </div>
  );
};

export default TermsModal;
