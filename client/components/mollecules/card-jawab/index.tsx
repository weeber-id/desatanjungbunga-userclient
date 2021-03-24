interface CardJawabProps {
  name?: string;
  created_at?: string;
  body?: string;
}

const CardJawab: React.FC<CardJawabProps> = ({ body, created_at, name }) => {
  return (
    <div className="rounded-lg shadow-md px-6 border-l-4 border-purple-light py-3 flex justify-between items-start mb-3">
      <span className="text-body-sm md:text-body text-purple-light font-bold mr-2">
        {name}
        <span className="md:text-body-sm text-body-xs text-black font-normal ml-4 relative -top-0.5">
          {body}
        </span>
      </span>
      <span className="w-28 md:text-body-sm text-body-xs text-grey text-right">{created_at}</span>
    </div>
  );
};

export default CardJawab;
