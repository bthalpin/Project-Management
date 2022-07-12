import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.links}>
                <Link href="/">Home</Link>
               
            </div>
        </div>
    )
}

export default Navbar;