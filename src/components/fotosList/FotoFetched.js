import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
         fetchFotos, 
         selectFotos, 
         selectFotosLoadingStatus, 
         openWidthFull,
         closeFull } from "./FotoFetchedSlice";

import "./fotoslist.css";

const FotoFetched = () => {
    const dispatch = useDispatch();
    const fotos = useSelector(selectFotos);
    const fotosLoadingStatus = useSelector(selectFotosLoadingStatus);
    const modalOpen = useSelector((state) => state.modalOpen);
    const fullSizePhotoUrl = useSelector((state) => state.fullSizePhotoUrl);
  
    console.log(fotos)
useEffect(() => {
    dispatch(fetchFotos());
},[dispatch]);

const renderFotosAll = (arr) => {
    const fotos = arr.map((foto) => (
                <li key={foto.id}
                    className="li_foto">
                   <p>{foto.alt_description}</p>
                   <img src={foto.urls.small_s3}
                        onClick={() => dispatch(openWidthFull(foto.urls.raw))}  />
                </li>
           ))
    return <ul>{fotos}</ul>
}

const renderFotos = renderFotosAll(fotos)

    return (<div className="render_fotos">
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