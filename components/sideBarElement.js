import Link from 'next/link';

export default function SideBarElement({ text, href, currentPage }) {
  return (
    <div className={`sidebar-element ${currentPage === text ? 'sidebar-element-active' : ''}`}>
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </div>
  );
}
