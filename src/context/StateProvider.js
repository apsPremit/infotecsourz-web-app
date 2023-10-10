"use client"
import { createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthProvider";

export const StateContext = createContext(null)

const StateProvider = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(1)
    const [photoType, setPhotoType] = useState('')

    // fileName 
    const [orderName, setOrderName] = useState('')
    // background 
    const [backgroundColor, setBackgroundColor] = useState('')
    const [customBackground, setCustomBackground] = useState(backgroundColor === 'custom' ? backgroundColor : '')

    //    *******************set file format **************************************************
    const [formats, setFormats] = useState({
        jpeg: false,
        png: false,
        tiff: false,
        psd: false
    })

    //    *******************set alignments **************************************************
    const [alignments, setAlignments] = useState({
        marginOverall: '',
        marginLeft: '',
        marginRight: '',
        marginTop: '',
        marginBottom: '',
        ratio: '',
        horizontalAlignment: '',
        verticalAlignment: '',

    })

    //    *******************set final specs alignments **************************************************
    const [productFinalSpecs, setProductFinalSpecs] = useState({
        naturalShadow: false,
        reflectionShadow: false,
        masking: false,
        basicClipping: false,
        multipleClipping: false,
        colorCorrection: false,
        ghostMannequin: false,
        productRetouching: false,
        colorVariant: false

    })



    //    *******************set model final specs alignments **************************************************
    const [modelFinalSpecs, setModelFinalSpecs] = useState({
        noiseRemove: false,
        clipping: false,
        masking: false,
        colorCorrection: false,
        pimplesRemove: false,
        wrinklesRemove: false,
        teethRetouching: false,
        hairFixing: false,
        beautyMakeup: false,
        redEyeFixing: false,
        clothFixing: false,
        bodyShaping: false
    })




    //    *******************set options **************************************************
    const [openOptions, setOpenOptions] = useState({
        isOpenColor: backgroundColor === 'custom' || backgroundColor.startsWith('#') ? true : false,
        isOpenCrop: true,
        isOpenMargin: false,
        isOriginalAspect: false,
        isOpenCustomMargin: false,
    })

    // function for changing a single value of state 
    const handleSingleValueChange = (setState, property, value) => {
        setState(prevState => ({
            ...prevState,
            [property]: value
        }))

    }

    const [perPhotoCost, setPerPhotoCost] = useState(0)
    const [returnTime, setReturnTime] = useState(0)


    //    if background color is original then set custom background to ''
    useEffect(() => {
        if (backgroundColor === 'white' || backgroundColor == 'transparent' || backgroundColor == "original") {
            setCustomBackground('')
        }

    }, [backgroundColor])



    //   set aspect ratio, horizontal alignment and vertical alignment null  when has original aspect
    useEffect(() => {
        if (openOptions.isOriginalAspect) {
            setAlignments((prevState) => ({
                ...prevState,
                ratio: '',
                horizontalAlignment: '',
                verticalAlignment: '',

            }));

        }

    }, [openOptions])

    //    when has custom margin then set overall margin ''
    // is open custom margin in not open then marginTop, marginBottom, marginLeft, marginRight will be 0
    useEffect(() => {
        if (openOptions.isOpenCustomMargin) {
            setAlignments((prevState) => ({
                ...prevState,
                marginOverall: "",
            }));
        }
        else {
            setAlignments((prevState) => ({
                ...prevState,
                marginTop: "",
                marginBottom: "",
                marginLeft: "",
                marginRight: ""
            }));
        }
    }, [openOptions])



    // ****************************************************************************************
    // **********************cost calculation ***********************************************
    // **************************************************************************************

    //  ******************************model costs list************************** 

    const modelCostOptions = {
        fileName: 0.45,
        fileFormat: 0.50,
        resizing: 0.25,
        background: 0.25,
        masking: 0.50,
        clipping: 0.39,
        pimplesRemove: 0.30,
        wrinklesRemove: 0.40,
        teethRetouching: 0.25,
        hairFixing: 0.40,
        beautyMakeup: 0.80,
        redEyeFixing: 0.40,
        clothFixing: 0.30,
        bodyShaping: 0.40
    }

    // *****************************product cost list ******************************

    const productCostOptions = {
        fileName: 0.30,
        fileFormat: 0.50,
        resizing: 0.20,
        background: 0.25,
        masking: 0.30,
        clipping: 0.29,
        shadow: 0.40,
        reflection: 0.50,
        ghostMannequin: 0.45,
        colorCorrection: 0.29,
        colorVariant: 0.50,
        productRetouching: 0.60
    }

    // ***************************product cost object ************************
    const isResizing = Object.values(alignments).some(value => !!value)
    const productCostObj = {
        fileName: orderName || false,
        fileFormat: formats.psd,
        resizing: isResizing,
        background: customBackground || backgroundColor === 'white' || backgroundColor === "transparent" || false,
        masking: productFinalSpecs.masking || false,
        clipping: (productFinalSpecs.basicClipping || productFinalSpecs?.multipleClipping) || false,
        shadow: productFinalSpecs.naturalShadow || false,
        reflection: productFinalSpecs.reflectionShadow || false,
        ghostMannequin: productFinalSpecs.ghostMannequin || false,
        colorCorrection: productFinalSpecs.colorCorrection || false,
        colorVariant: productFinalSpecs.colorVariant || false,
        productRetouching: productFinalSpecs.productRetouching || false

    }

    //************************ */ model cost obj ************************************
    const modelCostObj = {
        fileName: orderName || false,
        fileFormat: formats.psd || false,
        resizing: isResizing,
        background: customBackground || backgroundColor === 'white' || backgroundColor === "transparent" || false,
        masking: modelFinalSpecs.masking || false,
        clipping: modelFinalSpecs.clipping || false,
        pimplesRemove: modelFinalSpecs.pimplesRemove || false,
        wrinklesRemove: modelFinalSpecs.wrinklesRemove || false,
        teethRetouching: modelFinalSpecs.teethRetouching || false,
        hairFixing: modelFinalSpecs.hairFixing,
        beautyMakeup: modelFinalSpecs.beautyMakeup,
        redEyeFixing: modelFinalSpecs.redEyeFixing,
        clothFixing: modelFinalSpecs.clothFixing,
        bodyShaping: modelFinalSpecs.bodyShaping

    }
    // price property of return time
    const returnTimeCostObj = {
        0: 0,
        12: 1,
        24: .80,
        48: .50,
        72: 0
    }

    // *******************************calculate total cost *******************************

    const costCalculator = (costObj, costOptions) => {

        let totalCost = 0;
        for (let key in costObj) {

            if (costObj[key]) {
                const cost = costOptions[key]
                totalCost = totalCost + cost
            }

        }
        const returnCost = returnTimeCostObj[returnTime]
        totalCost = totalCost + returnCost
        return parseFloat(totalCost.toFixed(3));


    }
    // ******************************product total cost*************************** 
    const productTotalCost = costCalculator(productCostObj, productCostOptions)

    // ************************model total costs **************************************
    const modelTotalCost = costCalculator(modelCostObj, modelCostOptions)

    useEffect(() => {
        setPerPhotoCost(photoType === 'product' ? productTotalCost : modelTotalCost)
    }, [photoType, modelTotalCost, productTotalCost])

    // setPerPhotoCost(photoType === 'product' ? productTotalCost : modelTotalCost)



    // *******************************************************************************************
    //******************************************** */ process requirements*************************** 
    // ***********************************************************************************************
    const selectedFormats = Object.keys(formats).filter(key => formats[key])
    const selectedBackground = backgroundColor === 'custom' ? customBackground : backgroundColor;
    const selectedAlignments = Object.entries(alignments).reduce((accumulator, [key, value]) => {
        if (value !== '') {
            accumulator[key] = value
        }
        return accumulator
    }, {})
    const productAdditionalReq = Object.keys(productFinalSpecs).filter(property => productFinalSpecs[property] === true);
    const modelAdditionalReq = Object.keys(modelFinalSpecs).filter(property => modelFinalSpecs[property] === true);




    const photoRequirements = {
        type: photoType,
        fileName: orderName,
        formats: [...selectedFormats],
        backgroundColor: selectedBackground,
        selectedAlignments,
        additional: photoType === 'model' ? modelAdditionalReq : productAdditionalReq


    }

    const [selectedPackage, setSelectedPackage] = useState({})


    // file upload states 
    const [uploadedImages, setUploadedImages] = useState([])
    const [totalFileSize, setTotalFileSize] = useState(0);
    const [orderId, setOrderId] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [imageQuantityFromUrl, setImageQuantityFromUrl] = useState(0)


    // specifications page state 
    const [productDetailsDescription, setProductDetailsDescription] = useState('')
    const [hasInstructions, setHasInstructions] = useState(false)


    const { userData, setUserData, user } = UserAuth()
    const [updatedCredit, setUpdatedCredit] = useState(0);

    console.log('updated credit', updatedCredit)

    useEffect(() => {

        const newUpdatedCredit = userData?.remainingCredit + (selectedPackage.photos ? selectedPackage?.photos : 0)
        setUpdatedCredit(newUpdatedCredit)

    }, [selectedPackage])

    // billing page states 
    const [billingMessage, setBillingMessage] = useState('')
    const [taxRate, setTaxRate] = useState(13)




    const states = {
        isSidebarOpen,
        setSidebarOpen,
        currentSlide,
        setCurrentSlide,
        photoType,
        setPhotoType,
        orderName,
        setOrderName,
        formats,
        setFormats,
        handleSingleValueChange,
        backgroundColor,
        setBackgroundColor,
        openOptions,
        setOpenOptions,
        customBackground,
        setCustomBackground,
        alignments,
        setAlignments,
        productFinalSpecs,
        setProductFinalSpecs,
        modelFinalSpecs,
        setModelFinalSpecs,
        productTotalCost,
        modelTotalCost,
        photoRequirements,
        // package 
        selectedPackage,
        setSelectedPackage,
        uploadedImages,
        setUploadedImages,
        totalFileSize,
        setTotalFileSize,
        orderId,
        setOrderId,
        fileUrl,
        setFileUrl,
        productDetailsDescription,
        setProductDetailsDescription,
        billingMessage,
        setBillingMessage,
        imageQuantityFromUrl,
        setImageQuantityFromUrl,
        taxRate,
        setTaxRate,
        returnTime,
        setReturnTime,
        perPhotoCost,
        setPerPhotoCost,
        hasInstructions,
        setHasInstructions,
        updatedCredit

    }

    return <StateContext.Provider value={states}>{children}</StateContext.Provider>
};

export default StateProvider;