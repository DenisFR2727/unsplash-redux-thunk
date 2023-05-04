import "./pagination.css";

const Pagination = ({nextToFotos,backToFotos,allFotos,firstToFotos}) => {

const nextFotos = () => {
      nextToFotos()
}
const backFotos = () => {
      backToFotos()
}
const allClickBtn = () => {
    allFotos()
}
const firstFotos = () => {
    firstToFotos()
}
    return (<div className="pagination_next_back_all">
          <button onClick={nextFotos}>Next 3</button>
          <button onClick={backFotos}>Back 3</button>
          <button onClick={firstFotos}>First...</button>
          <button onClick={allClickBtn}>All</button>
    </div>)
}
export default Pagination;