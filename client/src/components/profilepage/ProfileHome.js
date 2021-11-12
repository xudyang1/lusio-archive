import GeneralSections from "../common/GeneralSections";
import ProfileHeader from "./ProfileHeader";
import { ACHIEVEMENT_CARD, QUIZ_CARD } from '../../types/cardTypes';

export default function ProfileHome(props) {
    var userProfile = props.userProfile
    return (
        <div>
            <ProfileHeader name={userProfile.name} description={userProfile.description} banner={userProfile.profileBanner} />
            <GeneralSections items={userProfile.quizzes} type={QUIZ_CARD} name={"My Quizzes"} />
            <GeneralSections items={userProfile.achievements} type={ACHIEVEMENT_CARD} name={"Achivements"} />
        </div>
    )
}