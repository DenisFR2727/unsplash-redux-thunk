
const Filter = ({selectOption}) => {

const selectLikes = (e) =>{
      e.preventDefault();
      selectOption(e.target.value)
}
    return (<div>
              <select onChange={selectLikes}>
                  <option value="all">All</option>
                  <option value="low">Low liks</option>
                  <option value="hight">Hight likes</option>
              </select>
    </div>)
}

export default Filter;