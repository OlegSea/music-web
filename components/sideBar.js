import Link from 'next/link';
import SideBarElement from './sideBarElement';

export default function SideBar({ sideBarShown, changeSideBarVisibility, pages, currentPage }) {
  return (
    <div>
      <button
        style={{ display: sideBarShown ? 'none' : 'block' }}
        className='sidebar-button'
        onClick={() => changeSideBarVisibility(!sideBarShown)}
      ></button>
      <div className={'sidebar ' + (sideBarShown ? 'sideBarShow' : 'sideBarHide')}>
        {pages.map((page) => {
          return (
            <SideBarElement key={page['name']} text={page['name']} href={page['href']} currentPage={currentPage} />
          );
        })}
        <div className='sidebar-element hide-button'>
          <p onClick={() => changeSideBarVisibility(!sideBarShown)}>Hide</p>
        </div>
      </div>
    </div>
  );
}
