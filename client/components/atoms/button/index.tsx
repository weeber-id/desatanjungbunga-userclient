import classNames from 'classnames';
import Link from 'next/link';
import styles from './button.module.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'outlined' | 'default';
  color?: 'red' | 'default';
  fullWidth?: boolean;
  bold?: boolean;
  customHeight?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  color = 'default',
  fullWidth,
  bold,
  href,
  customHeight = false,
  ...otherProps
}) => {
  const btn = (
    <button
      {...otherProps}
      className={classNames(
        'btn text-center flex items-center justify-center px-6 rounded-md text-body-sm lg:text-body focus:outline-none',
        {
          [className]: className.length > 0,
          'text-white': variant === 'default',
          'bg-transparent border': variant === 'outlined',
          'bg-red': color === 'red' && variant === 'default',
          'text-red border-red hover:text-white hover:bg-red':
            color === 'red' && variant === 'outlined',
          'bg-purple-light hover:bg-red': color === 'default' && variant === 'default',
          'text-purple-light border-purple-light hover:text-white hover:bg-red':
            color === 'default' && variant === 'outlined',
          'w-full': fullWidth,
          [styles['btn']]: !customHeight,
          ['font-medium']: bold,
        }
      )}
    >
      {children}
    </button>
  );

  if (href) {
    return (
      <Link href={href}>
        <a>{btn}</a>
      </Link>
    );
  }

  return btn;
};

export default Button;
