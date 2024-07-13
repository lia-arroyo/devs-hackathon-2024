import BubblyBackground from '@/components/BubbleBackground/BubbleBackground';
import classes from './Pages.module.css';
import GroupsContainer from '@/components/GroupsContainer/GroupsContainer';
import {CheckLogin} from "@/components/CheckLogin/CheckLogin";

const ViewGroupsPage = () => {
  return (
    <div className={classes.pageContainer}>
      <CheckLogin/>
      <BubblyBackground />
      <GroupsContainer />
    </div>
  );
};

export default ViewGroupsPage;
