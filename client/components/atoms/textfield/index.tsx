import classNames from 'classnames';
import { IconSearch } from '../../../assets';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'search' | 'default';
  inputClassName?: string;
  fullWidth?: boolean;
  width?: string | number;
  labelText?: string;
  isError?: boolean;
  errorMessage?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  className = '',
  inputClassName = '',
  variant,
  type = 'text',
  fullWidth,
  labelText,
  isError,
  errorMessage,
  width,
  ...otherProps
}) => {
  return (
    <div
      style={{ width }}
      className={classNames('relative', {
        [className]: className.length > 0,
        'w-full': fullWidth,
      })}
    >
      {variant === 'search' ? (
        <IconSearch className="absolute transform top-1/2 left-4 -translate-y-2/4" />
      ) : null}
      {labelText ? (
        <label className="block text-caption-1 font-bold text-purple-light mb-1.5">
          {labelText}
        </label>
      ) : null}
      <input
        {...otherProps}
        style={{ height: variant === 'search' ? '40px' : '32px' }}
        type={type}
        className={classNames(
          'border border-purple-light focus:outline-none text-footnote px-4 rounded-md',
          {
            'text-caption-1 rounded-full pl-11': variant === 'search',
            [inputClassName]: inputClassName?.length > 0,
            'w-full': fullWidth || width,
            'border-red-error': isError,
          }
        )}
      />
      {isError && <span className="text-caption-1 text-red mt-3 block">{errorMessage}</span>}
    </div>
  );
};

export default TextField;
