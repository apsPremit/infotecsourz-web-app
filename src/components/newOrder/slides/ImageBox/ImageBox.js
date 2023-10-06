import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import productImage from '../../../../../public/images/product/Transparent.png'
import modelImage from '../../../../../public/images/model/First Image Basic.jpg'
import modelMakeup from '../../../../../public/images/model/blesmes remove, pimple remove, wrinkels remove.png'
import modelClithFixing from '../../../../../public/images/model/Cloth retouching.png'
import modelClipping from '../../../../../public/images/model/Clipping Path.png'
import modelBodyShaping from '../../../../../public/images/model/Boday Shaping.png'
import modelColorCorrection from '../../../../../public/images/model/color corrections, blesmes remove, pimple remove, wrinkels remove.png'
import modelTeethAndRedEye from '../../../../../public/images/model/Teeth Whining.red eye remove.png'
import productNaturalShadow from '../../../../../public/images/product/NAtural shadow.png'
import productReflectionShadow from '../../../../../public/images/product/reflection shadow .png'
import productMasking from '../../../../../public/images/product/Clippingpath.png'
import productBasicClipping from '../../../../../public/images/product/Clippingpath.png'
import productMultipleClipping from '../../../../../public/images/product/Multople Clippingpath.png'
import productColorCorrection from '../../../../../public/images/product/Color Corrections.png'
import productGhostMannequin from '../../../../../public/images/product/Product Retouch.png'
import productRetouching from '../../../../../public/images/product/Product Retouch.png'
import productColorVariant from '../../../../../public/images/product/Color Corrections.png'





// colorVariant: false

import { StateContext } from '@/context/StateProvider';


const ImageBox = () => {
    const { photoType, setPhotoType, backgroundColor, customBackground, alignments, openOptions, currentSlide, modelFinalSpecs, productFinalSpecs } = useContext(StateContext)
    const [modelUpdatedProperty, setModelUpdatedProperty] = useState(null)
    const [productUpdatedProperty, setProductUpdateProperty] = useState(null)

    let modelPreviousRef = useRef(modelFinalSpecs)
    const modelNewChangeRef = useRef([])

    let productPreviousRef = useRef(productFinalSpecs)
    const productNewChangeRef = useRef([])

    //    modal image setting 

    useEffect(() => {
        // find changed property
        const changedProperty = Object.keys(modelFinalSpecs).filter(key => modelFinalSpecs[key] !== modelPreviousRef.current[key])

        const changedPropertyValue = modelFinalSpecs[changedProperty[0]]
        const changedPropertyPair = { [changedProperty[0]]: changedPropertyValue }

        if (changedPropertyValue === true) {
            // If the property changed to true, set updatedProperty to the current changed property
            setModelUpdatedProperty(changedProperty[0])
        } else if (changedPropertyValue === false && modelPreviousRef.current[changedProperty[0]] === true) {
            // If the property changed from true to false, set updatedProperty to the property name of the previous level 1 level previous changed property
            setModelUpdatedProperty(modelNewChangeRef.current[modelNewChangeRef.current.length - 2] || "")
        }

        // Update the previousRef and newChangeRef
        modelPreviousRef.current = { ...modelPreviousRef.current, ...changedPropertyPair }
        modelNewChangeRef.current.push(changedProperty[0])
    }, [modelFinalSpecs])


    // product image setting 
    useEffect(() => {
        // find changed property
        const changedProperty = Object.keys(productFinalSpecs).filter(key => productFinalSpecs[key] !== productPreviousRef.current[key])

        const changedPropertyValue = productFinalSpecs[changedProperty[0]]
        const changedPropertyPair = { [changedProperty[0]]: changedPropertyValue }

        if (changedPropertyValue === true) {
            // If the property changed to true, set updatedProperty to the current changed property
            setProductUpdateProperty(changedProperty[0])
        } else if (changedPropertyValue === false && productPreviousRef.current[changedProperty[0]] === true) {
            // If the property changed from true to false, set updatedProperty to the property name of the previous level 1 level previous changed property
            setProductUpdateProperty(productNewChangeRef.current[productNewChangeRef.current.length - 2] || "")
        }

        // Update the previousRef and newChangeRef
        productPreviousRef.current = { ...productPreviousRef.current, ...changedPropertyPair }
        productNewChangeRef.current.push(changedProperty[0])
    }, [productFinalSpecs])








    return (

        <div className={`relative w-full lg:w-full mx-auto  border border-shadow rounded-lg min-h[350px] lg:min-h-fit  my-7`}
            style={{
                backgroundColor: backgroundColor === 'original' ? '' : backgroundColor === 'custom' ? customBackground : backgroundColor,
                maxHeight: '700px',
                minHeight: '350px',
                aspectRatio: alignments?.ratio,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: alignments.verticalAlignment == 'top' ? 'start' : alignments.verticalAlignment == 'bottom' ? 'end' : 'center',
                alignItems: alignments.horizontalAlignment == 'left' ? 'start' : alignments.horizontalAlignment == 'right' ? 'end' : 'center' // Center horizontally
            }}

        >
            <Image src={
                photoType === 'product' ?
                    productUpdatedProperty == 'naturalShadow' ? productNaturalShadow :
                        productUpdatedProperty == 'reflectionShadow' ? productReflectionShadow :
                            productUpdatedProperty == 'masking' ? productMasking :
                                productUpdatedProperty == 'basicClipping' ? productBasicClipping :
                                    productUpdatedProperty == 'multipleClipping' ? productMultipleClipping :
                                        productUpdatedProperty == 'colorCorrection' ? productColorCorrection :
                                            productUpdatedProperty == 'ghostMannequin' ? productGhostMannequin :
                                                productUpdatedProperty == 'productRetouching' ? productRetouching :
                                                    productUpdatedProperty == 'colorVariant' ? productColorVariant : productImage
                    :
                    modelUpdatedProperty == 'beautyMakeup' ? modelMakeup :
                        modelUpdatedProperty === 'clothFixing' ? modelClithFixing :
                            modelUpdatedProperty === 'clipping' ? modelClipping :
                                modelUpdatedProperty === 'colorCorrection' ? modelColorCorrection :
                                    modelUpdatedProperty === 'bodyShaping' ? modelBodyShaping :
                                        modelUpdatedProperty === 'pimplesRemove' ? modelMakeup :
                                            modelUpdatedProperty === 'wrinklesRemove' ? modelColorCorrection :
                                                modelUpdatedProperty === 'teethRetouching' ? modelTeethAndRedEye :
                                                    modelUpdatedProperty === 'hairFixing' ? modelMakeup :
                                                        modelUpdatedProperty === 'redEyeFixing' ? modelTeethAndRedEye :
                                                            modelUpdatedProperty === 'masking' ? modelMakeup :
                                                                modelUpdatedProperty === 'default' ? modelImage :
                                                                    modelImage

            } alt='item'
                fil='true'
                className={`rounded-xl max-h[350px] mx-auto ${(currentSlide === 5 || currentSlide === 6) && 'border border-main'}`}
                height={currentSlide === 5 || currentSlide === 6 && alignments?.ratio ? 400 : 0}
                width={currentSlide === 5 || currentSlide === 6 && alignments?.ratio ? 400 : 0}
                style={{
                    maxHeight: '350px',
                    position: currentSlide === 5 && "absolute",
                    objectFit: 'contain',
                    // padding: alignments.marginOverall && alignments.marginOverall + "%",
                    paddingTop: alignments.marginTop && alignments.marginTop + "%",
                    paddingBottom: alignments.marginBottom && alignments.marginBottom + "%",
                    paddingLeft: alignments.marginLeft && alignments.marginLeft + "%",
                    paddingRight: alignments.marginRight && alignments.marginRight + "%",

                }}
            />

        </div>

    );
};

export default ImageBox;