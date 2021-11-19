

export default function PlatformAbout(props){
    const platformData = props.data
    //console.log(platformData)
    return(
        <div>
            {platformData.name}<br/>
            Platform ID: {platformData._id}<br/>
            owner ID: {platformData.owner}<br/>
            {platformData.description}<br/>
            {platformData.likes}<br/>
            data created: {platformData.createdAt}<br/>
        </div>
    )
}