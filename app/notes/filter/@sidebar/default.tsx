import Link from "next/link";
import { AVAILABLE_TAGS } from "@/lib/api";
import css from './SidebarNotes.module.css'

const NotesSidebar = () => {

  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>

      {AVAILABLE_TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
