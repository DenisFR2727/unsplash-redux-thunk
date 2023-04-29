import {  useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
         fetchFotos, 
         selectFotos, 
         selectFotosLoadingStatus, 
         openWidthFull,
         closeFull,
         optionSelect } from "./FotoFetchedSlice";

import "./fotoslist.css";
import Filter from "../filterFotos/Filter";

const FotoFetched = () => {
    const dispatch = useDispatch();
    const fotos = useSelector(selectFotos);
    const fotosLoadingStatus = useSelector(selectFotosLoadingStatus);
    const modalOpen = useSelector((state) => state.modalOpen);
    const fullSizePhotoUrl = useSelector((state) => state.fullSizePhotoUrl);
    const option = useSelector((state) => state.setOption)
  
    console.log(fotos)
useEffect(() => {
    dispatch(fetchFotos());
},[dispatch]);

const renderFotosAll = (arr) => {
    const fotos = arr.filter((foto) => {
        if(option === "all"){
           return true
        }
        else if(option === 'low'){
           return foto.likes <= 20
        }
        else if(option === 'hight'){
           return foto.likes >= 20
        }
    }).map((foto) => (
                <li key={foto.id}
                    className="li_foto">
                   <p>{foto.alt_description}</p>
                   <p className="likes_foto">{foto.likes}</p>
                   <img src={foto.urls.small_s3}
                        onClick={() => dispatch(openWidthFull(foto.urls.raw))}  />
                </li>
           ))
    return <ul>{fotos}</ul>
}
const handleOptionLikes = useCallback((childValue) => {
      dispatch(optionSelect(childValue));
},[optionSelect])


const renderFotos = renderFotosAll(fotos)

    return (<div className="render_fotos">
            <div>
                <Filter selectOption={handleOptionLikes}/>
            </div>
             {fotosLoadingStatus === "loading" && <p>Loading...</p>}
             {fotosLoadingStatus === "idle" && (<div>{renderFotos}</div>)}
             {fotosLoadingStatus === "error" && <p>Error</p>}
             {modalOpen && (
                <Modal
                fullSizePhotoUrl={fullSizePhotoUrl}
                onClose={() => dispatch(closeFull())}
                />
            )}
    </div>)
}

const Modal = ({ fullSizePhotoUrl, onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <img src={fullSizePhotoUrl}  onClick={onClose} />
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
export default FotoFetched;