import classes from "@/pages/Pages.module.css";
import {useEffect} from "react";
import {navigate} from "@storybook/addon-links";
import {useNavigate} from "react-router-dom";


const NotFoundPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/')
    }, [])
    return (
        <div className={classes.pageContainer}>

        </div>
    );
};

export default NotFoundPage;
