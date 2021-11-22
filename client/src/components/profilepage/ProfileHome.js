import GeneralSections from "../common/GeneralSections";
import ProfileHeader from "./ProfileHeader";
import { ACHIEVEMENT_CARD, QUIZ_CARD } from '../../types/cardTypes';
import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileState";

export default function ProfileHome(props) {
    const {viewType} = useContext(ProfileContext)
    var profile = props.profile
    return (
        <div>
            <ProfileHeader name={props.name} description={profile.description} banner={profile.bannerURI} />
            <GeneralSections items={props.quizzes} type={QUIZ_CARD} name={viewType=="OWNER_VIEW"? "My Quizzes":"His Quizzes"}/>
            <GeneralSections items={profile.achievements} type={ACHIEVEMENT_CARD} name={"Achivements"}/>
        </div>
    )
}