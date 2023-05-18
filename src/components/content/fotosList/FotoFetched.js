import {  useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
         fetchFotos, 
         selectFotos, 
         selectFotosLoadingStatus, 
         openWidthFull,
         closeFull,
         optionSelect,
         setDisplayedFotos, 
         setSelectAllFotos,
         setInfoFoto} from "./FotoFetchedSlice";

import "./fotoslist.css";
import Filter from "../../filterFotos/Filter";
import Pagination from "../../pagination/Pagination";
import InfoFotoImage from "../../modal/InfoFotoImage";

const FotoFetched = () => {
    const dispatch = useDispatch();
    const fotos = useSelector(selectFotos);
    const fotosLoadingStatus = useSelector(selectFotosLoadingStatus);
    const modalOpen = useSelector((state) => state.modalOpen);
    const fullSizePhotoUrl = useSelector((state) => state.fullSizePhotoUrl);
    const option = useSelector((state) => state.setOption)
    const displayedFotos = useSelector((state) => state.displayedFotos);
    const allFotos = useSelector((state) => state.selectAllFotos);
    const modalInfo = useSelector((state) => state.modalInfoFoto)

    const fotosListRef = useRef(null);

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
                   <p className="description_p">{foto.alt_description}</p>
                   <p className="likes_foto">{foto.likes}</p>
                   <button className="info_images"
                           onClick={() => dispatch(
                           setInfoFoto(foto),
                    )}>Info</button> 
                   <img src={foto.urls.small_s3}
                           onClick={() => dispatch(openWidthFull(foto.urls.regular))}/>
                </li>
           ))
    return <ul className="animation_scroll" 
               ref={fotosListRef}>{fotos}</ul>
}
const handleOptionLikes = useCallback((childValue) => {
      dispatch(optionSelect(childValue));
},[optionSelect]);

const clickToNextFotos = useCallback(() => {
    dispatch(setDisplayedFotos(displayedFotos + 3));
    if (fotosListRef.current) {
        fotosListRef.current.lastChild.scrollIntoView({ behavior: "smooth" });
      }
  }, [dispatch, displayedFotos, fotosListRef]);

const clickToBackFotos = useCallback(() => {
    if (displayedFotos > 3) {
        dispatch(setDisplayedFotos(displayedFotos - 3));
    }
}, [dispatch, displayedFotos,fotosListRef]);

const selectAllFotos = useCallback((childValue) => {
    dispatch(setSelectAllFotos(childValue))
}, [dispatch, setSelectAllFotos])

const clickFirstFotos = useCallback(() => {
    if (fotosListRef.current) {
        fotosListRef.current.scrollIntoView({ behavior: "smooth" });
       }
},[fotosListRef])

console.log(fotos.fotos)
const renderFotos = renderFotosAll(allFotos ? fotos : fotos.slice(0, displayedFotos) )

    return (<div className="render_fotos">
            <div className="select_option">
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
            {modalInfo && (
            <InfoFotoImage onClose={() => 
                         dispatch(setInfoFoto())}
            />)}
            <Pagination  nextToFotos={clickToNextFotos} 
                         backToFotos={clickToBackFotos}
                         allFotos={selectAllFotos}
                         firstToFotos={clickFirstFotos}
            />                 
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