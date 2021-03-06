import Image from 'next/image'
import logo from '../../assets/logo.svg'
import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'
import styles from './styles.module.scss'

export function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="ig.news" width="100%" height="100%" />

        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
