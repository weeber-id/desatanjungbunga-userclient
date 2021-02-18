import classNames from 'classnames';
import styles from './button.module.css';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'outlined' | 'default';
  color?: 'red' | 'default';
  fullWidth?: boolean;
  bold?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  color = 'default',
  fullWidth,
  bold,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      className={classNames(
        'btn text-center flex items-center justify-center px-6 rounded-md text-caption-1 focus:outline-none',
        {
          [className]: className.length > 0,
          'text-white': variant === 'default',
          'bg-transparent border': variant === 'outlined',
          'bg-red': color === 'red' && variant === 'default',
          'text-red border-red': color === 'red' && variant === 'outlined',
          'bg-purple-light': color === 'default' && variant === 'default',
          'text-purple-light border-purple-light': color === 'default' && variant === 'outlined',
          'w-full': fullWidth,
          [styles['btn']]: true,
          ['font-medium']: bold,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
