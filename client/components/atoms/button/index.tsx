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
  isExternal?: boolean;
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
  isExternal,
  ...otherProps
}) => {
  const willBeUsedClassName = classNames(
    'btn text-center inline-flex items-center justify-center px-6 rounded-md text-body-sm lg:text-body focus:outline-none',
    {
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
    },
    className
  );

  if (isExternal) {
    return (
      <a className={willBeUsedClassName} href={href}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href}>
        <a className={willBeUsedClassName}>{children}</a>
      </Link>
    );
  }

  return (
    <button {...otherProps} className={willBeUsedClassName}>
      {children}
    </button>
  );
};

export default Button;
