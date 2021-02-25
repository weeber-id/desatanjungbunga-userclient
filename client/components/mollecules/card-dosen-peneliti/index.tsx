import Image from 'next/image';

interface CardDosenPenelitiProps {
  src?: string;
  name?: string;
  title?: string;
  description?: string;
}

const CardDosenPeneliti: React.FC<CardDosenPenelitiProps> = ({ src, name, title, description }) => {
  return (
    <div className="border border-purple rounded-lg py-6 px-3 cursor-pointer hover:border-2">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 grid md:block grid-cols-2 gap-4 items-end">
          <Image layout="responsive" src={src} height={1200} width={900} />
          <div className="md:hidden">
            <h5 className="text-body-sm font-medium text-black">{name}</h5>
            <h6 className="text-body-xs text-red">{title}</h6>
          </div>
        </div>
        <div className="md:col-span-3">
          <h5 className="hidden md:block text-body font-medium text-black">{name}</h5>
          <h6 className="hidden md:block text-body-sm text-purple mb-6">{title}</h6>
          <p className="text-black md:text-body text-body-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDosenPeneliti;
