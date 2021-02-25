import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconClose } from '../../../assets';
import { Button, TextField } from '../../atoms';

interface TanyaJawabProps {
  onCancel?: () => void;
}

const TanyaJawab: React.FC<TanyaJawabProps> = ({ onCancel }) => {
  const [textArea, setTextArea] = useState<string>('');

  const variants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setTextArea(value);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      style={{ zIndex: 120 }}
      className="fixed flex justify-center items-center top-0 left-0 w-full h-full overflow-auto bg-black bg-opacity-10"
    >
      <motion.div
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={variants}
        className="bg-white max-w-md w-full px-6 py-6 border border-purple-light"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="md:text-body text-body-sm font-medium text-black">Tanya Jawab</span>
          <button
            onClick={onCancel}
            className="flex items-center justify-center rounded-full bg-blue h-8 w-8 focus:outline-none"
          >
            <IconClose />
          </button>
        </div>
        <p className="md:text-body-sm text-body-xs text-grey pb-6 border-b border-purple-light">
          Pendakian Pusuk Bukit
        </p>
        <div className="mt-6 mb-4 flex items-center justify-between">
          <span className="md:text-body text-body-sm font-medium text-red">Jane Doe</span>
          <span className="md:text-body-sm text-body-xs text-grey">1d</span>
        </div>
        <p className="md:text-body-sm text-body-xs text-black mb-4 md:mb-9">
          Syntheses a mote of dust suspended in a sunbeam?
        </p>
        <p className="text-black font-medium text-body-sm mb-1.5">Jawab</p>
        <textarea
          onChange={handleChangeTextArea}
          value={textArea}
          maxLength={250}
          className="w-full border border-purple rounded-md md:h-28 h-20 resize-none p-3 md:text-body-sm text-body-xs text-black focus:outline-none"
          placeholder="Tulis Jawaban"
        ></textarea>
        <p className="text-red text-right text-body-xs md:text-body-sm mb-2 md:mb-4">
          {textArea.length}/250 Karakter
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-4">
          <TextField
            errorMessage="Field wajib diisi"
            labelText="Name"
            fullWidth
            placeholder="Jane Doe"
            inputClassName="md:text-body-sm text-body-xs"
          />
          <TextField
            errorMessage="Field wajib diisi"
            labelText="Email"
            fullWidth
            placeholder="janedoe@gmail.com"
            inputClassName="md:text-body-sm text-body-xs"
          />
        </div>
        <Button className="mb-6" customHeight style={{ height: 38 }}>
          Post
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TanyaJawab;
