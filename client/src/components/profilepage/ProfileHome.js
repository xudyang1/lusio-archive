import GeneralSections from "../common/GeneralSections";
import ProfileHeader from "./ProfileHeader";
import { ACHIEVEMENT_CARD, QUIZ_CARD } from '../../types/cardTypes';

export default function ProfileHome(props) {
    var profile = props.profile
    return (
        <div>
            <ProfileHeader name={props.name} description={profile.description} banner={profile.bannerURI} />
            <GeneralSections items={profile.quizzesCreated} type={QUIZ_CARD} name={"My Quizzes"} profilepage={true} />
            <GeneralSections items={profile.achievements} type={ACHIEVEMENT_CARD} name={"Achivements"} profilepage={true} />
        </div>
    )
}