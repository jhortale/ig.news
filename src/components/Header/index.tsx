import Image from 'next/image'
import logo from '../../assets/logo.svg'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="ig.news" />

        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
