interface ISmallContainerProps {
    imageUrl: string
}

const SmallContainer = (props: ISmallContainerProps) => {
    console.log(props.imageUrl)
    return (
        <div className="size-24 hover:border-2 hover:border-blue rounded-md">
            <img className="h-20 mx-auto" src={props.imageUrl}></img>
        </div>
    )

}

export default SmallContainer