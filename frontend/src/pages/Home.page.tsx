import { Welcome } from '../components/Demo_Welcome/Welcome';
import { ColorSchemeToggle } from '../components/Demo_ColorSchemeToggle/ColorSchemeToggle';
import classes from './Pages.module.css';
import { LeaderboardModal } from '@/components/Leaderboard/LeaderboardModal';

export function HomePage() {
  return (
    <div className={classes.pageContainer}>
      <Welcome />
      <ColorSchemeToggle />
      <LeaderboardModal />
    </div>
  );
}
