import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import productImage from "../../../../../public/product/Product Background remove.png";
import modelImage from "../../../../../public/Model/Model Background remove-min.png";
import modelMakeup from "../../../../../public/Model/Model Beauty Makeup Retouching-min.png";
import modelClithFixing from "../../../../../public/Model/Model Clothing Fixing-min.png";
import modelClipping from "../../../../../public/Model/Model Clipping Path-min.png";
import modelBodyShaping from "../../../../../public/Model/Model Body shaping-min.png";
import modelColorCorrection from "../../../../../public/Model/Model Wrinkles Remove-min.png";
import modelTeethAndRedEye from "../../../../../public/Model/Model Teeth retouching-min.png";
import productNaturalShadow from "../../../../../public/product/Product Shadow.png";
import productReflectionShadow from "../../../../../public/product/Product Reflectios.png";
import productMasking from "../../../../../public/product/Product Masking.png";
import productBasicClipping from "../../../../../public/product/Product Clipping Path.png";
import productMultipleClipping from "../../../../../public/product/Product Multipath.png";
import productColorCorrection from "../../../../../public/product/Product Color Correction _1.png";
import productGhostMannequin from "../../../../../public/product/Product Background remove.png";
import productRetouching from "../../../../../public/product/Product Retouching.png";
import productColorVariant from "../../../../../public/product/Product Color Change.png";

// colorVariant: false

import { StateContext } from "@/context/StateProvider";

const ImageBox = () => {
  const {
    photoType,
    setPhotoType,
    backgroundColor,
    customBackground,
    alignments,
    openOptions,
    currentSlide,
    modelFinalSpecs,
    productFinalSpecs,
  } = useContext(StateContext);
  const [modelUpdatedProperty, setModelUpdatedProperty] = useState(null);
  const [productUpdatedProperty, setProductUpdateProperty] = useState(null);

  let modelPreviousRef = useRef(modelFinalSpecs);
  const modelNewChangeRef = useRef([]);

  let productPreviousRef = useRef(productFinalSpecs);
  const productNewChangeRef = useRef([]);

  //    modal image setting

  useEffect(() => {
    // find changed property
    const changedProperty = Object.keys(modelFinalSpecs).filter(
      (key) => modelFinalSpecs[key] !== modelPreviousRef.current[key]
    );

    const changedPropertyValue = modelFinalSpecs[changedProperty[0]];
    const changedPropertyPair = { [changedProperty[0]]: changedPropertyValue };

    if (changedPropertyValue === true) {
      // If the property changed to true, set updatedProperty to the current changed property
      setModelUpdatedProperty(changedProperty[0]);
    } else if (
      changedPropertyValue === false &&
      modelPreviousRef.current[changedProperty[0]] === true
    ) {
      // If the property changed from true to false, set updatedProperty to the property name of the previous level 1 level previous changed property
      setModelUpdatedProperty(
        modelNewChangeRef.current[modelNewChangeRef.current.length - 2] || ""
      );
    }

    // Update the previousRef and newChangeRef
    modelPreviousRef.current = {
      ...modelPreviousRef.current,
      ...changedPropertyPair,
    };
    modelNewChangeRef.current.push(changedProperty[0]);
  }, [modelFinalSpecs]);

  // product image setting
  useEffect(() => {
    // find changed property
    const changedProperty = Object.keys(productFinalSpecs).filter(
      (key) => productFinalSpecs[key] !== productPreviousRef.current[key]
    );

    const changedPropertyValue = productFinalSpecs[changedProperty[0]];
    const changedPropertyPair = { [changedProperty[0]]: changedPropertyValue };

    if (changedPropertyValue === true) {
      // If the property changed to true, set updatedProperty to the current changed property
      setProductUpdateProperty(changedProperty[0]);
    } else if (
      changedPropertyValue === false &&
      productPreviousRef.current[changedProperty[0]] === true
    ) {
      // If the property changed from true to false, set updatedProperty to the property name of the previous level 1 level previous changed property
      setProductUpdateProperty(
        productNewChangeRef.current[productNewChangeRef.current.length - 2] ||
          ""
      );
    }

    // Update the previousRef and newChangeRef
    productPreviousRef.current = {
      ...productPreviousRef.current,
      ...changedPropertyPair,
    };
    productNewChangeRef.current.push(changedProperty[0]);
  }, [productFinalSpecs]);

  return (
    <div
      className={`relative w-full lg:w-full mx-auto  border border-shadow rounded-lg min-h[350px] lg:min-h-fit  mb-3`}
      style={{
        backgroundColor:
          backgroundColor === "original"
            ? ""
            : backgroundColor === "custom"
            ? customBackground
            : backgroundColor,
        maxHeight: "700px",
        minHeight: "350px",
        aspectRatio: alignments?.ratio,
        display: "flex",
        flexDirection: "column",
        justifyContent:
          alignments.verticalAlignment == "top"
            ? "start"
            : alignments.verticalAlignment == "bottom"
            ? "end"
            : "center",
        alignItems:
          alignments.horizontalAlignment == "left"
            ? "start"
            : alignments.horizontalAlignment == "right"
            ? "end"
            : "center", // Center horizontally
      }}
    >
      <Image
        src={
          photoType === "product"
            ? productUpdatedProperty == "naturalShadow"
              ? productNaturalShadow
              : productUpdatedProperty == "reflectionShadow"
              ? productReflectionShadow
              : productUpdatedProperty == "masking"
              ? productMasking
              : productUpdatedProperty == "basicClipping"
              ? productBasicClipping
              : productUpdatedProperty == "multipleClipping"
              ? productMultipleClipping
              : productUpdatedProperty == "colorCorrection"
              ? productColorCorrection
              : productUpdatedProperty == "ghostMannequin"
              ? productGhostMannequin
              : productUpdatedProperty == "productRetouching"
              ? productRetouching
              : productUpdatedProperty == "colorVariant"
              ? productColorVariant
              : productImage
            : modelUpdatedProperty == "beautyMakeup"
            ? modelMakeup
            : modelUpdatedProperty === "clothFixing"
            ? modelClithFixing
            : modelUpdatedProperty === "clipping"
            ? modelClipping
            : modelUpdatedProperty === "colorCorrection"
            ? modelColorCorrection
            : modelUpdatedProperty === "bodyShaping"
            ? modelBodyShaping
            : modelUpdatedProperty === "pimplesRemove"
            ? modelMakeup
            : modelUpdatedProperty === "wrinklesRemove"
            ? modelColorCorrection
            : modelUpdatedProperty === "teethRetouching"
            ? modelTeethAndRedEye
            : modelUpdatedProperty === "hairFixing"
            ? modelMakeup
            : modelUpdatedProperty === "redEyeFixing"
            ? modelTeethAndRedEye
            : modelUpdatedProperty === "masking"
            ? modelMakeup
            : modelUpdatedProperty === "default"
            ? modelImage
            : modelImage
        }
        alt="item"
        fil="true"
        className={`rounded-xl max-h[350px] mx-auto ${
          (currentSlide === 5 || currentSlide === 6) && "border border-main"
        }`}
        height={
          currentSlide === 5 || (currentSlide === 6 && alignments?.ratio)
            ? 400
            : 0
        }
        width={
          currentSlide === 5 || (currentSlide === 6 && alignments?.ratio)
            ? 400
            : 0
        }
        style={{
          maxHeight: "350px",
          position: currentSlide === 5 && "absolute",
          objectFit: "contain",
          padding: alignments.marginOverall && alignments.marginOverall + "%",
          paddingTop: alignments.marginTop && alignments.marginTop + "%",
          paddingBottom:
            alignments.marginBottom && alignments.marginBottom + "%",
          paddingLeft: alignments.marginLeft && alignments.marginLeft + "%",
          paddingRight: alignments.marginRight && alignments.marginRight + "%",
        }}
      />
    </div>
  );
};

export default ImageBox;
