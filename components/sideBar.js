import Link from 'next/link';
import SideBarElement from './sideBarElement';

export default function SideBar({ pages, currentPage }) {
  return (
    <div className='sidebar'>
      {pages.map((page) => {
        return (
          <SideBarElement key={page['name']} text={page['name']} href={page['href']} currentPage={currentPage} />
        );
      })}
    </div>
  );
}
