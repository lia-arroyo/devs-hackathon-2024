import BubblyBackground from '@/components/BubbleBackground/BubbleBackground';
import classes from './Pages.module.css';
import GroupsContainer from '@/components/GroupsContainer/GroupsContainer';

const ViewGroupsPage = () => {
  return (
    <div className={classes.pageContainer}>
      <BubblyBackground />
      <GroupsContainer />
    </div>
  );
};

export default ViewGroupsPage;
