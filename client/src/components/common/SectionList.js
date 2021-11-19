import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCards from "../frontpage/QuizCard";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { QuizzesContext } from "../../context/QuizState";
import AdddItemCard from "./AddItemCard";
import { PlatformContext } from "../../context/PlatformState";
import PlatoformCard from "./PlatformCard";
import SubSectionList from "./SubSectionList";

function getCards(t, index, element) {
    console.log("CALLED GET CARDS")
    console.log("called getCards with type: ", t, element)
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><AchievementCard key={index} id={index} name={element.name} desc={element.description} /></div>
        case QUIZ_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><QuizCards key={index} id={index} name={element.name} desc={element.description} /></div>
        case SUB_PLAT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><PlatoformCard key={index} id={index} name={element.name} desc={element.description} /></div>
        case SUB_USER_CARD:
            break;
    }
}

export default function SectionList(props) {

    const { getPlatform, platfrom } = useContext(PlatformContext)
    const { getQuiz } = useContext(QuizzesContext)

    // const items = props.items ? props.items :[
    //     { id: '1', name: 'Q1', description: 'Description for Q1', author: 'Qwert', platform_id: '1', likes: 4, created: new Date('2010/01/22') },
    //     { id: '2', name: 'Q2', description: 'Description for Q2', author: 'qazx', platform_id: '2', likes: 1, created: new Date('2010/01/21') },
    //     { id: '3', name: 'Q3', description: 'Description for Q3', author: 'sktop', platform_id: '2', likes: 10, created: new Date('2021/10/22') },
    //     { id: '4', name: 'Qtop', description: 'Description for Q4', author: 'desktop', platform_id: '3', likes: 0, created: new Date('2021/01/22') },
    //     { id: '5', name: 'Q25', description: 'Description for Q25', author: 'shinetop', platform_id: '3', likes: 200, created: new Date('2021/01/22') }
    // ]
    // items.map(element => {
    //     var quiz = getQuiz(element)
    //     return [quiz.name, quiz.description]
    // });
    const name = props.name ? props.name : ""
    const callback = props.callback
    const add = props.add ? props.add : false
    //var templist = []
    //const items = props.items
    const [itemList, setList] = useState([])
    const [shouldRender, setShouldRender] = useState(true);
    // var temp = []

    // function getQuizzes(items) {
        
    //     console.log(templist)
    //     return templist
    // }
    

    useEffect(()=>{
        // var templist = []
        // props.items.forEach(element => {
        //     element = getQuiz(element, false)
        //     element.then(value => {
        //         templist.push(
        //             {
        //                 name: value.data.name,
        //                 description: value.data.description,
        //                 author: value.data.author,
        //                 likes: value.data.likes
        //             }
        //         )
        //     })
        // });
        // console.log("tempList:", templist)
        //return setList(templist)
        setTimeout(() => {
            setShouldRender(false);
          }, 1000);
        return setList(props.items)
    }, [props.items])
    // useEffect(()=>{
    //     console.log("State", itemList)
    //     console.log("Props", props.items)
    // }, [setList])
    //console.log(items)

    return (
        <div>
            <div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div>
                        <h4>{name}</h4>
                    </div>
                    <div className="valign-wrapper">
                        <div className="LSection">
                            {/* <SubSectionList items={itemList} type={props.type}/> */}
                            {
                                itemList.map((element, index) => (
                                    getCards(props.type, index, element)
                                ))
                            }
                            {add ? <AdddItemCard /> : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}