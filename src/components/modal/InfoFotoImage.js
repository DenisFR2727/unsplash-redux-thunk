import { useSelector } from "react-redux";
const InfoFotoImage = ({onClose}) => {
      const info = useSelector((state) => state.infoFoto);
      console.log(info)
    return ( 
      <div className="modal">
        <div className="modal-content">
           <img src={info.urls.small_s3}/>
          <p>{info.alt_description}</p>
          <p>{info.description}</p>
          <p>Likes: {info.likes}</p>
          <p>Height: {info.height}</p>
          <p>Width: {info.width}</p>
          <button onClick={onClose}>Close</button>
        </div>
    </div>
    )
}
export default InfoFotoImage;