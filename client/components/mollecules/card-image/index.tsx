import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface CardImageProps {
  text?: string;
  height?: number;
  width?: number;
  textPosition?: 'start' | 'center' | 'end';
  textColor?: 'black' | 'red' | 'purple';
  className?: string;
  layout?: 'responsive' | 'intrinsic' | 'fixed';
  src?: string;
  alt?: string;
  italic?: boolean;
  textSize?: 'body' | 'body-sm' | 'h5';
  hover?: boolean;
  href?: string;
}

const CardImage: React.FC<CardImageProps> = ({
  className = '',
  height,
  width,
  textPosition = 'start',
  textColor = 'black',
  text,
  src,
  layout,
  alt,
  italic,
  textSize = 'body',
  hover,
  href,
}) => {
  const component = (
    <div
      className={classNames('px-2 py-2.5 border border-purple-light rounded-lg bg-white', {
        [className]: className,
        'hover:border-2 hover:border-purple cursor-pointer': hover,
      })}
    >
      <Image
        className="rounded-lg"
        alt={alt}
        src={src}
        width={width}
        height={height}
        layout={layout}
        objectFit="cover"
        objectPosition="center"
      />
      <p
        className={classNames(
          `text-body-sm lg:text-${textSize} line-clamp-3 mt-2.5 px-3 text-${textColor}`,
          {
            'text-center': textPosition === 'center',
            'text-left': textPosition === 'start',
            'text-right': textPosition === 'end',
            italic: italic,
          }
        )}
      >
        {text}
      </p>
    </div>
  );

  if (href)
    return (
      <Link href={href}>
        <a>{component}</a>
      </Link>
    );

  return component;
};

export default CardImage;
