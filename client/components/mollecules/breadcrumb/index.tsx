import classNames from 'classnames';

interface Breadcrumbprops extends React.HTMLAttributes<HTMLDivElement> {}

const Breadcrumb: React.FC<Breadcrumbprops> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={classNames('breadcrumb flex items-center', {
        [className]: className?.length > 0,
      })}
    >
      {children}
    </div>
  );
};

export default Breadcrumb;
