import BubblyBackground from '@/components/BubbleBackground/BubbleBackground';
import classes from './Pages.module.css';
import GroupsContainer from '@/components/GroupsContainer/GroupsContainer';
import {CheckLogin} from "@/components/CheckLogin/CheckLogin";
import {SignoutButton} from "@/components/SignoutButton/SignoutButton";

const ViewGroupsPage = () => {
  return (
    <div className={classes.pageContainer}>
      <CheckLogin/>
      <BubblyBackground />
      <GroupsContainer />
      <SignoutButton/>
    </div>
  );
};

export default ViewGroupsPage;
