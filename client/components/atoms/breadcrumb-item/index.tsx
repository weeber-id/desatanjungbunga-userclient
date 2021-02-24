import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './breadcrumb-item.module.css';

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  href?: string;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  isActive,
  href = '/',
  className = '',
}) => {
  const { pathname } = useRouter();

  return (
    <div
      className={classNames(
        'breadcrumb-item text-purple font-extrabold flex items-center hover:text-red',
        {
          [className]: className?.length > 0,
          [styles['breadcrumb-item']]: true,
          [styles['active']]: isActive,
        }
      )}
    >
      <Link href={isActive ? pathname : href}>
        <a
          className={classNames('breadcrum-link text-footnote flex-shrink', {
            'cursor-default': isActive,
          })}
        >
          {children}
        </a>
      </Link>
    </div>
  );
};

export default BreadcrumbItem;
