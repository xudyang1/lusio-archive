import React, { useRef, useState, useEffect } from 'react';
import '../../css/imagePreview.css';
import M from 'materialize-css';

/**
 * @description A multi-use image component
 * @param {JSON} {...props} destructured props
 * @param {boolean} editable if true, click enables image file upload; false disables file upload
 * @param {string}  imageSrc image source in string representation || url
 * @param {string}  imageWidth  width of image in string; default '100px'
 * @param {string}  imageHeight  height of image in string; default '100px'
 * @param {boolean}  isCircle if true, display circle image; false displays rectangle image
 * @param {React.Dispatch}  setImageFile required if @editable == true, 
 *      store image file in parent component state so that   
 * @param {React.Dispatch}  setImagePreview required if @editable == true, 
 *      store image file in base 64 in parent component state
 * @param {function} handleOnClick   if @editable == false, pass in a function to handle on click event
 * @param {boolean} isMaterialBoxed if @editable == false, this can be set to true (use with caution)
 *      if true, click on the image will expand it
 * @returns {JSX.Element}
 */
export const ImagePreview = ({ editable, imageSrc, imageWidth, imageHeight, isCircle, setImageFile, setImagePreview, handleOnClick, isMaterialBoxed, setParentOnClick }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [materialBoxInstance, setMaterialBoxInstance] = useState(null);

    const fileInputRef = useRef(null);
    const materialBoxRef = useRef(null);

    useEffect(() => {
        if (isMaterialBoxed && materialBoxInstance == null)
            setMaterialBoxInstance(M.Materialbox.init(materialBoxRef.current));
        else if (!isMaterialBoxed && materialBoxInstance != null) {
            materialBoxInstance.destroy();
            setMaterialBoxInstance(null);
        }
    }, [isMaterialBoxed]);

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                // parent
                setImageFile(image);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
            // parent
            if(setImageFile && setImagePreview){
                setImageFile(null);
                setImagePreview(null);
            }
        }
    }, [image]);

    useEffect(() => {
        if (setParentOnClick != null)
            setParentOnClick((event) => {
                event.preventDefault();
                fileInputRef.current.click();
            });
    }, []);

    if (editable) {
        return (<>
            <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                accept="image/*"
                onChange={(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substring(0, 5) === "image") {
                        setImage(file);
                    } else {
                        setImage(null);
                    }
                }} />
            {
                (!imageSrc && !preview) ?
                    (<div
                        className={isCircle ? 'image-preview image-preview__default-text circle' : 'image-preview image-preview__default-text'}
                        style={{ width: imageWidth || "100px", height: imageHeight || "100px" }}
                        onClick={(event) => {
                            event.preventDefault();
                            fileInputRef.current.click();
                        }}>
                        Choose Image
                    </div>)
                    :
                    (<img
                        className={isCircle ? 'circle' : 'image-preview'}
                        src={imageSrc || preview}
                        style={{ objectFit: "cover" }}
                        width={imageWidth || "100px"}
                        height={imageHeight || "100px"}

                        onClick={(event) => {
                            event.preventDefault();
                            fileInputRef.current.click();
                        }}></img>)
            }
        </>);
    } else {
        return (<>
            <img
                className={isCircle ? 'circle' : 'polaroid'}
                ref={materialBoxRef}
                src={imageSrc || 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'}
                style={{ objectFit: "cover" }}
                width={imageWidth || "100px"}
                height={imageHeight || "100px"}
                onClick={handleOnClick}
            ></img>
        </>);
    }
};
