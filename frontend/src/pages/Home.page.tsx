import { Welcome } from '../components/Demo_Welcome/Welcome';
import { ColorSchemeToggle } from '../components/Demo_ColorSchemeToggle/ColorSchemeToggle';
import classes from './Pages.module.css';

export function HomePage() {
  return (
    <div className={classes.pageContainer}>
      <Welcome />
      <ColorSchemeToggle />
    </div>
  );
}
